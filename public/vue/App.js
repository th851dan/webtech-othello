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
    components: {Sidebar, Navbar},
    router: router,
    template: `
    <div class="user-select-none">
        <navbar-vue class="animate__animated animate__slideInDown animate__faster"/>
        <sidebar-vue/>
        <router-view/>
    </div>
    `
    ,
    mounted: () => {
        document.title = "Welcome to Othello"
        $('#sidebar').collapse('hide')
    },
})

export default router