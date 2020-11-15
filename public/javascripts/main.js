
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
    if(elm.checked) {
        let newDiff = elm.value
        if (confirm("Change difficulty to: " + newDiff + "?")) {
            //TODO: Call function change difficulty
        } else
        {
            difficultyFunction(oldDiff)
        }
    }
}

function changeMode(elm, oldMode) {
    if(elm.checked) {
        let newMode = elm.value == "cvc" ? "0" : elm.value == "pvc" ? "1" : "2"
        if (confirm("Change mode to: " + elm.value + "?")) {
            //TODO: Call function change mode
        } else
        {
            modeFunction(oldMode)
        }
    }
}
