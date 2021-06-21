const ttt = (() => {
const game = {
    gameBoard: ['x','o','x','o','x','o','x','o','x'],
}
return {
    game,
}
})();

const Player = () => {
}

const display = (() => {
    function displayMarkers() {
        ttt.game.gameBoard.forEach((elem, i) => {
            let marker = document.createElement('div');
            if (elem == 'x') {
                marker.classList.add('marker', 'X');
                marker.textContent = "X"
            } else if (elem == 'o') {
                marker.classList.add('marker', 'O');
                marker.textContent = "O"
            } else {
                return
            }
            let square = document.getElementById(`${i}`)
            square.appendChild(marker)
        })
    }
    function test() {
        console.log(ttt.game)
    }
return {
    displayMarkers,
    test,
}
})();

display.displayMarkers()