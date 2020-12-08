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
        connectWebSocket();
        checkWidth();
        $(window).resize(checkWidth);
    }
};

let webSocket;

/**
 * Connect or reconnect to server with websocket.
 *
 */

function connectWebSocket() {
    webSocket = new WebSocket("ws://localhost:9000/websocket")
    console.info("Connecting to WebSocket...");

    webSocket.onopen = () => {
        console.info("Connected to server: " + webSocket.url);
        webSocket.send("connect");
    }

    webSocket.onmessage = message => webSocketOnMessage(message)

    webSocket.onerror = event => console.error(event);
    webSocket.onclose = () => setTimeout(connectWebSocket, 2000);
}

function webSocketOnMessage(message) {
    try {
        const { event, object } = JSON.parse(message.data);
        switch (event) {
            case "board-changed":
                repaintBoard(object)
                break;
            case "difficulty-changed":
                const { difficulty } = object;
                updateDifficulty(difficulty);
                break;
            case "game-status-changed":
                const { new_status } = object;
                if (new_status === "GAME_OVER") {
                    setTimeout(showGameOverPopup, 500);
                }
                break;
            case "player-changed":
                console.log(object)
                break;
            default:
                console.error("Unknown message");
                break;
        }
    } catch (e) {
        console.error(e)
    }
}

$('#new-game-btn').click(() => fetch("new").then(() => location.href = "othello"));

/**
 * Fetches a resource.
 * @param {String} endpoint - Resource that is fetched
 */
const request = (endpoint) => webSocket.send(endpoint);

/**
 * Sets the desired difficulty level.
 * @param {String} difficulty - The desired difficulty
 */
function changeDifficulty(difficulty) {
    request("difficulty/" + difficulty);
}

/**
 * Updates elements within the page that react to difficulty changes.
 */
function updateDifficulty(difficulty) {
    ["Easy", "Normal", "Hard"].forEach(d => $('#' + d).removeClass("active text-body"));
    $('#' + difficulty).addClass("active text-body");
    $("#difficulty-div").text(difficulty);
}

/**
 * Sets a new tile on the field at the position passed as col and row parameters.
 * @param col {Number} - column in the board
 * @param row {Number} - row in the board
 */
function set(col, row) {
    const x = String.fromCharCode(col + 65);
    const y = 1 + row;
    request("set/" + x + y);
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
        const oldChild = element.firstChild;
        if (square.value === 0 && oldChild !== null) {
            oldChild.remove();
        } else if (square.value > 0) {
            const child = document.createElement("img");
            child.setAttribute("src", "assets/images/" + square.value + ".png");
            child.setAttribute("class", "flip-tile");
            child.setAttribute("alt", square.value === 1 ? "●" : "○");
            child.setAttribute("draggable", "false");
            if (oldChild === null) {
                element.appendChild(child);
            } else if (oldChild.src === null || oldChild.src !== child.src) {
                element.replaceChild(child, oldChild);
            }
        } else if (square.value < 0 && oldChild === null) {
            const child = document.createElement("span");
            child.setAttribute("class", "dot d-inline-block rounded-circle mt-1 jelly-dot");
            element.appendChild(child);
        }
    });
    $("header-el")
        .attr("count1", board.squares.filter(e => e.value === 1).length)
        .attr("count2", board.squares.filter(e => e.value === 2).length);
}

/**
 * Displays a modal when the game finishes.
 */
function showGameOverPopup() {
    const headerElement = $('header-el');
    const black = parseInt(headerElement.attr("count1"));
    const white = parseInt(headerElement.attr("count2"));
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

