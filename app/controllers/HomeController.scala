package controllers

import akka.actor.{Actor, ActorRef, ActorSystem, Props}
import akka.stream.Materializer
import com.google.inject.{Guice, Injector}
import de.htwg.se.othello.controller.controllerComponent.ControllerInterface
import de.htwg.se.othello.controller.controllerComponent.controllerMockImpl.{BoardChanged, BoardHighlightChanged, DifficultyChanged, GameStatusChanged, NewGameCreated}
import de.htwg.se.othello.{BoardModuleServer, OthelloModule, UserModuleServer}
import net.codingwell.scalaguice.InjectorExtensions.ScalaInjector
import play.api.libs.json.{JsObject, Json}
import play.api.libs.streams.ActorFlow
import play.api.mvc._

import java.util.{Timer, TimerTask}
import javax.inject._
import scala.concurrent.Await
import scala.concurrent.duration.Duration
import scala.language.postfixOps
import scala.swing.Reactor

@Singleton
class HomeController @Inject()(controllerComponents: ControllerComponents)(implicit system: ActorSystem, mat: Materializer) extends AbstractController(controllerComponents) {

  val startBoardServer: Unit = BoardModuleServer.main(null)
  val startUserServer: Unit = UserModuleServer.main(null)
  val injector: Injector = Guice.createInjector(new OthelloModule)
  val gameController: ControllerInterface = injector.instance[ControllerInterface]

  def index: Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index())
  }

  def othello: Action[AnyContent] = Action {
    Ok(views.html.othello(gameController))
  }

  def polymer: Action[AnyContent] = Action {
    Ok(views.html.polymer(gameController))
  }

  def currentPlayer: Action[AnyContent] = Action {
    Ok(gameController.currentPlayer.toString)
  }

  def newGame: Action[AnyContent] = Action {
    Await.result(gameController.newGame, Duration.Inf)
    Ok(views.html.othello(gameController))
  }

  def resizeBoard(op: String): Action[AnyContent] = Action {
    gameController.resizeBoard(op)
    Ok(views.html.othello(gameController))
  }
  def set(pos: String): Action[AnyContent] = Action {
    processInputLine(pos)
    Ok(views.html.othello(gameController))
  }

  def rules: Action[AnyContent] = Action {
    Ok(views.html.rules())
  }

  def hint: Action[AnyContent] = Action {
    gameController.highlight()
    Ok(views.html.othello(gameController))
  }

  def undo: Action[AnyContent] = Action {
    gameController.undo()
    Ok(views.html.othello(gameController))
  }

  def redo: Action[AnyContent] = Action {
    gameController.redo()
    Ok(views.html.othello(gameController))
  }

  def boardJson: Action[AnyContent] = Action {
    Ok(gameController.boardJson)
  }

  def difficulty(dif: String): Action[AnyContent] = Action {
    gameController.setDifficulty(dif)
    Ok(views.html.othello(gameController))
  }

  def count(colorValue: String): Action[AnyContent] = Action {
    Ok(gameController.count(colorValue.toInt).toString)
  }

  def getDifficulty: Action[AnyContent] = Action {
    Ok(gameController.difficulty)
  }

  def getGameOver: Action[AnyContent] = Action {
    Ok(gameController.gameOver.toString)
  }

  def processInputLine: String => Unit = {
    input => input.split("(?<=\\D)(?=\\d)|(?<=\\d)(?=\\D)").toList match {
      case col :: row :: Nil =>
        val square = (col.charAt(0).toUpper - 65, row.toInt- 1)
        gameController.set(square)
      case _ =>
    }
  }

  def socket: WebSocket = WebSocket.accept[String, String] { _ =>
    ActorFlow.actorRef {
      out => Props(new OthelloWebSocketActor(out))
    }
  }

  class OthelloWebSocketActor(out: ActorRef) extends Actor with Reactor{
    listenTo(gameController)
    reactions += {
      case _: NewGameCreated  =>
        out ! buildJsObject("game-created", gameController.boardJson)
      case _: BoardChanged    =>
        out ! buildJsObject("board-changed", gameController.boardJson)
      case event: DifficultyChanged =>
        out ! buildJsObject("difficulty-changed", event.difficulty)
      case event: BoardHighlightChanged =>
        out ! buildJsObject("board-highlight-changed", event.moves)
      case event: GameStatusChanged =>
        out ! buildJsObject("game-status-changed", event.status)
      case _ =>
        out ! buildJsObject("unknow", gameController.boardJson)
    }

    def buildJsObject(event: String, objectToDeliver: String) = {
      val eventObject = Json.obj("event" -> event)
      if (objectToDeliver != null)
        (Json.parse(objectToDeliver).as[JsObject] ++ eventObject).toString
      else eventObject.toString
    }

    def receive: Receive = {
      case "new"      => gameController.newGame
      case "undo"     => gameController.undo()
      case "redo"     => gameController.redo()
      case "hint"     => gameController.highlight()
      case "hello"    => out ! buildJsObject("hello", gameController.boardJson)
      case "getdifficulty" => out ! buildJsObject("return-difficulty", Json.obj("difficulty" -> gameController.difficulty).toString)
      case "loadnew"  => {
        out ! buildJsObject("load-othello-page", null)
        //After receiving "load-othello-page" message, location.href is set,
        //the page is loaded again and a new websocket is created.
        //At that point the "game-created" event might be execute faster before
        //websocket load. So I need this delay here.
        //Bug in Chrome: Repeat reloading the page to see the bug. (websocket??)
        //Maybe the timer is too short
        //
        //Another solution?
        new Timer().schedule(new TimerTask() {
          override def run(): Unit = {
            gameController.newGame
          }
        }, 200)
      }
      case changeDif : String if changeDif.contains("difficulty/") =>
        gameController.setDifficulty((changeDif.split('/').last))
      case setCell : String if setCell.contains("set/") => {
        setCell.split('/').last.split("(?<=\\D)(?=\\d)|(?<=\\d)(?=\\D)").toList match {
          case col :: row :: Nil =>
            val square = (col.charAt(0).toUpper - 65, row.toInt- 1)
            gameController.set(square)
          case _ =>
        }
      }
      case _: String => out ! buildJsObject("unknow-received-message", gameController.boardJson)
    }
  }
}
