package controllers

import com.google.inject.Guice
import de.htwg.se.othello.{BoardModuleServer, OthelloModule, UserModuleServer}
import de.htwg.se.othello.controller.controllerComponent.ControllerInterface
import javax.inject._
import net.codingwell.scalaguice.InjectorExtensions.ScalaInjector
import play.api.mvc._


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
    val startBoardServer = BoardModuleServer.main(null)
    val startUserServer = UserModuleServer.main(null)
    val injector = Guice.createInjector(new OthelloModule)
    val gameController = injector.instance[ControllerInterface]
    val othelloAsText = gameController.boardToString
  def index() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index())
  }

  def othello = Action {
    Ok(gameController.boardToString)
  }

  def currentPlayer = Action {
    Ok(gameController.currentPlayer.toString)
  }

  def newGame = Action {
    gameController.newGame
    Ok(gameController.boardToString)
  }

  def resizeBoard(op: String) = Action {
    gameController.resizeBoard(op)
    Ok(gameController.boardToString)
  }
  def set(pos: String) = Action {
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
