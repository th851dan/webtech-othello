const apiUrl = "http://localhost:9000/"

function difficultyModeFunction(diff, playerCount) {
    difficultyFunction(diff)
    modeFunction(playerCount)
}

function difficultyFunction(diff) {
    let diffElms = document.getElementsByName("diffRadio")
    diffElms.forEach(elm => {
        if (elm.value === diff)
            elm.checked = true
    })
}

function modeFunction(playerCount) {
    let mode = playerCount === "0" ? "cvc" : playerCount === "1" ? "pvc" : "pvp"
    let modeElms = document.getElementsByName("modeRadio")
    modeElms.forEach(elm => {
        if (elm.value === mode)
            elm.checked = true
    })
}

function changeDifficulty(elm, oldDiff) {
        if (confirm("Change difficulty to: " + elm.innerHTML + "?")) {
            request("difficulty/" + elm.id)
        } else
        {
            difficultyFunction(oldDiff)
        }
}

function changeMode(elm, oldMode) {
        if (confirm("Change mode to: " + elm.innerHTML + "?")) {
            request("mode/" + elm.id)
        } else
        {
            modeFunction(oldMode)
        }
}

function request(endpoint) {
    fetch(apiUrl + endpoint).then(() => location.href = apiUrl + "othello")
}