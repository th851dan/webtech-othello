import { html, PolymerElement } from '../../node_modules/@polymer/polymer/polymer-element.js';
/**
 * @customElement
 * @polymer
 */
class Sidenav extends PolymerElement {
    constructor() {
        super();
        document.addEventListener("readystatechange", () => {
            this._showSidebar(this.shadowRoot);
        });
    }

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
              <button type="button" role="button" class="text-left btn btn-light w-100" data-toggle="modal" on-click="showNewGameModal" data-target="#new-game-modal">New Game</button>
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
    `;
    }

    _showSidebar(thisShadowRoot) {
        if (thisShadowRoot) {
            function checkWidth(thisShadowRoot) {
                if (thisShadowRoot)
                {
                    let sidebarEl = thisShadowRoot.getElementById('sidebar');
                    if (window.innerWidth < 768)
                        sidebarEl.classList.remove('show');
                    else
                        sidebarEl.classList.add('show');
                }
            }
            
            if (document.readyState === "complete") {
                checkWidth(thisShadowRoot);
                window.onresize = () => checkWidth(thisShadowRoot)
            }
        }
    }

    show(e) {
        let showEl = $(this.shadowRoot.getElementById(e.currentTarget.dataset.target));
        showEl.collapse('toggle');
    }

    showNewGameModal() {
        $('#new-game-modal').modal('show');
    }

}

window.customElements.define('sidenav-el', Sidenav);