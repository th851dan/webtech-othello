import Sidebar from "../components/Sidebar.js";

const Game = {
    template: `
<div>
    <sidebar-vue></sidebar-vue>
    <div class="d-table m-auto pt-3">
        <header-el image1="assets/images/1.png" :count1="count1" :count2="count2" image2="assets/images/2.png"></header-el>
        <table class="game-table" :style="style">
            <th v-for="(n, i) in size + 1" class="column-header text-center" v-set="header = columnHeader(i)">{{ header }}</th>
            <tr v-for="(n, i) in size">
                <th class ="row-header text-center">{{ n }}</th>
                    <td v-for="(m, j) in size" class="cell text-center border border-dark" :id="i + '' + j" v-on:click="clicked"></td>
                </th>
            </tr>
        </table>
        <div id="difficulty-div">{{ difficulty }}</div>
    </div>
</div>
`,
    //TODO: wire up properly (methods and props)
    data() {
        return {
            difficulty: "Normal",
            count1: 2,
            count2: 2,
            board: [],
            size: 8,
            style: "background-image: url('assets/images/back.jpg')"
        }
    },
    // TODO: WebSocket
    mounted() {
        function checkWidth() {
            let toggle = window.innerWidth < 768 ? 'hide' : 'show';
            $('#sidebar').collapse(toggle);
        }
        window.onload = checkWidth;
        window.onresize = checkWidth;
        setTimeout(checkWidth);
    },
    methods: {
        clicked(evt) {
            console.log(evt, this.size)
        },
        columnHeader: (header) => {
            if (header > 0) {
                return String.fromCharCode(header + 64)
            }
        }
    },
}

export default Game;