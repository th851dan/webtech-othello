const Navbar = Vue.component('navbar-vue', {
    template: `
<nav class="navbar navbar-expand-md p-2 p-md-0 navbar-dark bg-dark align-items-stretch">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidebar">
        <span class="navbar-toggler-icon"></span>
    </button>
    <router-link class="navbar-brand d-none d-md-block pl-3" to="/othello"><i class="fa fa-dot-circle-o" aria-hidden="true"></i>thello</router-link>
    <ul class="nav navbar-nav flex-row ml-auto">
        <li class="nav-link mr-2 mr-md-0">
            <router-link to="/rules">About</router-link>
        </li>
        <li class="nav-link">
            <a href="https://github.com/th851dan/webtech-othello"><i class="fa fa-github" aria-hidden="true"></i></a>
        </li>
    </ul>
</nav>
`
});

export default Navbar;