const Sidebar = Vue.component('sidebar-vue', {
    template: `
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
    `
})

export default Sidebar;