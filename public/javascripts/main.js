/** @param boardJson.squares*/

const apiUrl = "http://localhost:9000/"

document.onreadystatechange = function() {
    const $window = $(window);

    function checkWidth() {
        if ($window.width() < 768) {
            $('#sidebar').removeClass('show');
        }

        if ($window.width() >= 768) {
            $('#sidebar').addClass('show');
        }
    }

    checkWidth();
    updateUI();
    updateDifficulty();

    $(window).resize(checkWidth);
};

function request(endpoint) {
    fetch(apiUrl + endpoint).then(updateUI);
}

function changeDifficulty(difficulty) {
    fetch(apiUrl + "difficulty/" + difficulty).then(updateDifficulty);
}

function updateDifficulty() {
    fetch(apiUrl + "getdifficulty")
        .then(response => response.text())
        .then(difficulty => {
            ["Easy", "Normal", "Hard"].forEach(d => $('#' + d).removeClass("active text-body"));
            $('#' + difficulty).addClass("active text-body");
            $("#difficulty-div").text(difficulty);
    });
}

function updateUI() {
    window.history.pushState( null, null,"/othello");
    reloadBoard();
}

function set(x, y) {
    const col = String.fromCharCode(x + 65);
    const row = 1 + y;
    fetch(apiUrl + `set/${col}${row}`).then(updateUI);
    setTimeout(reloadBoard, 100);
}

// reload board without reloading whole page
function reloadBoard() {
    fetch(apiUrl + "boardjson")
        .then(response => response.json())
        .then(board => repaintBoard(board));
}

function repaintBoard(boardJson) {
    boardJson.squares.forEach(elem => {
        const square = document.getElementById(elem.row + "" + elem.col);
        square.childNodes.forEach(e => {
            if (elem.value === 0 || (elem.value < 0 && e.src) || (elem.value > 0 && (!e.src || !e.src.includes(elem.value)))) {
                e.remove();
            }
        })
        if (square.childNodes.length === 0) {
            if (elem.value > 0) {
                const child = document.createElement("img");
                child.setAttribute("src", "assets/images/" + elem.value + ".png");
                child.setAttribute("class", "flip-tile");
                square.appendChild(child);
            } else if (elem.value < 0) {
                const child = document.createElement("span");
                child.setAttribute("class", "dot d-inline-block rounded-circle mt-1 jelly-dot");
                square.appendChild(child);
            }
        }
    });
    $("#black-tiles").text(boardJson.squares.filter(e => e.value === 1).length);
    $("#white-tiles").text(boardJson.squares.filter(e => e.value === 2).length);
}