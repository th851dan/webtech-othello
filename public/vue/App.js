import Home from './views/Home.js'
import Game from './views/Game.js'
import Rules from './views/Rules.js'
import NotFound from './views/NotFound.js'
import Navbar from './components/Navbar.js'
import Sidebar from "./components/Sidebar.js";

const routes = [
    { path: '/', component: Home },
    { path: '/othello', component: Game },
    { path: '/rules', component: Rules },
    { path: '*', component: NotFound }
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

export default router