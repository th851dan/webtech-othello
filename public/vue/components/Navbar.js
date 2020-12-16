const Navbar = Vue.component('navbar-vue', {
    template: `
<nav class="navbar navbar-expand-md p-0 navbar-dark bg-dark">
    <button class="navbar-toggler border-0" type="button" data-toggle="collapse" data-target=".sidenav">
        <span class="navbar-toggler-icon"></span>
    </button>
    <router-link class="navbar-brand d-none d-md-block pl-3" to="/othello">
        <span class="fa fa-dot-circle-o" aria-hidden="true"></span>thello
    </router-link>
    <button class="navbar-toggler border-0 ml-auto">
        <span class="fa fa-caret-left" data-toggle="collapse" data-target="#navigation"></span>
    </button>
    <ul id="navigation" class="navbar-nav d-md-inline-flex collapse flex-row ml-md-auto">
        <router-link 
            v-for="element in [{route: '/', text: 'Home'},{route: '/othello', text: 'Game'},{route: '/rules', text: 'About'}]"
            class="nav-link pl-2 pr-2"
            :to="element.route"
        >{{element.text}}</router-link>
        <li class="nav-link">
            <a href="https://github.com/th851dan/webtech-othello"><i class="fa fa-github" aria-hidden="true"></i></a>
        </li>
    </ul>
</nav>
`
});

export default Navbar;