"use strict";

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  const symbols = ["x", "o"];

  return {
    board,
    symbols
  }
})();

const gameController = (() => {
  const winStates = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  let gameOver = false;
  let playerTime = 0;
  let moves = 0;

  const handleMove = (position) => {
    if(gameOver) {
      return;
    }
    if(gameBoard.board[position] === "") {
      gameBoard.board[position] = gameBoard.symbols[playerTime];
      displayController.updatePlayerDisplay();
      playerTime = playerTime == 0 ? 1 : 0;
      moves++;
    }
  }

  const isGameOver = () => {
    if(!gameOver) {
      for(let i = 0; i < winStates.length; i++) {
        let seq = winStates[i];
        let pos1 = seq[0];
        let pos2 = seq[1];
        let pos3 = seq[2];
        if(
          gameBoard.board[pos1] == gameBoard.board[pos2] &&
          gameBoard.board[pos1] == gameBoard.board[pos3] &&
          gameBoard.board[pos1] != ""
          ) {
          gameOver = true;
          playerTime = playerTime == 0 ? 1 : 0;
          displayController.updateWinnerDisplay(playerTime);
        }
      }
      if(moves === 9) {
        gameOver = true;
        displayController.updateWinnerDisplay();
      }
      return gameOver;
    }
  }

  return { 
    handleMove,
    isGameOver,
  };
})();

const displayController = (() => {
  const squares = document.querySelectorAll(".square");
  const players = document.querySelector(".players");
  const [player1, player2] = players.children;

  const handleClick = (event) => {
    if(!gameController.isGameOver()) {
      let square = event.target;
      let position = square.id;
      gameController.handleMove(position);
      updateSquare(square, position);
      gameController.isGameOver();
    }
  }

  const updatePlayerDisplay = () => {
    player1.classList.toggle("active");
    player2.classList.toggle("active");
  };

  const updateWinnerDisplay = (winner) => {
    if(winner !== undefined) {
      players.innerHTML = `<div class="${gameBoard.symbols[winner]} active"> wins!<div>`;
    }
    else {
      players.innerHTML = `<div class="active">It's a tie!<div>`;
    }
  }

  const updateSquare = (square, position) => {
    let symbol = gameBoard.board[position];
    square.innerHTML = `<div class="${symbol}"></div>`;
  }

  squares.forEach(square => square.addEventListener("click", handleClick));

  return {
    updatePlayerDisplay,
    updateWinnerDisplay,
  }
})();