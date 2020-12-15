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
    data() {
        return {
            transitionEnter: '',
            transitionExit: '',
        }
    },
    template: `
    <div class="user-select-none">
        <navbar-vue class="animate__animated animate__slideInDown animate__faster"/>
        <sidebar-vue/>
        <transition :enter-active-class=transitionEnter :leave-active-class=transitionExit mode="out-in">
            <router-view/>
        </transition>
    </div>
    `
    ,
    watch: {
        '$route'(to, from) {
            let animation = 'animate__faster animate__animated animate__fade';
            if (from.path === "/rules" || to.path === "/") {
                this.transitionEnter = animation + 'InLeft';
                this.transitionExit = animation + 'OutRight';
            } else {
                this.transitionEnter = animation + "InRight";
                this.transitionExit = animation + "OutLeft";
            }
        }
    }
})
