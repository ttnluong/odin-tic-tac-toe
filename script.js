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

// 2. PLAYER FACTORY
// ==========================================

function createPlayer(name, marker) {
    return {name, marker};
};

const playerOne = createPlayer("X", "X");
const playerTwo = createPlayer("O", "O");

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
            board[0] + board[1] + board[2],
            board[3] + board[4] + board[5],
            board[6] + board[7] + board[8],
            board[0] + board[3] + board[6],
            board[1] + board[4] + board[7],
            board[2] + board[5] + board[8],
            board[0] + board[4] + board[8],
            board[2] + board[4] + board[6],
        ];

        for (const pattern of winningPatterns) {
                if (pattern === currentPlayer.marker + currentPlayer.marker + currentPlayer.marker) {
                    return true;
                }
            } return false;
        };

    const checkTie = () => {
        const board = gameBoard.getBoard();
        return board.every(cell => cell !== "");
    };

    const playRound = (cell) => {
        const currentPlayer = getCurrentPlayer();
        gameBoard.addMark(cell, currentPlayer.marker);

        if (checkWin(currentPlayer)) return {message: `${currentPlayer.name} wins!`, gameOver: true};

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
    const playerOne = document.querySelector(".playerone");
    const playerTwo = document.querySelector(".playertwo");
    const resetButton = document.getElementById("reset");

    status.textContent = game.getCurrentPlayer().name + " starts!";

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
        updateBoard();
    };

    const updateBoard = () => {
        const board = gameBoard.getBoard();
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell, i) => {
            cell.textContent = board[i];
        });
    };

    createBoard();
    
    resetButton.addEventListener("click", () => {
        gameBoard.resetBoard();
        gameOver = false;
        updateBoard();
        status.textContent = game.getCurrentPlayer().name + " starts!";
    });

});

display();
