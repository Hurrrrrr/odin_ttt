"use strict";

const playerFactory = (name, piece) => {
    return {name, piece};
}

const gameboard = (() => {
    // the gameboard, layout:
    // 1 | 2 | 3
    // 4 | 5 | 6
    // 7 | 8 | 9
    let myBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let player1 = playerFactory("", "x");
    let player2 = playerFactory("", "o");

    const myBoxes = document.querySelectorAll("div.board-box");
    const startButton = document.getElementById("start-button");

    const initButton = () => {
        startButton.addEventListener("click", () => startClick());
    }

    const startClick = () => {
        resetBoard();
        initPlayers();
    }

    const initPlayers = () => {
        let p1Name = prompt("enter p1 name");
        let p2Name = prompt("enter p2 name");
        player1.name = p1Name;
        player2.name = p2Name;
    }

    const initBoxes = () => {
        myBoxes.forEach(box => {
            box.addEventListener("click", () => boxClick(box, myBoard))
        })
    }

    const boxClick = (box, board) => {
        
        // if game is not in progress, do nothing
        if (!playGame.allowPlay()) {
            return 0;
        }

        // if play is illegal, do nothing
        if (!checkPlay(box, board)) {
            return 0;
        }

        markPlay(box);

        if (checkWin(board)) {
            let winner = playGame.endGame();

            if (winner === 1) {
                console.log(`${player1.name} wins!`);
            } else if (winner === 2) {
                console.log(`${player2.name} wins!`);
            }
        }

        playGame.checkDraw()

        playGame.nextTurn();
    }

    // Return true if the play is on an empty box
    // -1 in checkPlay and markPlay is to compensate for 1-indexed board
    const checkPlay = (box, board) => {
        // Avoid NaN typeof = "number" with this weird logic
        if ((board[parseInt(box.dataset.index) - 1] > 0) &&     
            (board[parseInt(box.dataset.index) - 1] < 10)) {
            return true;
        } else {
            return false;
        }
    }

    const markPlay = (box) => {
        let turn = playGame.getTurn();
        if (turn === 1) {
            myBoard[parseInt(box.dataset.index) - 1] = player1.piece;
            console.log("p1")
        }

        if (turn === 2) {
            myBoard[parseInt(box.dataset.index) - 1] = player2.piece;
            console.log("p2");
        }

        box.innerText = myBoard[parseInt(box.dataset.index) - 1];
    }

    const checkWin = (board) => {

        // Horizontal win conditions
        if (board[0] === board[1] && board[1] === board[2]) {
            return true;
        }
        if (board[3] === board[4] && board[4] === board[5]) {
            return true;
        }
        if (board[6] === board[7] && board[7] === board[8]) {
            return true;
        }

        // Vertical win conditions
        if (board[0] === board[3] && board[3] === board[6]) {
            return true;
        }
        if (board[1] === board[4] && board[4] === board[7]) {
            return true;
        }
        if (board[2] === board[5] && board[5] === board[8]) {
            return true;
        }

        // Diagonal win conditions
        if (board[0] === board[4] && board[4] === board[8]) {
            return true;
        }
        if (board[2] === board[4] && board[4] === board[6]) {
            return true;
        }

        // No win yet
        return false;
    }

    const resetBoard = () => {
        myBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        myBoxes.forEach((box) => {
            box.innerText = "";
        });

        playGame.resetGame();
    }

    return {initBoxes, initButton};
})();



const playGame = (() => {

    let whoseTurn = 1;     // 1 = p1's turn, 2 = p2's turn
    let turncount = 1;
    let canPlay = false;

    const resetGame = () => {
        whoseTurn = 1;
        turncount = 1;
        canPlay = true;
    }

    const allowPlay = () => {
        if (canPlay) {
            return true;
        } else {
            return false;
        }
    }

    const checkDraw = () => {
        if (turncount >= 9) {
            canPlay = false;
            tieGame();
        } else {
            return 0;
        }
    }

    const endGame = () => {
        canPlay = false;
        // P1 wins
        if (whoseTurn === 1) {
            return 1;
        // P2 wins
        } else if (whoseTurn = 2) {
            return 2;
        } else {
            console.log("endgame error");
            return -1;
        }
    }

    const tieGame = () => {
        canPlay = false;
        console.log("Cat's game, no one wins.");
    }

    const nextTurn = () => {
        if (whoseTurn === 1) {
            whoseTurn = 2;
            turncount++;
            return 0;
        }

        if (whoseTurn === 2) {
            whoseTurn = 1;
            turncount++;
            return 0;
        }

        console.log("nextturn error");
        return 1;
    }

    const getTurn = () => {
        if (whoseTurn === 1) {
            return 1;
        }

        if (whoseTurn === 2) {
            return 2;
        }

        return -1;
    }

    return {allowPlay, endGame, checkDraw, endGame, getTurn, resetGame, nextTurn};
})();

// Is this actually necessary?
// const renderBoard = ((board, boxes) => {
//     const populateBoard = (board, boxes) => {
//         for (let i = 0; i < board.length; i++) {
//             boxes[i].innerText = board[i];
//         }
//     }
//     return {populateBoard};
// })();

// renderBoard.populateBoard(gameboard.myBoard, gameboard.myBoxes);

// let player1 = playerFactory("", "x");
// let player2 = playerFactory("", "o");

gameboard.initBoxes();
gameboard.initButton();