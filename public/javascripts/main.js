$(document).ready(function() {
    let $window = $(window);

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
});