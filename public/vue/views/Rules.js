const Rules = {
    template: `
<div>
    <div class="rules col-12 col-md-9 text-justify mt-3 mt-md-5 mb-3 mb-md-5 ml-auto mr-auto animate__animated animate__fadeInRight rounded">
        <div class="content p-3 p-md-5">
            <h1 class="text-center">About Othello</h1>

            <img class="d-block m-auto animate__animated animate__fadeInLeftBig" :src="screenshot" alt="screenshot"/>

            <p>Othello is the trading name of a much older board game, Reversi. In both its originally named form and the newer trademark this game has become very popular on computers as much as in board format. Often referred to as a game of abstract strategy, Othello can only be played as a 2 player game. Made up of 8 rows and 8 columns, the board is populated with pieces from both players in turn. Each player’s pieces will be of one colour with the most common occurrence being black and white.</p>

            <h3 class="ml-5">How to Play Othello</h3>

            <p>Players battle to finish the game with more of their own pieces on the board than their opponent. The game is classed as finished when there are no spaces left on the board or there are no more possible legal moves for either competitor</p>

            <h3 class="ml-5">The Start</h3>

            <p>Both players begin the game with two pieces on the board in the four centre squares. No two matching colours are connected vertically or horizontally so a miniature chequered pattern is made. In the typical set ups where it is black versus white the person using black chips must make the first move.</p>

            <h3 class=ml-5>The Game</h3>

            <p>Both players take it in turns to make their move which consists of placing one piece down in a legally acceptable position and then turning any of the opposing player’s pieces where applicable. A legal move is one that consists of, for example, a black piece being placed on the board that creates a straight line (vertical, horizontal or diagonal) made up of a black piece at either end and only white pieces in between. When a player achieves this, they must complete the move by turning any white pieces in between the two black so that they line becomes entirely black. This turning action must be completed for every legal turning line that is created with the placing of the new piece.</p>

            <p>It goes without say that while the example assumes the use of black as the moving player, it is applicable both ways.</p>

            <p>Players will then continue to move alternately until they get to the end of the game and a winner is decided. This decision is reached by identifying which of the two opponents has the most pieces on the board.</p>
        </div>
    </div>
    <div id="floating-btn" class="btn btn-lg d-flex position-fixed justify-content-center align-items-center rounded-circle animate__animated animate__slideInUp animate__fast">
        <i class="fa fa-mail-reply"></i>
    </div>
</div>
`,
    data() {
        return {
            screenshot: 'assets/images/screenshot.png'
        }
    },
    mounted() {
        $('#floating-btn').click(() => history.back());
        document.title = "About"
    }
};

export default Rules;