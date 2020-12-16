const store = {
    state: {
        size: 0,
        difficulty: '',
        cells: [],
        count1: 0,
        count2: 0,
        currentPlayer: {
            name: '',
            value: 0,
            isBot: false
        },
        status: '',
        mode: 0,
        image1: 'assets/images/1.png',
        image2: 'assets/images/2.png',
        style: "background-image: url('assets/images/back.jpg')"
    },
    setBoardInfo(cells) {
        this.state.size = cells.length;
        this.state.cells = cells;
        this.state.count1 = [].concat.apply([], cells).filter(e => e === 1).length;
        this.state.count2 = [].concat.apply([], cells).filter(e => e === 2).length;
    },
    setDifficulty(difficulty) {
        this.state.difficulty = difficulty;
    },
    setStatus(status) {
        this.state.status = status;
    },
    setPlayer(player) {
        this.state.currentPlayer = player;
    },
    setMode(mode) {
        this.state.mode = mode;
    },
}

let webSocket;

function connectWebSocket() {
    webSocket = new WebSocket("ws://localhost:9000/websocket")
    console.info("Connecting to WebSocket...");

    webSocket.onopen = () => {
        console.info("Connected to server: " + webSocket.url);
        webSocket.send("connect");
    }

    webSocket.onmessage = message => webSocketOnMessage(message)

    webSocket.onerror = event => console.error(event);
    webSocket.onclose = () => setTimeout(connectWebSocket, 2000);
}

function parseBoard(object) {
    const {size, squares} = object;
    let cellArray = new Array(size);
    for (let i = 0; i < size; i++) {
        cellArray[i] = new Array(size);
    }
    squares.forEach(o => cellArray[o.col][o.row] = o.value);
    return cellArray;
}

function webSocketOnMessage(message) {
    try {
        const { event, object } = JSON.parse(message.data);
        switch (event) {
            case 'board-changed':
                let board = parseBoard(object);
                store.setBoardInfo(board);
                break;
            case 'difficulty-changed':
                const {difficulty} = object;
                store.setDifficulty(difficulty);
                break;
            case 'game-status-changed':
                const { new_status } = object;
                store.setStatus(new_status);
                if (new_status === "GAME_OVER") {
                    setTimeout(() => $('#game-over-modal').modal('show'), 500);
                }
                break;
            case "player-changed":
                store.setPlayer(object)
                break;
            case "mode-changed":
                const {mode} = object;
                store.setMode(mode)
                break;
            default:
                console.error("Unknown message");
                break;
        }
    } catch (e) {
        console.error(e)
    }
}

document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') {
        connectWebSocket();
    }
});

export { webSocket, store };
