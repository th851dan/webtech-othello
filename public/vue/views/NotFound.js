const NotFound = {
    template: `
<div style="position: absolute; height: 100%; width: 100%; display: flex; align-items: center; justify-items: center; text-align: center">
    <div style="margin-left: auto; margin-right: auto; margin-top: -15em">
        <div style="font-size: 600%"><i class="fa fa-bomb"></i></div>
        <h1>Oh no! Something went wrong!</h1>
        <router-link style="text-decoration: none" to="/"><h1>Take me home</h1></router-link>
    </div>
</div>
`
}

export default NotFound;