const Game = {
    template: `
<div>

<!-- TODO: use bootstrapVue for better compatibility (collapse etc)-->

<nav class="sidenav side-collapse bg-light position-fixed" id="sidebar">
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
              <button type="button" role="button" class="text-left btn btn-light dropdown-toggle w-100" data-toggle="collapse" data-target="difficulty">
                  Difficulty
              </button>
              <div class="collapse collapsible-panel" id="difficulty">
                  <ul class="navbar-nav">
                      <li class="nav-item">
                          <button id="Easy" type="button" role="button" class="text-left btn w-100">Easy</button>
                      </li>
                      <li class="nav-item">
                          <button id="Normal" type="button" role="button" class="text-left btn w-100" data-toggle="collapse">Normal</button>
                      </li>
                      <li class="nav-item">
                          <button id="Hard" type="button" role="button" class="text-left btn w-100" data-toggle="collapse">Hard</button>
                      </li>
                  </ul>
              </div>
          </li>
          <li class="nav-item">
              <button type="button" role="button" class="text-left btn btn-light dropdown-toggle w-100" data-toggle="collapse" data-target="player-mode">
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
            <div class="row m-2">
                <div class="col text-center h-100">
                    <img src='assets/images/1.png' alt = "●" draggable = "false"/>
                    <span class="h4 align-middle">{{count1}}</span>
                </div>
                <div class="col text-center h-100">
                    <img src='assets/images/2.png' alt="○" draggable="false"/>
                    <span class="h4 align-middle">{{count2}}</span>
                </div>
            </div>
<table class="game-table" style="background-image: url('assets/images/back.jpg')">
<!-- TODO: loops -->
<th class="column-header text-center">&nbsp;</th>
<th class="column-header text-center">A</th>
<th class="column-header text-center">B</th>
<th class="column-header text-center">C</th>
<th class="column-header text-center">D</th>
<th class="column-header text-center">E</th>
<th class="column-header text-center">F</th>
<th class="column-header text-center">G</th>
<th class="column-header text-center">H</th>
<tr>
<tr>
<th class ="row-header text-center">1</th>
<td class="cell text-center border border-dark" id="00"></td>
<td class="cell text-center border border-dark" id="10"></td>
<td class="cell text-center border border-dark" id="20"></td>
<td class="cell text-center border border-dark" id="30"></td>
<td class="cell text-center border border-dark" id="40"></td>
<td class="cell text-center border border-dark" id="50"></td>
<td class="cell text-center border border-dark" id="60"></td>
<td class="cell text-center border border-dark" id="70"></td>
</tr>
<tr>
<th class ="row-header text-center">2</th>
<td class="cell text-center border border-dark" id="01"></td>
<td class="cell text-center border border-dark" id="11"></td>
<td class="cell text-center border border-dark" id="21"></td>
<td class="cell text-center border border-dark" id="31"></td>
<td class="cell text-center border border-dark" id="41"></td>
<td class="cell text-center border border-dark" id="51"></td>
<td class="cell text-center border border-dark" id="61"></td>
<td class="cell text-center border border-dark" id="71"></td>
</tr>
<tr>
<th class ="row-header text-center">3</th>
<td class="cell text-center border border-dark" id="02"></td>
<td class="cell text-center border border-dark" id="12"></td>
<td class="cell text-center border border-dark" id="22"></td>
<td class="cell text-center border border-dark" id="32" v-on:click="clicked"></td>
<td class="cell text-center border border-dark" id="42"></td>
<td class="cell text-center border border-dark" id="52"></td>
<td class="cell text-center border border-dark" id="62"></td>
<td class="cell text-center border border-dark" id="72"></td>
</tr>
<tr>
<th class ="row-header text-center">4</th>
<td class="cell text-center border border-dark" id="03"></td>
<td class="cell text-center border border-dark" id="13"></td>
<td class="cell text-center border border-dark" id="23"></td>
<td class="cell text-center border border-dark" id="33"></td>
<td class="cell text-center border border-dark" id="43"></td>
<td class="cell text-center border border-dark" id="53"></td>
<td class="cell text-center border border-dark" id="63"></td>
<td class="cell text-center border border-dark" id="73"></td>
</tr>
<tr>
<th class ="row-header text-center">5</th>
<td class="cell text-center border border-dark" id="04"></td>
<td class="cell text-center border border-dark" id="14"></td>
<td class="cell text-center border border-dark" id="24"></td>
<td class="cell text-center border border-dark" id="34"></td>
<td class="cell text-center border border-dark" id="44"></td>
<td class="cell text-center border border-dark" id="54"></td>
<td class="cell text-center border border-dark" id="64"></td>
<td class="cell text-center border border-dark" id="74"></td>
</tr>
<tr>
<th class ="row-header text-center">6</th>
<td class="cell text-center border border-dark" id="05"></td>
<td class="cell text-center border border-dark" id="15"></td>
<td class="cell text-center border border-dark" id="25"></td>
<td class="cell text-center border border-dark" id="35"></td>
<td class="cell text-center border border-dark" id="45"></td>
<td class="cell text-center border border-dark" id="55"></td>
<td class="cell text-center border border-dark" id="65"></td>
<td class="cell text-center border border-dark" id="75"></td>
</tr>
<tr>
<th class ="row-header text-center">7</th>
<td class="cell text-center border border-dark" id="06"></td>
<td class="cell text-center border border-dark" id="16"></td>
<td class="cell text-center border border-dark" id="26"></td>
<td class="cell text-center border border-dark" id="36"></td>
<td class="cell text-center border border-dark" id="46"></td>
<td class="cell text-center border border-dark" id="56"></td>
<td class="cell text-center border border-dark" id="66"></td>
<td class="cell text-center border border-dark" id="76"></td>
</tr>
<tr>
<th class ="row-header text-center">8</th>
<td class="cell text-center border border-dark" id="07"></td>
<td class="cell text-center border border-dark" id="17"></td>
<td class="cell text-center border border-dark" id="27"></td>
<td class="cell text-center border border-dark" id="37"></td>
<td class="cell text-center border border-dark" id="47"></td>
<td class="cell text-center border border-dark" id="57"></td>
<td class="cell text-center border border-dark" id="67"></td>
<td class="cell text-center border border-dark" id="77"></td>
</tr>
</table>
<div id="difficulty-div">{{ difficulty }}</div>
</div>

`,
    //TODO: wire up properly (methods and props)
    data: () => {
        return {
            difficulty: "Normal",
            count1: 2,
            count2: 2,
            board: [],
            size: 0,
        }
    },
    // TODO: WebSocket
    created: () => { console.log("created") },
    methods: {
        clicked: (evt) => {
            console.log(evt.target.id)
        }
    }
}

export default Game;