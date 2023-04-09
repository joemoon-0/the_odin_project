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
    const boardSize = 3;
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

    // TODO: Add check - can only add if board[row][col] == Mark.None
    const addX = (row, col) => { board[row][col] = Mark.X; render(); checkForWinner(); };
    const addO = (row, col) => { board[row][col] = Mark.O; render(); checkForWinner(); };

    const checkForWinner = () => {
        let winner = EndGame.NoWinner;
        
        // Check rows
        for (row in board) {
            let marked = board[row][0];     // either X or O
            if (marked) {
                for (col in board[row]) {
                    if (board[row][col] == marked) {
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
            // Check columns
            for (let col = 0; col < boardSize; col++) {
                let marked = board[0][col];     // either X or O
                if (marked) {
                    for (let row = 0; row < boardSize; row++) {
                        if (board[row][col] == marked) {
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
        
        if (winner == EndGame.NoWinner) {
            // Check diagonals: Top left to bottom right
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

        // TODO: Tied Game check


        if (winner != EndGame.NoWinner) {
            console.log("Winner: ", winner);
        }
    };

    return { render, addX, addO, board /*test*/};
})();


const test = (() => {
    console.log("---TEST---");
    board.addO(0,2);
    board.addO(1,2);
    board.addO(2,2);

})();

board.render();
