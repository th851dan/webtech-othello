import { html, PolymerElement } from '../../node_modules/@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 */
class Navbar extends PolymerElement {
    static get template() {
        return html`
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-CuOF+2SnTUfTwSZjCXf01h7uYhfOBuxIhGKPbfEJ3+FqH/s6cIFN9bGr1HmAg4fQ" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <style>
        :host {
          display: block;
        }
        .navbar {
            z-index: 2;
            background: rgb(69,69,69);
            background: linear-gradient(180deg, rgba(70,70,70,0.95) 0%, rgba(40,40,40,0.95) 100%);
            box-shadow: 2px 3px 6px -1px rgba(0, 0, 0, 0.29);
        }
        
        .navbar > .navbar-brand {
            background: rgb(117,198,200);
            background: linear-gradient(180deg, rgba(117,198,200,1) 0%, rgba(86,148,150,1) 100%);
            width: 200px;
        }
        
        .navbar > .navbar-nav > .nav-link a {
            color: #cccccc;
            text-decoration: none;
            font-size: 18px;
            margin-right: 5px;
        }
      </style>
      <nav class="navbar navbar-expand-md p-2 p-md-0 navbar-dark bg-dark align-items-stretch">
            <button class="navbar-toggler" type="button" on-click="showSidebar" data-toggle="collapse" data-target="#sidebar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <a class="navbar-brand d-none d-md-block pl-3" href="/polymer"><i class="fa fa-dot-circle-o" aria-hidden="true"></i>thello</a>
            <ul class="nav navbar-nav flex-row ml-auto">
            <li class="nav-link mr-2 mr-md-0">
                <a href="rules">About</a>
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

    showSidebar(){
        let sidebar = document.getElementsByTagName('othello-app')[0]
        .shadowRoot.querySelector('#sidenav')
        .shadowRoot.getElementById('sidebar');
        if(sidebar.classList.contains("show"))
            sidebar.classList.remove("show");
        else
            sidebar.classList.add("show");
    }
}

window.customElements.define('navbar-el', Navbar);
