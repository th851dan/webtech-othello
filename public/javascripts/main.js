/**
 * Represents a game board.
 * @typedef {Object} Board
 * @property {Number} size - the size of the board
 * @property {Array.<Square>} squares - Array containing the individual squares of the board
 */

/**
 * Represents a square on the game board.
 * @typedef {Object} Square
 * @property {Number} value - the value of the square (1 for black, 2 for white)
 * @property {Number} col - the column of the square on the board
 * @property {Number} row - the row of the square on the board
 */

document.onreadystatechange = () => {
    const $window = $(window);

    function checkWidth() {
        if ($window.width() < 768) {
            $('#sidebar').removeClass('show');
        }
        if ($window.width() >= 768) {
            $('#sidebar').addClass('show');
        }
    }
    // prevent from loading multiple times
    if (document.readyState === "complete") {
        checkWidth();
        updateUI();
        updateDifficulty();

        $(window).resize(checkWidth);
    }
};

$('#new-game-btn').click(() => fetch("new").then(() => location.href = "othello"));

/**
 * Fetches a resource and updates the UI.
 * @param {String} endpoint - Resource that is fetched
 */
function request(endpoint) {
    fetch(endpoint).then(updateUI);
}

/**
 * Sets the desired difficulty level.
 * @param {String} difficulty - The desired difficulty
 */
function changeDifficulty(difficulty) {
    fetch("difficulty/" + difficulty).then(updateDifficulty);
}

/**
 * Updates elements within the page that react to difficulty changes.
 */
function updateDifficulty() {
    fetch("getDifficulty")
        .then(response => response.text())
        .then(difficulty => {
            ["Easy", "Normal", "Hard"].forEach(d => $('#' + d).removeClass("active text-body"));
            $('#' + difficulty).addClass("active text-body");
            $("#difficulty-div").text(difficulty);
        });
}

/**
 * Sets a new tile on the field at the position passed as col and row parameters.
 * @param col {Number} - column in the board
 * @param row {Number} - row in the board
 */
function set(col, row) {
    const x = String.fromCharCode(col + 65);
    const y = 1 + row;
    fetch("set/" + x + y).then(updateUI);
    setTimeout(updateUI, 100);
}

/**
 * Fetches a JSON object containing information about the game's current state and repaints the UI accordingly.
 */
function updateUI() {
    fetch( "boardJson")
        .then(response => response.json())
        .then(repaintBoard);
}

/**
 * Repaints the Ui with the information contained within the board Object.
 * @param {Board} board
 */
function repaintBoard(board) {
    board.squares.forEach(square => {
        const element = document.getElementById(square.row + "" + square.col);
        if (element === null) {
            return;
        }
        element.onclick = () => set(square.row, square.col);
        element.childNodes.forEach(e => {
            if (square.value === 0 || (square.value < 0 && e.src) || (square.value > 0 && (!e.src || !e.src.includes(square.value.toString())))) {
                e.remove();
            }
        })
        if (element.childNodes.length === 0) {
            if (square.value > 0) {
                const child = document.createElement("img");
                child.setAttribute("src", "assets/images/" + square.value + ".png");
                child.setAttribute("class", "flip-tile");
                child.setAttribute("alt", square.value === 1 ? "●" : "○");
                child.setAttribute("draggable", "false");
                element.appendChild(child);
            } else if (square.value < 0) {
                const child = document.createElement("span");
                child.setAttribute("class", "dot d-inline-block rounded-circle mt-1 jelly-dot");
                element.appendChild(child);
            }
        }
    });
    $("#black-tiles").text(board.squares.filter(e => e.value === 1).length);
    $("#white-tiles").text(board.squares.filter(e => e.value === 2).length);
    checkForGameOver();
}

/**
 * Checks if the current game is finished and displays a popup if so.
 */
function checkForGameOver() {
    fetch("getGameOver")
        .then(response => response.text())
        .then(text => {
            if (text.toString() === "true") {
                setTimeout(showGameOverPopup, 500);
            }
        });
}

/**
 * Displays a modal when the game finishes.
 */
function showGameOverPopup() {
    const black = parseInt($("#black-tiles").text());
    const white = parseInt($("#white-tiles").text());
    const $title = $('#game-over-title');
    if (black !== white) {
        const winnerValue = black > white ? 1 : 2;
        $title.text(winnerValue === 1 ? "Black wins!" : "White wins!")
        $('#winner').attr('src', "assets/images/" + winnerValue + ".png");
    } else {
        $title.text("Game over");
    }
    $('#game-over-modal').modal('show');
}
