const apiUrl = "http://localhost:9000/"

document.onreadystatechange = function() {
    const $window = $(window);

    function checkWidth() {
        if ($window.width() < 800) {
            $('#sidebar').removeClass('show');
        }

        if ($window.width() >= 800) {
            $('#sidebar').addClass('show');
        }
    }

    checkWidth();

    $(window).resize(checkWidth);
};

function setDifficulty(difficulty) {
    fetch(apiUrl + "difficulty/" + difficulty).then(() => location.href = apiUrl + "othello")
}

function set(square) {
    fetch(apiUrl + "set/" + square).then(() => location.href = apiUrl + "othello")
}