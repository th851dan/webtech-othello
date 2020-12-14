package controllers

import akka.actor.{Actor, ActorRef, ActorSystem, Props}
import com.google.inject.{Guice, Injector}
import de.htwg.se.othello.controller.controllerComponent.ControllerInterface
import de.htwg.se.othello.controller.controllerComponent.controllerMockImpl.{BoardChanged, CurrentPlayerChanged, DifficultyChanged, GameStatusChanged}
import de.htwg.se.othello.{BoardModuleServer, OthelloModule, UserModuleServer}
import net.codingwell.scalaguice.InjectorExtensions.ScalaInjector
import play.api.Logger
import play.api.libs.json.{JsValue, Json}
import play.api.libs.streams.ActorFlow
import play.api.mvc._

import javax.inject._
import scala.language.postfixOps
import scala.swing.Reactor

@Singleton
class HomeController @Inject()(implicit system: ActorSystem) extends InjectedController {

  // Should be removed from HomeController and started individually
  BoardModuleServer.main(Array.empty)
  UserModuleServer.main(Array.empty)

  val injector: Injector = Guice.createInjector(new OthelloModule)
  val gameController: ControllerInterface = injector.instance[ControllerInterface]

  def index: Action[AnyContent] = Action {
    Ok(views.html.index())
  }

  def matchAll(path: String): Action[AnyContent] = Action {
    Ok(views.html.index())
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

  class OthelloWebSocketActor(out: ActorRef) extends Actor with Reactor {
    val log: Logger = Logger(this.getClass.getName)
    listenTo(gameController)
    reactions += {
      case _: BoardChanged    =>
        out ! buildJsObject("board-changed", gameController.boardJson)
      case event: DifficultyChanged =>
        out ! buildJsObject("difficulty-changed", event.difficulty)
      case event: GameStatusChanged =>
        out ! buildJsObject("game-status-changed", event.status)
      case event: CurrentPlayerChanged =>
        out ! buildJsObject("player-changed", event.player)
      case other => log.warn("Unmanaged event: " + other.getClass.getName)
    }

    def buildJsObject(event: String, objectToDeliver: JsValue): String = {
      Json.obj("event" -> event, "object" -> objectToDeliver).toString
    }

    def receive: Receive = {
      case "connect"  =>
        out ! buildJsObject("board-changed", gameController.boardJson)
        out ! buildJsObject("difficulty-changed", Json.obj("difficulty" -> gameController.difficulty))
      case "new"      => gameController.newGame
      case "undo"     => gameController.undo()
      case "redo"     => gameController.redo()
      case "hint"     => gameController.highlight()
      case changeDif: String if changeDif.contains("difficulty/") =>
        gameController.setDifficulty(changeDif.split('/').last)
      case setCell: String if setCell.contains("set/") =>
        val input = setCell.split('/').last
        processInputLine(input)
      case message => log.warn("Unknown message: " + message)
    }
  }
}
