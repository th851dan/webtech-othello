import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '../othello-el/navbar.js'
import '../othello-el/sidenav.js'
/**
 * @customElement
 * @polymer
 */
class OthelloApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <navbar-el/>
      <sidebar-el/>
      <div class="d-table m-auto pt-3">
        <div class="row m-2">
            <div class="col text-center h-100">
                <img src="@routes.Assets.versioned("images/1.png")" alt="●" draggable="false"/>
                <span class="h4 align-middle" id="black-tiles"></span>
            </div>
            <div class="col text-center h-100">
                <img src="@routes.Assets.versioned("images/2.png")" alt="○" draggable="false"/>
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
