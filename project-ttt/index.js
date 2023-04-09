// Tic Tac Toe

const Mark = {
    None:   0,
    X:      1,
    O:      2
};

const EndGame = {
    NoWinner: 0,
    X_Winner: 1,
    O_Winner: 2,
    TiedGame: 3
};

// Board Legend: 0 = Nothing, 1 = X, 2 = O
const board = (() => {
    // Create Game Board
    const boardSize = 3;        // This also dictates how many consecutive symbols are required for win condition
    let freeCells = boardSize * boardSize;
    let board = new Array(boardSize).fill(Mark.None).map(() => new Array(boardSize).fill(Mark.None));

    const boardSymbol = (row, col) => {
        if (board[row][col] == Mark.None)   { return "-"; }
        if (board[row][col] == Mark.X)      { return "X"; }
        if (board[row][col] == Mark.O)      { return "O"; }
    };

    const render = () => {
        const board = document.getElementById("board");
        boardHTML = "";
        for (let row = 0; row < boardSize; row++) {
            boardHTML += "<div class='grid-row'>";
            for (let col = 0; col < boardSize; col++) {
                boardHTML += `<div class='grid-cell data-col=${col} data-row=${row}'>
                    ${boardSymbol(row, col)}
                    </div>`;
            }
            boardHTML += "</div>";
        }
        board.innerHTML = boardHTML;
    };

    const addableCell = (row, col) => { return board[row][col] === Mark.None; }
    const addX = (row, col) => {
        if (!addableCell(row, col)) { return; }
        board[row][col] = Mark.X;
        freeCells--;
        render();
        checkForWinner();
    };

    const addO = (row, col) => {
        if (!addableCell(row, col)) { return; }
        board[row][col] = Mark.O;
        freeCells--;
        render();
        checkForWinner();
    };

    const checkForWinner = () => {
        let winner          = EndGame.NoWinner;
        let symbolCounter   = 0;

        // Tied Game check
        if (!freeCells) {
            winner = EndGame.TiedGame;
        }
        else {
            // Check rows
            for (row in board) {
                let marked = board[row][0];     // either X or O
                if (marked) {
                    for (col in board[row]) {
                        if (board[row][col] == marked) {
                            symbolCounter++;
                            if (symbolCounter == boardSize) {
                                winner = (marked == Mark.X) ? EndGame.X_Winner : EndGame.O_Winner;
                                break;
                            }
                        }                    
                        else {
                            winner = EndGame.NoWinner;
                            break;
                        }
                    }
                }
                if (winner != EndGame.NoWinner) { break; }
            }

            if (winner == EndGame.NoWinner) {
                // Check columns
                for (let col = 0; col < boardSize; col++) {
                    symbolCounter = 0;
                    let marked = board[0][col];     // either X or O
                    if (marked) {
                        for (let row = 0; row < boardSize; row++) {
                            if (board[row][col] == marked) {
                                symbolCounter++;
                                if (symbolCounter == boardSize) {
                                    winner = (marked == Mark.X) ? EndGame.X_Winner : EndGame.O_Winner;
                                    break;
                                }
                            }
                            else {
                                winner = EndGame.NoWinner;
                                break;
                            }
                        }
                    }
                    if (winner != EndGame.NoWinner) { break; }
                }
            }

            if (winner == EndGame.NoWinner) {
                // Check diagonals: Top left to bottom right
                symbolCounter = 0;
                let marked = board[0][0];       // either X or O
                if (marked) {
                    for (let grid = 1; grid < boardSize; grid++) {
                        if (board[grid][grid] == marked) {
                            winner = (marked == Mark.X) ? EndGame.X_Winner : EndGame.O_Winner;
                        }
                        else {
                            winner = EndGame.NoWinner;
                            break;
                        }
                    }
                }
            }

            if (winner == EndGame.NoWinner) {
                // Check diagonals: Top right to bottom left
                symbolCounter = 0;
                let marked = board[0][2];       // either X or O
                if (marked) {
                    for (let row = 0; row < boardSize; row++) {
                        if (board[row][boardSize - 1 - row] == marked) {
                            winner = (marked == Mark.X) ? EndGame.X_Winner : EndGame.O_Winner;
                        }
                        else {
                            winner = EndGame.NoWinner;
                            break;
                        }
                    }
                }
            }
        }

        if (winner != EndGame.NoWinner) {
            console.log("Winner: ", winner);
        }
    };

    return { render, addX, addO, board /*test*/};
})();


const test = (() => {
    console.log("---TEST---");
    // board.addO(0,0);
    board.addX(0,0);
    // board.addO(0,1);
    board.addX(0,1);
    board.addO(0,2);
    // board.addX(0,2);

    // board.addO(1,0);
    // board.addX(1,0);
    board.addO(1,1);
    // board.addX(1,1);
    board.addO(1,2);
    // board.addX(1,2);

    board.addO(2,0);
    // board.addX(2,0);
    // board.addO(2,1);
    // board.addX(2,1);
    // board.addO(2,2);
    board.addX(2,2);
})();

board.render();
