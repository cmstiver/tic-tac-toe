const Player = (name, symbol) => {
    return {name, symbol}
}

const ttt = (() => {
    let gameBoard = ['','','','','','','','','']
    function assignPlayers() {
        player1 = (Player('Bob', 'x'))
        player2 = (Player('Sally', 'o'))
        display.displayGameState('xturn')
        display.changePlayerNames()
    }
    round = 0
    function placeMarkers() {
        if (gameBoard[this.id] !== '') {
            return
        }
        round++
        if (round % 2 !== 0) {
            gameBoard.splice(this.id, 1, 'x')
            display.displayMarkers()
            display.displayGameState('oturn')
        } else if (round % 2 === 0) {
            gameBoard.splice(this.id, 1, 'o')
            display.displayMarkers()
            display.displayGameState('xturn')
        }
        checkGameState()
    }
    function checkGameState() {
        if (gameBoard[1] === 'x' && gameBoard[4] === 'x' && gameBoard[7] === 'x' ||
            gameBoard[0] === 'x' && gameBoard[4] === 'x' && gameBoard[8] === 'x' ||
            gameBoard[2] === 'x' && gameBoard[4] === 'x' && gameBoard[6] === 'x' ||
            gameBoard[3] === 'x' && gameBoard[4] === 'x' && gameBoard[5] === 'x' ||
            gameBoard[0] === 'x' && gameBoard[1] === 'x' && gameBoard[2] === 'x' ||
            gameBoard[6] === 'x' && gameBoard[7] === 'x' && gameBoard[8] === 'x' ||
            gameBoard[0] === 'x' && gameBoard[3] === 'x' && gameBoard[6] === 'x' ||
            gameBoard[2] === 'x' && gameBoard[5] === 'x' && gameBoard[8] === 'x'
        ) {
            display.displayGameState('xwin')
        } else if (
            gameBoard[1] === 'o' && gameBoard[4] === 'o' && gameBoard[7] === 'o' ||
            gameBoard[0] === 'o' && gameBoard[4] === 'o' && gameBoard[8] === 'o' ||
            gameBoard[2] === 'o' && gameBoard[4] === 'o' && gameBoard[6] === 'o' ||
            gameBoard[3] === 'o' && gameBoard[4] === 'o' && gameBoard[5] === 'o' ||
            gameBoard[0] === 'o' && gameBoard[1] === 'o' && gameBoard[2] === 'o' ||
            gameBoard[6] === 'o' && gameBoard[7] === 'o' && gameBoard[8] === 'o' ||
            gameBoard[0] === 'o' && gameBoard[3] === 'o' && gameBoard[6] === 'o' ||
            gameBoard[2] === 'o' && gameBoard[5] === 'o' && gameBoard[8] === 'o'
        ) {
            display.displayGameState('owin')
        } else {
            isGameDone = gameBoard.includes('')
            isGameDone ? false : display.displayGameState('tie')
            }
    }

return {
    gameBoard,
    assignPlayers,
    placeMarkers,
}
})();

const display = (() => {
    function addEvents() {
        let squares = document.querySelectorAll(".square")
        squares.forEach((square) => {
            square.addEventListener('click', ttt.placeMarkers)
        })
    }
    function displayMarkers() {
        let allSquares = document.querySelectorAll('.square')
        allSquares.forEach((square) => {
            if (square.contains(document.querySelector(".marker"))) {
                document.querySelector(".marker").remove();
            }
        })
        ttt.gameBoard.forEach((elem, i) => {
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
    function changePlayerNames() {
        document.getElementById('player1').textContent = player1.name
        document.getElementById('player2').textContent = player2.name
    }
    function displayGameState(state) {
        let gamestate = document.getElementById('gamestate')
        if (state === 'xwin') {
            gamestate.textContent = player1.name.toUpperCase() + ' WINS'
        } else if (state === 'owin') {
            gamestate.textContent = player2.name.toUpperCase() + ' WINS'
        } else if (state === 'tie') {
            gamestate.textContent = "TIE"
        } else if (state === 'xturn') {
            gamestate.textContent = player1.name + "'s turn."
        } else if (state === 'oturn') {
            gamestate.textContent = player2.name + "'s turn."
        }
    }
return {
    displayMarkers,
    addEvents,
    displayGameState,
    changePlayerNames,
}
})();

ttt.assignPlayers()
display.addEvents()
display.displayMarkers()