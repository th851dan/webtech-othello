import {html, PolymerElement} from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../othello-el/navbar.js'
import '../othello-el/sidenav.js'

/**
 * @customElement
 * @polymer
 */
class OthelloApp extends PolymerElement {
  static get template() {
    return html`
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-CuOF+2SnTUfTwSZjCXf01h7uYhfOBuxIhGKPbfEJ3+FqH/s6cIFN9bGr1HmAg4fQ" crossorigin="anonymous">
      <style>
        :host {
          display: block;
        }
        .game-table {
          border: 5px solid saddlebrown;
          box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.29);
      }
      
      .game-table .column-header {
          height: 28px;
          background: #aaaaaa;
      }
      
      .game-table .row-header {
          background: #aaaaaa;
          width: 28px;
      }
      
      .game-table .cell {
          width: 48px;
          height: 48px;
      }
      
      .game-table .cell:hover {
          background-color: rgba(160, 160, 160, 0.3);
          transition: all 0.2s ease-in;
      }
      
      .game-table .cell .dot {
          height: 25px;
          width: 25px;
          background-color: rgba(12, 12, 12, 0.5);
          box-shadow: 0 1px 2px rgba(97, 120, 97, 0.7), 1px -1px 3px 1px rgba(31,31,31,0.51) inset;
      }

      @media (max-width: 800px) {
        .game-table .column-header {
            font-size: 12px;
            height: 22px;
        }
    
        .game-table .row-header {
            font-size: 12px;
            width: 22px
        }
    
        .game-table .cell {
            width: 36px;
            height: 36px;
        }
    
        .game-table .cell img {
            width: 32px;
            height: 32px;
        }
    
        .game-table .cell .dot {
            height: 20px;
            width: 20px;
        }
        .rules > .content img {
            width: 75%;
        }
    }
    
    @keyframes flip {
        0% {
            transform: rotateY(0deg);
            -webkit-transform: translate3D(0px, 0px, -20px) rotateY(0deg);
        }
        100% {
            transform: rotateY(180deg);
            -webkit-transform: translate3D(0px, 0px, -20px) rotateY(180deg);
        }
    }
    
    @keyframes jelly {
        0% {
            transform: scale(1);
        }
        53% {
            transform: scale(1.15);
        }
        62% {
            transform: scale(0.87);
        }
        75% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }
    
    @-webkit-keyframes jump {
        0% {
            transform: translateY(0);
        }
        17% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-75%);
        }
        50% {
            transform: translateY(2px) scaleY(0.95);
        }
        60% {
            transform: translateY(-25%);
        }
        70% {
            transform: translateY(0) scaleY(0.98);
        }
        100% {
            transform: translateY(0) scaleY(1);
        }
    }
    
    .jump-class {
        animation: jump 1.2s infinite;
        animation-delay: 0.2s;
    }
    
    .flip-tile {
        animation: flip 0.5s forwards;
    }
    
    .jelly-dot {
        animation: jelly ease 0.5s;
    }
    
    .float {
        width: 4rem;
        height: 4rem;
        bottom: 2rem;
        right: 2rem;
        background-color: rgba(80,90,100,0.7);
        color:#FFF;
        box-shadow: 2px 2px 5px #3c3c3c;
    }
      </style>
      <navbar-el></navbar-el>
      <sidenav-el id="sidenav"></sidenav-el>
      <div class="d-table m-auto pt-3">
        <div class="row m-2">
            <div class="col text-center h-100">
                <img src="/assets/images/1.png")" alt="●" draggable="false"/>
                <span class="h4 align-middle" id="black-tiles"></span>
            </div>
            <div class="col text-center h-100">
                <img src="/assets/images/2.png")" alt="○" draggable="false"/>
                <span class="h4 align-middle" id="white-tiles"></span>
            </div>
        </div>
        <table class="game-table" style="background: url(@routes.Assets.versioned("images/back.jpg"))">
            @for(row <- 0 until [[size]] + 1) {
                <th class="column-header text-center">
                @if(row > 0) {@{(row + 64).toChar}}
                </th>
            }
            @for(row <- 0 until [[size]]) {
                <tr>
                    <th class ="row-header text-center">@{row + 1}</th>
                    @for(col <- 0 until [[size]]) {
                        <td class="cell text-center border border-dark" id="@{col}@{row}"></td>
                    }
                </tr>
            }
        </table>
        <div id="difficulty-div"></div>
    </div>
    `;
  }
  static get properties() {
    return {
      size: {
        type: Number,
        value: 7
      }
    };
  }
}

window.customElements.define('othello-app', OthelloApp);