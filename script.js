/* board
    [0][1][2]  
    [3][4][5]
    [6][7][8]
*/

// 1. GAME BOARD MODULE
// ==========================================

const gameBoard = (() => {
    const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    const getBoard = () => board;

    const addMark = (cell, marker) => {
        if (board[cell] !== 0) {
            return;
        } else {
            board[cell] = marker;
        }
    };

    const resetBoard = () => { 
        for (let i = 0; i < board.length; i++) {
            board[i] = 0;
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
    const board = gameBoard.getBoard();
    console.log(board);

    const getCurrentPlayer = () => {
        const moves = board.filter(cell => cell === 0).length;
        return moves % 2 === 0 ? playerOne : playerTwo;
    };

    const checkWin = () => {
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
                if (pattern === getCurrentPlayer().marker + getCurrentPlayer().marker + getCurrentPlayer().marker) {
                    return true;
                }
            } return false;
        };

    const checkTie = () => {
        return board.every(cell => cell !== 0);
    };

    const playRound = () => {
        gameBoard.addMark(cell, getCurrentPlayer().marker);

        if (checkWin()) return `${getCurrentPlayer().name} wins!`

        if (checkTie()) return "it's a tie!";

        getCurrentPlayer();

        return `${getCurrentPlayer().name}'s turn`
    };

    return {getCurrentPlayer, playRound};

})();

game.playRound(0);
