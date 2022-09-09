"use strict";

const gameboard = (() => {
    let myBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9];       // the gameboard. 0 index this??

    const myBoxes = document.querySelectorAll("div.board-box");

    const initBoxes = () => {
        myBoxes.forEach(box => {
            box.addEventListener("click", () => boxClick(box, myBoard))
        })
    }

    const boxClick = (box, board) => {
        checkPlay(box, board);
        // if checkPlay true:
        markPlay(box, board);
        if (checkWin(board)) {
            playGame.endGame();
        }
        // playGame.checkDraw();
            // check draw
            // inc turn counter (if player 1's turn)
            // change whose turn it is
    }

    const checkPlay = (box, board) => {
        if ((board[parseInt(box.dataset.index)] > 0) && (board[parseInt(box.dataset.index)] < 10)) {
            console.log("legal");
        } else {
            console.log("illegal");
        }
    }

    const markPlay = (box) => {
        myBoard[parseInt(box.dataset.index)] = bob.getPiece();     // bob is test value, replace with player in future
        box.innerText = myBoard[parseInt(box.dataset.index)];
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

    return {myBoard, myBoxes, initBoxes, boxClick};
})();

const playGame = ((board, player1, player2, turn) => {

    let whoseTurn = 0;     // 1 = p1's turn, 2 = p2's turn
    let turncount = 0;

    const initGame = (board, player1, player2, turn) => {
        gameboard.initBoxes();
        resetGame(board, player1, player2, turn);
    }

    const resetGame = (board, player1, player2, turn) => {
        board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        player1.name = "";
        player2.name = "";
        player1.piece = "";
        player2.piece = "";
        turn = 1;
    }

    // const checkTurn = (turn) => {
    //     if (turn = 1) {
    //         return true;
    //     } else if (turn = 2) {
    //         return false;
    //     } else {
    //         alert("Turnstate error");
    //         return false;
    //     }
    // }

    const checkDraw = (turn) => {
        if (turn >= 9) {
            return true;
        } else {
            return false;
        }
    }

    const playGame = () => {
        // check win

        // check draw
        // inc turn counter (if player 1's turn)
        // change whose turn it is
    }

    const endGame = () => {
        console.log("win!");
    }

    // playTurn

    return {initGame, endGame};
})();

const renderBoard = ((board, boxes) => {
    const populateBoard = (board, boxes) => {
        for (let i = 0; i < board.length; i++) {
            boxes[i].innerText = board[i];
        }
    }
    return {populateBoard};
})();

const playerFactory = (name, piece) => {
    const getName = () => name;
    const getPiece = () => piece;
    return {getName, getPiece};
}

renderBoard.populateBoard(gameboard.myBoard, gameboard.myBoxes);

let alice = playerFactory("Alice", "x");
let bob = playerFactory("Bob", "o");

gameboard.initBoxes();