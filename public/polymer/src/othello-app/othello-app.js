import {html, PolymerElement} from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';
import '../othello-el/navbar.js'
import '../othello-el/sidenav.js'
import '../othello-el/header.js'

let webSocket;
export function request(endpoint) {
    if (webSocket)
        webSocket.send(endpoint);
}

class OthelloApp extends PolymerElement {

    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();
        this.connectWebSocket();
    }

    connectWebSocket() {
        webSocket = new WebSocket("ws://localhost:9000/websocket")
        console.info("Connecting to WebSocket...");

        webSocket.onopen = () => {
            console.info("Connected to server: " + webSocket.url);
            webSocket.send("connect");
        }

        webSocket.onmessage = message => this.webSocketOnMessage(message)

        webSocket.onerror = event => console.error(event);
        webSocket.onclose = () => setTimeout(() => this.connectWebSocket(), 2000);
    }

    webSocketOnMessage(message) {
        try {
            const { event, object } = JSON.parse(message.data);
            switch (event) {
                case "board-changed":
                    let cellArray = new Array(object.size)
                    for(let i = 0; i < object.size; i++) {
                        cellArray[i] = []
                    }
                    for (let o of object.squares) {
                        cellArray[o.row][o.col] = o.value
                    }
                    this.cells = cellArray;
                    this.count1 = [].concat.apply([], cellArray).filter(e => e === 1).length;
                    this.count2 = [].concat.apply([], cellArray).filter(e => e === 2).length;
                    break;
                case "difficulty-changed":
                    this.difficulty = object.difficulty;
                    break;
                default:
                    console.log(object);
                    break;
            }
        } catch (e) {
            console.error(e)
        }
    }

    static get template() {
        return html`
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"
                  integrity="sha384-CuOF+2SnTUfTwSZjCXf01h7uYhfOBuxIhGKPbfEJ3+FqH/s6cIFN9bGr1HmAg4fQ"
                  crossorigin="anonymous">
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
                    box-shadow: 0 1px 2px rgba(97, 120, 97, 0.7), 1px -1px 3px 1px rgba(31, 31, 31, 0.51) inset;
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
                    background-color: rgba(80, 90, 100, 0.7);
                    color: #FFF;
                    box-shadow: 2px 2px 5px #3c3c3c;
                }
            </style>
            <navbar-el></navbar-el>
            <sidenav-el id="sidenav"></sidenav-el>
            <div class="d-table m-auto pt-3">
                <header-el count1="[[count1]]" count2="[[count2]]" image1="[[image1]]" image2="[[image2]]"></header-el>
                <table class="game-table" style$="background: url({{background}})">
                    <template is="dom-repeat" items="[[columnHeaders]]">
                        <th class="column-header text-center">[[item]]</th>
                    </template>
                    <template is="dom-repeat" items="[[rows]]" as="row">
                        <tr>
                            <th class="row-header text-center">[[row.header]]</th>
                            <template is="dom-repeat" items="[[row.position]]">
                                <td class="cell text-center border border-dark" id="[[item.index]]" on-click="setEvent"/>
                            </template>
                        </tr>
                    </template>
                </table>
                <div id="difficulty-div">[[difficulty]]</div>
            </div>
        `;
    }
    static get properties() {
        return {
            size: {
                type: Number,
                value: 15,
                observer: "sizeChanged"
            },

            image1: {
                type: String,
            },
            image2: {
                type: String,
            },
            count1: {
                type: Number
            },
            count2: {
                type: Number
            },
            background: {
                type: String,
            },
            difficulty: {
                type: String
            },
            columnHeaders: {
                type: Array,
                value() {
                    return Array(this.size + 1).map((_, index) => {
                        if (index > 0)
                            return String.fromCharCode(index + 64);
                    });
                }
            },
            rows: {
                type: Array,
            },
            cells: {
                type: Array,
                observer: "cellsChanged"
            }
        }
    }

    changeSource() {
        let cellElements = this.shadowRoot.querySelector("table").getElementsByClassName("cell");
        for (let item of cellElements) {
            let elem = $(item);
            elem.empty()
            const cellValue = this.cells[item.id.charAt(1)][item.id.charAt(0)]
            if (cellValue > 0) {
                let child = document.createElement("img");
                if (cellValue === 1) {
                    child.setAttribute("src", this.image1);
                }
                if (cellValue === 2) {
                    child.setAttribute("src", this.image2);
                }
                elem.append(child);
            }
            if (cellValue < 0) {
                const child = document.createElement("span");
                child.setAttribute("class", "dot d-inline-block rounded-circle mt-1 jelly-dot");
                elem.append(child);
            }
        }
    }

    updateColumnHeaders(size) {
        this.columnHeaders = Array(size + 1).fill().map((_, index) => {
            if (index > 0)
                return String.fromCharCode(index + 64);
        });
    }

    sizeChanged(newValue) {
        this.updateColumnHeaders(newValue);
        this.updateCells(newValue);
        //this.changeSource()
    }

    cellsChanged(newValue){
        this.changeSource();
    }

    setEvent(event) {
        const row = parseInt(event.target.id.charAt(0));
        const col = parseInt(event.target.id.charAt(1));
        const x = String.fromCharCode(col + 65);
        const y = 1 + row;
        webSocket.send("set/" + x + y)
    }


    //update only the id of cells, not the value. Cells have their own property this.cells
    updateCells(size) {
        let rowHeaders = Array(size).fill().map((_, index) => index + 1);
        this.rows = rowHeaders.map(h => {
            return {
                header: h,
                position: Array(size).fill().map((_, index) => {
                    return {
                        index: (h - 1) + '' + index,
                        // value: this.cells[index][h-1]
                    }
                })
            }
        })
    }
}

window.customElements.define('othello-app', OthelloApp);
