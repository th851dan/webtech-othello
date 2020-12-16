import { webSocket } from "../Store.js";

const Home = {
    template: `
    <div class="landing-page d-flex justify-content-center align-items-center">
    <router-link id="game-start" to="othello" v-on:click.native="click">
        <div id="new-game-btn" class="d-inline-block text-center text-decoration-none">
            <i id="play-button" class="fa fa-play-circle-o"></i>
            <span>NEW GAME</span>
        </div>
        </router-link>
    </div>
`,
    methods: { click: () => webSocket.send('new') },
    mounted() {
        document.title = "Welcome to Othello"
    }
};

export default Home;