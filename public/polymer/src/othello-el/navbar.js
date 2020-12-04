import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 */
class Navbar extends PolymerElement {
    static get template() {
        return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <nav class="navbar navbar-expand-md p-2 p-md-0 navbar-dark bg-dark align-items-stretch">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidebar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <a class="navbar-brand d-none d-md-block pl-3" href=@{routes.HomeController.othello()}><i class="fa fa-dot-circle-o" aria-hidden="true"></i>thello</a>
            <ul class="nav navbar-nav flex-row ml-auto">
            <li class="nav-link mr-2 mr-md-0">
                <a href="@{routes.HomeController.rules()}">About</a>
            </li>
            <li class="nav-link">
                <a href="https://github.com/th851dan/webtech-othello"><i class="fa fa-github" aria-hidden="true"></i></a>
            </li>
            </ul>
        </nav>
    `;
    }
    static get properties() {
        return {
            prop1: {
                type: String,
                value: 'othello-app'
            }
        };
    }
}

window.customElements.define('navbar-el', Navbar);
