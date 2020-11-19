package controllers

import com.google.inject.{Guice, Injector}
import de.htwg.se.othello.{BoardModuleServer, OthelloModule, UserModuleServer}
import de.htwg.se.othello.controller.controllerComponent.ControllerInterface
import javax.inject._
import net.codingwell.scalaguice.InjectorExtensions.ScalaInjector
import play.api.mvc._

import scala.concurrent.Await
import scala.concurrent.duration.Duration

@Singleton
class HomeController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

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

  def processInputLine: String => Unit = {
    input => input.split("(?<=\\D)(?=\\d)|(?<=\\d)(?=\\D)").toList match {
      case col :: row :: Nil =>
        val square = (col.charAt(0).toUpper - 65, row.toInt- 1)
        gameController.set(square)
      case _ =>
    }
  }
}
