import Home from './views/Home.js'
import Game from './views/Game.js'
import Rules from './views/Rules.js'

const routes = [
    { path: '/', component: Home },
    { path: '/othello', component: Game },
    { path: '/rules', component: Rules }
];

const router = new VueRouter({
    routes: routes,
    mode: 'history',
    base: '/'
});
new Vue({
    el: '#app',
    router: router,
})

document.addEventListener('readystatechange', () => {
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
        $(window).resize(checkWidth);
    }
});
