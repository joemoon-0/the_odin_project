// Tic Tac Toe
//
// Board Legend: 0 = Nothing, 1 = X, 2 = O

const board = (() => {
    // Create Game Board
    const boardRows      = 3;
    const boardColumns   = 3;
    let board = new Array(boardRows).fill(0).map(() => new Array(boardColumns).fill(0));

    const addX = (row, col) => { board[row][col] = "1"; checkForWinner(); };
    const addO = (row, col) => { board[row][col] = "2"; checkForWinner(); };

    const checkForWinner = () => {
        let winner = false;
        
        // Check rows
        for (row in board) {
            let marked = board[row][0];     // either X or O
            if (marked) {
                for (col in board[row]) {
                    if (board[row][col] == marked) {
                        winner = true;
                    }                    
                    else {
                        winner = false;
                        break;
                    }
                }
            }
        }

        if (!winner) {
            // Check columns
            for (let col = 0; col < boardColumns; col++) {
                let marked = board[0][col];     // either X or O
                if (marked) {
                    for (let row = 0; row < boardRows; row++) {
                        if (board[row][col] == marked) {
                            winner = true;
                        }                    
                        else {
                            winner = false;
                            break;
                        }
                    }
                }
            }
        }
        
        if (!winner) {
            // Check diagonals: Top left to bottom right
            let marked = board[0][0];       // either X or O
            if (marked) {
                for (let grid = 1; grid < boardColumns; grid++) {
                    if (board[grid][grid] == marked) {
                        winner = true;
                    }
                    else {
                        winner = false;
                        break;
                    }
                }
            }
        }

        if (!winner) {
            // Check diagonals: Top right to bottom left
            marked = board[0][2];       // either X or O
            if (marked) {
                for (let row = 0; row < boardRows; row++) {
                    if (board[row][boardColumns - 1 - row] == marked) {
                        winner = true;
                    }
                    else {
                        winner = false;
                        break;
                    }
                }
            }
        }

        if (winner) {
            console.log(winner);
        }
    };

    return { addX, addO, board /*test*/};
})();


const test = (() => {
    console.log("---TEST---");
    board.addO(0,2);
    board.addO(1,2);
    board.addO(2,0);

})();
