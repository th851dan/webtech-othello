const NotFound = {
    template: `
<div class="position-absolute vh-100 vw-100 d-flex align-items-center justify-content-center text-center">
    <div class="ml-auto mr-auto" style="margin-top: -15em">
        <div style="font-size: 600%"><i class="fa fa-bomb"></i></div>
        <h1>Oh no! Something went wrong!</h1>
        <router-link class="text-decoration-none" to="/"><h1>Take me home</h1></router-link>
    </div>
</div>
`
}

export default NotFound;