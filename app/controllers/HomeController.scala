package controllers

import akka.actor.{Actor, ActorRef, ActorSystem, Props}
import akka.stream.Materializer
import com.google.inject.{Guice, Injector}
import de.htwg.se.othello.controller.controllerComponent.ControllerInterface
import de.htwg.se.othello.controller.controllerComponent.controllerMockImpl.{BoardChanged, DifficultyChanged, GameStatusChanged, NewGameCreated}
import de.htwg.se.othello.{BoardModuleServer, OthelloModule, UserModuleServer}
import net.codingwell.scalaguice.InjectorExtensions.ScalaInjector
import play.api.libs.json.{JsObject, Json}
import play.api.libs.streams.ActorFlow
import play.api.mvc._

import javax.inject._
import scala.concurrent.Await
import scala.concurrent.duration.Duration
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
        out ! buildJsObject("difficulty-changed", Json.obj("difficulty" -> event.difficulty).toString)
      case event: GameStatusChanged =>
        out ! buildJsObject("from", Json.obj("to" -> event.to).toString)
    }

    def buildJsObject(event: String, objectToDeliver: String) = {
      val eventObject = "event" -> Json.toJson(event)
      (Json.parse(objectToDeliver).as[JsObject] + eventObject).toString
    }

    def receive: Receive = {
      case "new"      => Await.result(gameController.newGame, Duration.Inf)
      case "undo"     => gameController.undo()
      case "redo"     => gameController.redo()
      case "hint"     => gameController.highlight()
      
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
      case _: String => out ! gameController.boardJson
    }
  }
}
