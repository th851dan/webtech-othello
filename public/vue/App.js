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
