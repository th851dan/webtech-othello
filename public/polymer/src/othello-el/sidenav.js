import {html, PolymerElement} from '../../node_modules/@polymer/polymer/polymer-element.js';
/**
 * @customElement
 * @polymer
 */
class Sidenav extends PolymerElement {

  static get template() {
    return html`
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-CuOF+2SnTUfTwSZjCXf01h7uYhfOBuxIhGKPbfEJ3+FqH/s6cIFN9bGr1HmAg4fQ" crossorigin="anonymous">
      <style>
        :host {
          display: block;
        }
        .sidenav {
            z-index: 1;
            overflow-y: auto;
            margin-top: -7px;
            padding-top: 50px;
            width: 200px;
            min-height: calc(100vh - 45px);
            top: 50px;
            bottom: 0;
        }
        
        .sidenav::-webkit-scrollbar {
            display: none;
        }
        
        .sidenav button {
            font-size: 22px;
            color: #818181;
        }
        
        .sidenav a {
            font-size: 22px;
            color: #818181;
        }

        .sidenav.collapse {
            visibility: hidden;
        }
        
        .sidenav.collapse.show {
            transition-property: margin-left, visibility;
            transition-duration: 0.2s;
            visibility: visible;
            box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.38);
        }
        
        .sidenav.collapsing {
            transition-property: margin-left, visibility;
            transition-duration: 0.2s;
            transition-timing-function: ease-in-out;
        }
        
        .sidenav.collapsing.side-collapse {
            transition-property: margin-left, visibility;
            margin-left: -200px;
        }

        .collapsible-panel {
            background: #eeeeee;
            box-shadow: inset 0 2px 2px 0 rgba(30, 30, 30, 0.1);
        }
      </style>
      
    <nav class="sidenav collapse side-collapse bg-light position-fixed" id="sidebar">
      <ul class="navbar-nav">
          <li class="nav-item">
              <button type="button" role="button" class="text-left btn btn-light w-100" data-toggle="modal" data-target="#new-game-modal">New Game</button>
          </li>
          <li class="nav-item">
              <button type="button" role="button" class="text-left btn btn-light w-100" onclick=request("undo")>Undo</button>
          </li>
          <li class="nav-item">
              <button type="button" role="button" class="text-left btn btn-light w-100" onclick=request("redo")>Redo</button>
          </li>
          <li class="nav-item">
              <button type="button" role="button" class="text-left btn btn-light w-100" onclick=request("hint")>Hint</button>
          </li>
          <li class="nav-item">
              <button type="button" role="button" class="text-left btn btn-light dropdown-toggle w-100" on-click="show" data-toggle="collapse" data-target="difficulty">
                  Difficulty
              </button>
              <div class="collapse collapsible-panel" id="difficulty">
                  <ul class="navbar-nav">
                      <li class="nav-item">
                          <button id="Easy" type="button" role="button" class="text-left btn w-100" onclick=changeDifficulty("e")>Easy</button>
                      </li>
                      <li class="nav-item">
                          <button id="Normal" type="button" role="button" class="text-left btn w-100" data-toggle="collapse" onclick=changeDifficulty("m")>Normal</button>
                      </li>
                      <li class="nav-item">
                          <button id="Hard" type="button" role="button" class="text-left btn w-100" data-toggle="collapse" onclick=changeDifficulty("d")>Hard</button>
                      </li>
                  </ul>
              </div>
          </li>
          <li class="nav-item">
              <button type="button" role="button" class="text-left btn btn-light dropdown-toggle w-100" on-click="show" data-toggle="collapse" data-target="player-mode">
                  Mode
              </button>
              <div class="collapse collapsible-panel" id="player-mode">
                  <ul class="navbar-nav">
                      <li class="nav-item">
                          <button type="button" role="button" class="text-left btn toggled w-100">Player vs Player</button>
                      </li>
                      <li class="nav-item">
                          <button type="button" role="button" class="text-left btn w-100">Player vs Bot</button>
                      </li>
                  </ul>
              </div>
          </li>
      </ul>
  </nav>
  <div class="modal fade" tabindex="-1" role="dialog" id="new-game-modal" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title">Start new game?</h5>
              </div>
              <div class="modal-body">
                  <p class="text-center">Current score will be lost.</p>
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
                  <button type="button" class="btn btn-primary" data-dismiss="modal" onclick=request("new")>Ok</button>
              </div>
          </div>
      </div>
  </div>
  <div class="modal fade" tabindex="-2" role="dialog" id="game-over-modal" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
              <div class="modal-header text-center">
                  <h5 class="modal-title" id="game-over-title"></h5>
              </div>
              <div class="modal-body" id="game-over-body">
                  <p class="text-center jump-class"><img id="winner" src="" alt=""></p>
                  <p class="text-center">Start new game?</p>
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" data-dismiss="modal" onclick=request("new")>Ok</button>
              </div>
          </div>
      </div>
  </div>
  
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'othello-app'
      },
    };
  }

  show(e){
    let difEl = this.shadowRoot.getElementById(e.currentTarget.dataset.target);
    if(difEl.classList.contains("show"))
        difEl.classList.remove("show");
    else
        difEl.classList.add("show");
  }
}

window.customElements.define('sidenav-el', Sidenav);
