import {html, PolymerElement} from "../../node_modules/@polymer/polymer/polymer-element.js";

class HeaderElement extends PolymerElement {
    constructor() {
        super();
    }

    static get template() {
        return html`
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-CuOF+2SnTUfTwSZjCXf01h7uYhfOBuxIhGKPbfEJ3+FqH/s6cIFN9bGr1HmAg4fQ" crossorigin="anonymous">
            <div class="row m-2">
                <div class="col text-center h-100">
                    <img src="{{image1}}" alt = "●" draggable = "false"/>
                    <span class="h4 align-middle">{{count1}}</span>
                </div>
                <div class="col text-center h-100">
                    <img src={{image2}} alt="○" draggable="false"/>
                    <span class="h4 align-middle">{{count2}}</span>
                </div>
            </div>`;
    }

    static get properties() {
        return {
            image1: {
                type: String,
            },
            image2: {
                type: String,
            },
            count1: {
                type: Number,
            },
            count2: {
                type: Number,
            },
        }
    }
}

window.customElements.define("header-el", HeaderElement);