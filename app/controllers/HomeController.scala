package controllers

import akka.actor.{Actor, ActorRef, ActorSystem, Props}
import akka.stream.Materializer
import com.google.inject.{Guice, Injector}
import de.htwg.se.othello.{BoardModuleServer, OthelloModule, UserModuleServer}
import de.htwg.se.othello.controller.controllerComponent.ControllerInterface
import de.htwg.se.othello.util.Observer
import javax.inject._
import net.codingwell.scalaguice.InjectorExtensions.ScalaInjector
import play.api.libs.streams.ActorFlow
import play.api.mvc._

import scala.concurrent.Await
import scala.concurrent.duration.Duration

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

  class OthelloWebSocketActor(out: ActorRef) extends Actor with Observer {

    gameController.add(this)

    override def update: Boolean = {
      out ! gameController.boardJson
      true
    }

    def receive: Receive = {
      case _: String => out ! gameController.boardJson
    }
  }
}
