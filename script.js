const Player = (name, score) => {
    return {name, score}
}

const ttt = (() => {
    let game = {
        gameBoard: ['','','','','','','','',''],
        turn: 0,
        round: 0,
    }
    function assignPlayers(x,o) {
        if (x === '') {
            x = 'X'
        }
        if (o === '') {
            o = 'O'
        }
        player1 = (Player(x, 0))
        player2 = (Player(o, 0))
        display.displayGameState('xturn')
        display.changePlayerNames()
    }
    function restartGame() {
        game.turn = 0
        game.round++
        game.gameBoard = ['','','','','','','','','']
        display.addEvents()
        game.round % 2 === 0 ? display.displayGameState('oturn') : display.displayGameState('xturn')
    }
    function placeMarkers() {
        if (game.gameBoard[this.id] !== '') {
            return
        }
        if (game.round % 2 === 0) {
            game.turn++
            if (game.turn % 2 !== 0) {
                game.gameBoard.splice(this.id, 1, 'x')
                display.displayMarkers()
                display.displayGameState('oturn')
            } else if (game.turn % 2 === 0) {
                game.gameBoard.splice(this.id, 1, 'o')
                display.displayMarkers()
                display.displayGameState('xturn')
            }
        } else {
            game.turn++
            if (game.turn % 2 === 0) {
                game.gameBoard.splice(this.id, 1, 'x')
                display.displayMarkers()
                display.displayGameState('oturn')
            } else if (game.turn % 2 !== 0) {
                game.gameBoard.splice(this.id, 1, 'o')
                display.displayMarkers()
                display.displayGameState('xturn')
            }
        }
        checkGameState()

    }
    function checkGameState() {
        if (game.gameBoard[1] === 'x' && game.gameBoard[4] === 'x' && game.gameBoard[7] === 'x' ||
            game.gameBoard[0] === 'x' && game.gameBoard[4] === 'x' && game.gameBoard[8] === 'x' ||
            game.gameBoard[2] === 'x' && game.gameBoard[4] === 'x' && game.gameBoard[6] === 'x' ||
            game.gameBoard[3] === 'x' && game.gameBoard[4] === 'x' && game.gameBoard[5] === 'x' ||
            game.gameBoard[0] === 'x' && game.gameBoard[1] === 'x' && game.gameBoard[2] === 'x' ||
            game.gameBoard[6] === 'x' && game.gameBoard[7] === 'x' && game.gameBoard[8] === 'x' ||
            game.gameBoard[0] === 'x' && game.gameBoard[3] === 'x' && game.gameBoard[6] === 'x' ||
            game.gameBoard[2] === 'x' && game.gameBoard[5] === 'x' && game.gameBoard[8] === 'x'
        ) {
            display.displayGameState('xwin')
        } else if (
            game.gameBoard[1] === 'o' && game.gameBoard[4] === 'o' && game.gameBoard[7] === 'o' ||
            game.gameBoard[0] === 'o' && game.gameBoard[4] === 'o' && game.gameBoard[8] === 'o' ||
            game.gameBoard[2] === 'o' && game.gameBoard[4] === 'o' && game.gameBoard[6] === 'o' ||
            game.gameBoard[3] === 'o' && game.gameBoard[4] === 'o' && game.gameBoard[5] === 'o' ||
            game.gameBoard[0] === 'o' && game.gameBoard[1] === 'o' && game.gameBoard[2] === 'o' ||
            game.gameBoard[6] === 'o' && game.gameBoard[7] === 'o' && game.gameBoard[8] === 'o' ||
            game.gameBoard[0] === 'o' && game.gameBoard[3] === 'o' && game.gameBoard[6] === 'o' ||
            game.gameBoard[2] === 'o' && game.gameBoard[5] === 'o' && game.gameBoard[8] === 'o'
        ) {
            display.displayGameState('owin')
        } else {
            isGameDone = game.gameBoard.includes('')
            isGameDone ? false : display.displayGameState('tie')
            }
    }

return {
    game,
    assignPlayers,
    placeMarkers,
    restartGame,
}
})();

const display = (() => {
    function enterButton() {
        let xinput = document.getElementById('xinput')
        let oinput = document.getElementById('oinput')
        if (xinput.value.length > 13 || oinput.value.length > 13) {
            alert('Names must be less than 12 characters.')
        } else {
            document.getElementById('start').remove()
            ttt.assignPlayers(xinput.value, oinput.value)
            addEvents()
        }
    }
    function addEvents() {
        document.getElementById('restart').addEventListener('click', restartButton)
        let squares = document.querySelectorAll(".square")
        squares.forEach((square) => {
            square.addEventListener('click', ttt.placeMarkers)
        })
    }
    function removeEvents() {
        let squares = document.querySelectorAll(".square")
        squares.forEach((square) => {
            square.removeEventListener('click', ttt.placeMarkers)
        })
    }
    function removeMarkers() {
        let allSquares = document.querySelectorAll('.square')
        allSquares.forEach((square) => {
            if (square.contains(document.querySelector(".marker"))) {
                document.querySelector(".marker").remove();
            }
        }) 
    }
    function displayMarkers() {
        removeMarkers()
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
    function changePlayerNames() {
        document.getElementById('player1').textContent = player1.name
        document.getElementById('player2').textContent = player2.name
    }
    function displayGameState(state) {
        let gamestate = document.getElementById('gamestate')
        player1Score = document.getElementById('player1score')
        player2Score = document.getElementById('player2score')
        if (state === 'xwin') {
            player1.score++
            gamestate.textContent = player1.name.toUpperCase() + ' WINS'
            player1Score.textContent = player1.score
            removeEvents()
        } else if (state === 'owin') {
            player2.score++
            gamestate.textContent = player2.name.toUpperCase() + ' WINS'
            player2Score.textContent = player2.score
            removeEvents()
        } else if (state === 'tie') {
            gamestate.textContent = "TIE"
            removeEvents()
        } else if (state === 'xturn') {
            gamestate.textContent = player1.name + "'s turn."
        } else if (state === 'oturn') {
            gamestate.textContent = player2.name + "'s turn."
        }
    }
    function restartButton() {
        removeMarkers()
        ttt.restartGame()
    }
return {
    displayMarkers,
    addEvents,
    displayGameState,
    changePlayerNames,
    enterButton,
}
})();