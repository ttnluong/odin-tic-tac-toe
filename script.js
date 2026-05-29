/* board
    [0][1][2]  
    [3][4][5]
    [6][7][8]
*/

// 1. GAME BOARD MODULE
// ==========================================

const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const addMark = (cell, marker) => {
        if (board[cell] !== "") {
            return;
        } else {
            board[cell] = marker;
        }
    };

    const resetBoard = () => { 
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    };

    return {getBoard, addMark, resetBoard};
    
})();

// 2. PLAYER FACTORY + INPUT NAME
// ==========================================

function createPlayer(name, marker) {
    let isComputer = false;
    let score = 0;
    const getScore = () => score;
    const givePoint = () => score++;

    return {name, marker, getScore, givePoint};
};

const playerOne = createPlayer("X", "X");
const playerTwo = createPlayer("O", "O");

const nameOne = document.getElementById("playerone");
const nameTwo = document.getElementById("playertwo");

nameOne.addEventListener("input", () => {
    playerOne.name = nameOne.value;
    if (gameBoard.getBoard().every(cell => cell === ""))
    display.updateStatus(`${game.getCurrentPlayer().name} starts!`);
})

nameTwo.addEventListener("input", () => {
    playerTwo.name = nameTwo.value;
})

// 3. GAME FLOW MODULE
// ==========================================

const game = (() => {
    const getCurrentPlayer = () => {
        const board = gameBoard.getBoard();
        const moves = board.filter(cell => cell !== "").length;
        return moves % 2 === 0 ? playerOne : playerTwo;
    };

    const checkWin = (currentPlayer) => {
        const board = gameBoard.getBoard();
        const winningPatterns = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];

        for (const pattern of winningPatterns) {
            const [a,b,c] = pattern;
            if (board[a] === currentPlayer.marker && board[b] === currentPlayer.marker && board[c] === currentPlayer.marker) {
                return pattern;  // return pattern for cell highlighting
            }
        }
        return null;
    };

    const checkTie = () => {
        const board = gameBoard.getBoard();
        return board.every(cell => cell !== "");
    };

    const playRound = (cell) => {
        const currentPlayer = getCurrentPlayer();
        gameBoard.addMark(cell, currentPlayer.marker);
        const win = checkWin(currentPlayer); // gets winning pattern

        if (win) {
            currentPlayer.givePoint();
            return {message: `${currentPlayer.name} wins!`, gameOver: true, winningCells: win};
        };

        if (checkTie()) return {message: "It's a tie!", gameOver: true};

        return {message: `${getCurrentPlayer().name}'s turn`, gameOver: false};
    };

    return {getCurrentPlayer, playRound};

})();

// 3. DISPLAY MODULE
// ==========================================

const display = (() => {
    let gameOver = false;

    const status = document.querySelector(".status");
    const boardContainer = document.querySelector(".gameboard");
    const scoreOne = document.getElementById("scoreone");
    const scoreTwo = document.getElementById("scoretwo");
    const resetButton = document.getElementById("reset");

    status.textContent = game.getCurrentPlayer().name + " starts!";
    const updateStatus = (msg) => status.textContent = msg;

    const updateScore = () => {
        scoreOne.textContent = playerOne.getScore();
        scoreTwo.textContent = playerTwo.getScore();
    };

    const createBoard = () => {
        const board = gameBoard.getBoard();
        for (let i = 0; i < board.length; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;
            cell.addEventListener("click", updateCell);
            boardContainer.appendChild(cell);
        }
    };

    const updateCell = (e) => {
        if (gameOver) return;
        const clickedCell = e.target.dataset.index;
        const result = game.playRound(clickedCell);
        status.textContent = result.message;
        gameOver = result.gameOver;
        if (result.winningCells) {
            result.winningCells.forEach(i => {
            document.querySelectorAll(".cell")[i].classList.add("winner");
        });
}
        updateBoard();
        updateScore();
    };

    const updateBoard = () => {
        const board = gameBoard.getBoard();
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell, i) => {
            cell.textContent = board[i];
        });
    };
    
    resetButton.addEventListener("click", () => {
        gameBoard.resetBoard();
        gameOver = false;
        document.querySelectorAll(".winner").forEach(cell => cell.classList.remove("winner"));
        updateBoard();
        status.textContent = game.getCurrentPlayer().name + " starts!";
    });

    createBoard();
    updateScore();

    return {updateStatus};

})();

display();
