"use strict";

const gameboard = (() => {
    let myGrid = [1, 2, 3, 4, 5, 6, 7, 8, 9];       // the gameboard

    const myBoxes = document.querySelectorAll("div.board-box");

    const initBoxes = () => {
        myBoxes.forEach(box => {
            box.addEventListener("click", () => boxClick(box, myGrid))
        })
    }

    const boxClick = (box, grid) => {
        checkPlay(box, grid);
        // if checkPlay true:
        markPlay(box, grid);
        checkWin(board)
            // check win
            // check draw
            // inc turn counter (if player 1's turn)
            // change whose turn it is
    }

    const checkPlay = (box, grid) => {
        if (typeof grid[parseInt(box.dataset)] === "number") {
            console.log("legal");
        } else {
            console.log("illegal");
        }
    }

    const markPlay = (box, grid) => {
        grid[box.dataset] = bob.getPiece();     // bob is test value, replace with player in future
        box.innerText = grid[box.dataset];
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

    return {myGrid, myBoxes, initBoxes};
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

    const checkTurn = (turn) => {
        if (turn = 1) {
            return true;
        } else if (turn = 2) {
            return false;
        } else {
            alert("Turnstate error");
            return false;
        }
    }

    const playGame = () => {
        // check win

        // check draw
        // inc turn counter (if player 1's turn)
        // change whose turn it is
    }



    // playTurn

    return {initGame};
})();

const renderBoard = ((grid, boxes) => {
    const populateBoard = (grid, boxes) => {
        for (let i = 0; i < grid.length; i++) {
            boxes[i].innerText = grid[i];
        }
    }
    return {populateBoard};
})();

const playerFactory = (name, piece) => {
    const getName = () => name;
    const getPiece = () => piece;
    return {getName, getPiece};
}

renderBoard.populateBoard(gameboard.myGrid, gameboard.myBoxes);

let alice = playerFactory("Alice", "x");
let bob = playerFactory("Bob", "o");

gameboard.initBoxes();