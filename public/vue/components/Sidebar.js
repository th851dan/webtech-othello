import { webSocket, store } from "../Store.js";

const Sidebar = Vue.component('sidebar-vue', {
    template: `
<div>
    <nav class="sidenav collapse bg-light position-fixed" id="sidebar">
        <ul class="navbar-nav">
            <li class="nav-item">
                <button type="button" role="button" class="text-left btn btn-light w-100" data-toggle="modal" data-target="#new-game-modal">New Game</button>
            </li>
            <li v-for="element in ['Undo', 'Redo', 'Hint']" class="nav-item">
                <button :id='element.toLowerCase()' type="button" role="button" class="text-left btn btn-light w-100" v-on:click="send">{{element}}</button>
            </li>
            <li class="nav-item">
                <button type="button" role="button" class="text-left btn btn-light dropdown-toggle w-100" data-toggle="collapse" data-target="#difficulty">
                    Difficulty
                </button>
                <div class="collapse collapsible-panel" id="difficulty">
                    <ul class="navbar-nav">
                        <li v-for="element in [{key: 'e', text: 'Easy'}, {key: 'm', text:'Normal'}, {key: 'd' ,text:'Hard'}]" class="nav-item">
                            <button :id='"difficulty/" + element.key' :class="{ 'text-body': difficulty === element.text }" type="button" role="button" class="text-left btn w-100" v-on:click="send">{{element.text}}</button>
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
                        <li v-for="element in ['Player vs Player', 'Player vs Bot']" class="nav-item">
                            <button type="button" role="button" class="text-left btn w-100">{{element}}</button>
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
                    <button type="button" id="new" class="btn btn-primary" data-dismiss="modal" v-on:click=send>Ok</button>
                </div>
            </div>
        </div>
    </div>
</div>
    `,
    data() { return store.state },
    methods: { send: (evt) => webSocket.send(evt.target.id) }
})

export default Sidebar;
