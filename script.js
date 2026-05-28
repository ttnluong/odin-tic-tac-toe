// 1. GAME BOARD MODULE
// ==========================================

const gameBoard = () => {
    const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    const getBoard = () => board;

    const addMark = (index, marker) => {
        if (board[index] !== 0) {
            return;
        } else {
            board[index] = marker;
        }
    };

    const resetBoard = () => { 
        for (let i = 0; i < board.length; i++) {
            board[i] = 0;
        }
    };

    return {getBoard, addMark, resetBoard};
    
};

// 2. PLAYER FACTORY
// ==========================================

function createPlayer(name, marker) {
    return {name, marker};
};

const playerOne = createPlayer("X", "X");
const playerTwo = createPlayer("O", "O");

// 3. GAME CONTROLLER MODULE
// ==========================================

function flowGame() {

    const players = [
        {playeOne},
        {playerTwo},
    ];

    let currentPlayer = players[0];
    const emptyCells = board.filter(item => item === 0).length;
    const switchPlayer = () => {
        if (emtpyCells % 2 === 1) {
        currentPlayer = players[0];
        } else {
        currentPlayer = players[1];
        };
    };

    const getCurrentPlayer = () => currentPlayer;

    const playRound = () => {
        board.addMark(index, getCurrentPlayer.marker);
    };
};

/* board
    [0][1][2]  
    [3][4][5]
    [6][7][8]
*/

function checkWin(currentPlayer) {
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

    for (pattern of winningPatterns) {
        if (pattern === currentPlayer.marker + currentPlayer.marker + currentPlayer.marker) {
            return true;
        } else {
            return false;
        };
    };
};