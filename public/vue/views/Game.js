const Game = {
    template: `
<div>
    <nav class="sidenav collapse side-collapse bg-light position-fixed" id="sidebar">
        <ul class="navbar-nav">
            <li class="nav-item">
                <button type="button" role="button" class="text-left btn btn-light w-100" data-toggle="modal" data-target="#new-game-modal">New Game</button>
            </li>
            <li class="nav-item">
                <button type="button" role="button" class="text-left btn btn-light w-100">Undo</button>
            </li>
            <li class="nav-item">
                <button type="button" role="button" class="text-left btn btn-light w-100">Redo</button>
            </li>
            <li class="nav-item">
                <button type="button" role="button" class="text-left btn btn-light w-100">Hint</button>
            </li>
            <li class="nav-item">
                <button type="button" role="button" class="text-left btn btn-light dropdown-toggle w-100" data-toggle="collapse" data-target="#difficulty">
                    Difficulty
                </button>
                <div class="collapse collapsible-panel" id="difficulty">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <button id="Easy" type="button" role="button" class="text-left btn w-100">Easy</button>
                        </li>
                        <li class="nav-item">
                            <button id="Normal" type="button" role="button" class="text-left btn w-100">Normal</button>
                        </li>
                        <li class="nav-item">
                            <button id="Hard" type="button" role="button" class="text-left btn w-100">Hard</button>
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
    <div class="d-table m-auto pt-3">
        <header-el image1="assets/images/1.png" :count1="count1" :count2="count2" image2="assets/images/2.png"></header-el>
        <table class="game-table" :style="style">
            <th v-for="(n, i) in size + 1" class="column-header text-center" v-set="header = columnHeader(i)">{{ header }}</th>
            <tr v-for="(n, i) in size">
                <th class ="row-header text-center">{{ n }}</th>
                    <td v-for="(m, j) in size" class="cell text-center border border-dark" :id="i + '' + j" v-on:click="clicked"></td>
                </th>
            </tr>
        </table>
        <div id="difficulty-div">{{ difficulty }}</div>
    </div>
</div>
`,
    //TODO: wire up properly (methods and props)
    data() {
        return {
            difficulty: "Normal",
            count1: 2,
            count2: 2,
            board: [],
            size: 8,
            style: "background-image: url('assets/images/back.jpg')"
        }
    },
    // TODO: WebSocket
    mounted() {
        function checkWidth() {
            let toggle = window.innerWidth < 768 ? 'hide' : 'show';
            $('#sidebar').collapse(toggle);
        }
        checkWidth();
        window.onresize = checkWidth;
    },
    methods: {
        clicked(evt) {
            console.log(evt, this.size)
        },
        columnHeader: (header) => {
            if (header > 0) {
                return String.fromCharCode(header + 64)
            }
        }
    },
}

export default Game;