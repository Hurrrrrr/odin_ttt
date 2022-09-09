"use strict";

const gameboard = (() => {
    // the gameboard, layout:
    // 1 | 2 | 3
    // 4 | 5 | 6
    // 7 | 8 | 9
    let myBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9];       

    const myBoxes = document.querySelectorAll("div.board-box");

    const initBoxes = () => {
        myBoxes.forEach(box => {
            box.addEventListener("click", () => boxClick(box, myBoard))
        })
    }

    const boxClick = (box, board) => {
        
        // if play is illegal, do nothing
        if (!checkPlay(box, board)) {
            return 0;
        }

        markPlay(box);

        if (checkWin(board)) {
            playGame.endGame();
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
            myBoard[parseInt(box.dataset.index) - 1] = player1.getPiece();
            console.log("p1")
        }

        if (turn === 2) {
            myBoard[parseInt(box.dataset.index) - 1] = player2.getPiece();
            console.log("p2");
        }

        box.innerText = myBoard[parseInt(box.dataset.index) - 1];
    }

    // Careful if the board array is changed to all 0/null, this won't work
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

    let whoseTurn = 1;     // 1 = p1's turn, 2 = p2's turn
    let turncount = 1;

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

    const checkDraw = () => {
        if (turncount >= 9) {
            tieGame();
        } else {
            return 0;
        }
    }

    const endGame = () => {
        if (whoseTurn === 1) {
            console.log("player 1 wins!");
        } else if (whoseTurn = 2) {
            console.log("player 2 wins!");
        } else {
            console.log("endgame error");
        }
    }

    const tieGame = () => {
        console.log("cats game");
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

    return {initGame, endGame, tieGame, checkDraw, nextTurn, getTurn};
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

let player1 = playerFactory("Alice", "x");
let player2 = playerFactory("Bob", "o");

gameboard.initBoxes();