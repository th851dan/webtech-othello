package controllers

import com.google.inject.{Guice, Injector}
import de.htwg.se.othello.{BoardModuleServer, OthelloModule, UserModuleServer}
import de.htwg.se.othello.controller.controllerComponent.ControllerInterface
import javax.inject._
import net.codingwell.scalaguice.InjectorExtensions.ScalaInjector
import play.api.mvc._

import scala.concurrent.Await
import scala.concurrent.duration.Duration


/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  /**
   * Create an Action to render an HTML page.
   *
   * The configuration in the `routes` file means that this method
   * will be called when the application receives a `GET` request with
   * a path of `/`.
   */
    val startBoardServer: Unit = BoardModuleServer.main(null)
    val startUserServer: Unit = UserModuleServer.main(null)
    val injector: Injector = Guice.createInjector(new OthelloModule)
    val gameController: ControllerInterface = injector.instance[ControllerInterface]
    val othelloAsText: String = gameController.boardToString
  def index: Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index())
  }

  def othello: Action[AnyContent] = Action {
    Ok(gameController.boardToString)
  }

  def currentPlayer: Action[AnyContent] = Action {
    Ok(gameController.currentPlayer.toString)
  }

  def newGame: Action[AnyContent] = Action {
    Await.result(gameController.newGame, Duration.Inf)
    Ok(gameController.boardToString)
  }

  def resizeBoard(op: String): Action[AnyContent] = Action {
    gameController.resizeBoard(op)
    Ok(gameController.boardToString)
  }
  def set(pos: String): Action[AnyContent] = Action {
    processInputLine(pos)
    Ok(gameController.boardToString)
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
