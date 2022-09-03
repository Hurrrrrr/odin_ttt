"use strict";

const gameboard = (() => {
    let myGrid = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const myBoxes = document.querySelectorAll("div.board-box");
    return {myGrid, myBoxes};
})();

const renderBoard =((grid, boxes) => {
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
}

renderBoard.populateBoard(gameboard.myGrid, gameboard.myBoxes);