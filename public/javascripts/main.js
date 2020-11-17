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

    $(window).resize(checkWidth);
};

function request(endpoint) {
    fetch(apiUrl + endpoint).then(() => location.href = apiUrl + "othello")
}
