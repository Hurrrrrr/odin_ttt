"use strict";

const gameboard = (() => {
    let myGrid = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const myBoxes = document.querySelectorAll("div.board-box");

    const initBoxes = () => {
        myBoxes.forEach(box => {
            box.addEventListener("click", () => boxClick(box))
        })
    }

    const boxClick = (box) => {
        box.innerText = bob.getPiece();
        if (typeof parseInt(box.dataset) === "number") {      // check with regex??
            console.log("legal");
        } else {                                                // illegal move
            console.log("illegal");
        }
    }

    const checkPlay = () => {
        // checkplay
        // markplay
    }

    const markPlay = (player, boxes) => {
        if (player.piece === "x") {
            boxes.indexOf(box) = "x";
        }
    }

    return {myGrid, myBoxes, initBoxes};
})();

const playGame = ((board, player1, player2) => {

    const initGame = (board, player1, player2) => {
        resetGame(board, player1, player2);
        setupBoard();
    }

    const resetGame = (board, player1, player2) => {
        grid = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        player1.name = "";
        player2.name = "";
        player1.piece = "";
        player2.piece = "";
    }

    const setupBoard = () => {

    }

    const playTurn = () => {

    }
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