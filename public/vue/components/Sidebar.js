import { webSocket, store } from "../Store.js";

const Sidebar = Vue.component('sidebar-vue', {
    template: `
<div>
    <nav class="sidenav collapse side-collapse bg-light position-fixed" id="sidebar">
        <ul class="navbar-nav">
            <li class="nav-item">
                <button type="button" role="button" class="text-left btn btn-light w-100" data-toggle="modal" data-target="#new-game-modal">New Game</button>
            </li>
            <li class="nav-item">
                <button type="button" role="button" class="text-left btn btn-light w-100" v-on:click="send">Undo</button>
            </li>
            <li class="nav-item">
                <button type="button" role="button" class="text-left btn btn-light w-100" v-on:click="send">Redo</button>
            </li>
            <li class="nav-item">
                <button type="button" role="button" class="text-left btn btn-light w-100" v-on:click="send">Hint</button>
            </li>
            <li class="nav-item">
                <button type="button" role="button" class="text-left btn btn-light dropdown-toggle w-100" data-toggle="collapse" data-target="#difficulty">
                    Difficulty
                </button>
                <div class="collapse collapsible-panel" id="difficulty">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <button id="Easy" :class="{ 'text-body': difficulty === 'Easy' }" type="button" role="button" class="text-left btn w-100" v-on:click="send">Easy</button>
                        </li>
                        <li class="nav-item">
                            <button id="Normal" :class="{ 'text-body': difficulty === 'Normal' }" type="button" role="button" class="text-left btn w-100" v-on:click="send">Normal</button>
                        </li>
                        <li class="nav-item">
                            <button id="Hard" :class="{ 'text-body': difficulty === 'Hard' }" type="button" role="button" class="text-left btn w-100" v-on:click="send">Hard</button>
                        </li>
                    </ul>
                </div>
            </li>
            <li class="nav-item">
                <button type="button" role="button" class="text-left btn btn-light dropdown-toggle w-100" data-toggle="collapse" data-target="#player-mode">
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
                <button type="button" id="new" class="btn btn-primary" data-dismiss="modal" v-on:click=send>Ok</button>
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
                <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click=send>Ok</button>
            </div>
        </div>
    </div>
</div>
</div>
    `,
    data() { return store.state },
    methods: {
        send(evt) {
            const text = evt.target.textContent.toLowerCase();
            switch (text) {
                case 'hint':
                case 'redo':
                case 'undo':
                    webSocket.send(text);
                    break;
                case 'ok':
                    webSocket.send('new');
                    break;
                case 'easy':
                    webSocket.send('difficulty/e');
                    break;
                case 'normal':
                    webSocket.send('difficulty/m');
                    break;
                case 'hard':
                    webSocket.send('difficulty/d');
                    break;
                default:
                    console.error('Unknown command')
                    break;
            }
        }
    }
})

export default Sidebar;
