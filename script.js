const Player = (name, symbol) => {
    return {name, symbol}
}

const ttt = (() => {
    let gameBoard = ['','','','','','','','','']
    function assignPlayers() {
        player1 = (Player('Bob', 'x'))
        player2 = (Player('Sally', 'o'))
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
        } else if (round % 2 === 0) {
            gameBoard.splice(this.id, 1, 'o')
            display.displayMarkers()
        }
        checkGameState()
    }
    function checkGameState() {
        if (gameBoard[1] === 'x' && gameBoard[4] === 'x' && gameBoard[7] === 'x') {
            
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
    function displayGameState() {
        
    }
return {
    displayMarkers,
    addEvents,
}
})();

ttt.assignPlayers()
display.addEvents()
display.displayMarkers()