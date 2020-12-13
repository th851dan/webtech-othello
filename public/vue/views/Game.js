import { webSocket, store } from "../Store.js";

const Game = {
    template: `
<div>
    <sidebar-vue></sidebar-vue>
    <div class="d-table m-auto pt-3 animate__animated animate__slideInDown animate__faster">
        <header-el :image1='image1' :count1="count1" :count2="count2" :image2="image2"/>
        <table class="game-table" :style="style">
            <th v-for="(n, i) in size + 1" class="column-header text-center" v-set="header = columnHeader(i)">{{ header }}</th>
            <tr v-for="(n, i) in size">
                <th class ="row-header text-center">{{ n }}</th>
                    <td v-set="value = cells[i][j]" v-for="(m, j) in size" class="cell text-center border border-dark" :id="i + '' + j" v-on:click="clicked">
                        <img v-if='value > 0' :key="value" class="flip-tile" :src="value === 1 ? image1 : image2" alt="">
                        <span v-else-if='value < 0' class="dot d-inline-block rounded-circle mt-1 jelly-dot"/>
                    </td>
                </th>
            </tr>
        </table>
        <div>{{difficulty}}</div>
    </div>
</div>
`,
    data() { return store.state },
    mounted() {
        function checkWidth() {
            let toggle = window.innerWidth < 768 ? 'hide' : 'show';
            $('#sidebar').collapse(toggle);
        }
        checkWidth();
        window.onresize = checkWidth;
    },
    methods: {
        clicked(evt) {
            const x = String.fromCharCode(parseInt(evt.target.id.charAt(1)) + 65);
            const y = 1 + parseInt(evt.target.id.charAt(0));
            webSocket.send('set/' + x + y);
        },
        columnHeader: header => header > 0 ? String.fromCharCode(header + 64) : ''
    },
}

export default Game;