const cellElements = document.querySelectorAll('[data-cell]');
let circleTurn
const board = document.getElementById('board')
const X_CLASS = 'x'
const winningMessage = document.querySelector('[data-winning-message-text]')
const CIRCLE_CLASS = 'circle'
let startGame = false
const popUpMessage = document.getElementById('winningMessage')
const winning_combo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]



cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true })
})

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        if (currentClass === X_CLASS) {
            winningMessage.innerText = `X Wins!`
            popUpMessage.classList.add('show')
        }
        else {
            winningMessage.innerText = `O Wins!`
            popUpMessage.classList.add('show')
        }
    }
    else if (isDraw()) {
        endGame(true)
    }
    else {
        swapTurns()
        setHover()
    }
    const restartBtn = document.getElementById("restartButton");
    restartBtn.addEventListener('click', () => {
        location.reload()
    })
}

function endGame(draw) {
    if (draw) {
        winningMessage.innerText = `Draw`
        popUpMessage.classList.add('show')
    }
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

const placeMark = (cell, currentClass) => {
    cell.classList.add(currentClass)
    cell.style.cursor = 'not-allowed'
}

const swapTurns = () => {
    circleTurn = !circleTurn
}
const setHover = () => {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}
if (startGame === false) {
    board.classList.add(X_CLASS)
}
function checkWin(currentClass) {
    return winning_combo.some(wins => {
        return wins.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

