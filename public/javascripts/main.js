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
    updateUI()

    $(window).resize(checkWidth);
};

function request(endpoint) {
    fetch(apiUrl + endpoint).then(updateUI)
}

function getDifficulty() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", apiUrl + "getdifficulty");
    xhr.onloadend = () => {
        ["Easy", "Normal", "Hard"].forEach(d => $('#' + d).removeClass("active text-body"));
        $('#' + xhr.response).addClass("active text-body");
        $("#difficulty-div").text(xhr.response);
    }
    xhr.send();
}

function updateUI() {
    window.history.pushState( null, null,"/othello");
    getDifficulty();
    reloadBoard();
}

function set(x, y) {
    const col = String.fromCharCode(x + 65)
    const row = 1 + y
    fetch(apiUrl + `set/${col}${row}`).then(updateUI);
    setTimeout(reloadBoard, 100);
}

// reload board without reloading whole page
function reloadBoard() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl + "boardjson");
    xhr.onloadend = () => repaintBoard(xhr.response);
    xhr.send();
}

function repaintBoard(response) {
    const boardJson = JSON.parse(response)
    boardJson.squares.forEach(elem => {
        const square = document.getElementById(elem.row + "" + elem.col);
        square.childNodes.forEach(e => e.remove())
        if (elem.value > 0) {
            const child = document.createElement("img")
            child.setAttribute("src", "assets/images/" + elem.value + ".png")
            square.appendChild(child)
        } else if (elem.value < 0) {
            const child = document.createElement("span");
            child.setAttribute("class", "dot d-inline-block rounded-circle mt-1");
            square.appendChild(child)
        }
    });
    $("#black-tiles").text(boardJson.squares.filter(e => e.value === 1).length);
    $("#white-tiles").text(boardJson.squares.filter(e => e.value === 2).length);
}