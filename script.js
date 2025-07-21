document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board');
  const cells = document.querySelectorAll('[data-cell]');
  const status = document.getElementById('status');
  const restartButton = document.getElementById('restart');
  
  const X_CLASS = 'x';
  const O_CLASS = 'o';
  const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];
  
  let xTurn;
  
  startGame();
  
  restartButton.addEventListener('click', startGame);
  
  function startGame() {
    xTurn = true;
    cells.forEach(cell => {
      cell.classList.remove(X_CLASS);
      cell.classList.remove(O_CLASS);
      cell.classList.remove('winning-cell');
      cell.removeEventListener('click', handleClick);
      cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    status.textContent = `${xTurn ? "X" : "O"}'s turn`;
  }
  
  function handleClick(e) {
    const cell = e.target;
    const currentClass = xTurn ? X_CLASS : O_CLASS;
    
    placeMark(cell, currentClass);
    
    if (checkWin(currentClass)) {
      endGame(false);
    } else if (isDraw()) {
      endGame(true);
    } else {
      swapTurns();
      setBoardHoverClass();
    }
  }
  
  function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
  }
  
  function swapTurns() {
    xTurn = !xTurn;
    status.textContent = `${xTurn ? "X" : "O"}'s turn`;
  }
  
  function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    board.classList.add(xTurn ? X_CLASS : O_CLASS);
  }
  
  function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
      return combination.every(index => {
        return cells[index].classList.contains(currentClass);
      });
    });
  }
  
  function endGame(draw) {
    if (draw) {
      status.textContent = 'Draw!';
    } else {
      status.textContent = `${xTurn ? "X" : "O"} Wins!`;
      highlightWinningCells(xTurn ? X_CLASS : O_CLASS);
    }
  }
  
  function highlightWinningCells(currentClass) {
    WINNING_COMBINATIONS.forEach(combination => {
      if (combination.every(index => cells[index].classList.contains(currentClass))) {
        combination.forEach(index => {
          cells[index].classList.add('winning-cell');
        });
      }
    });
  }
  
  function isDraw() {
    return [...cells].every(cell => {
      return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
  }
});
