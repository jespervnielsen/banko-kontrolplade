const board = document.getElementById('board');
const drawnNumbersDiv = document.getElementById('drawnNumbers');
const newGameBtn = document.getElementById('newGameBtn');

const drawnNumbers = [];

function createBoard() {
  board.innerHTML = '';

  for (let i = 1; i <= 90; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.textContent = i;

    cell.addEventListener('click', () => toggleCell(cell, i));
    board.appendChild(cell);
  }
}

function toggleCell(cell, number) {
  cell.classList.toggle('marked');

  // If marked, add to list
  if (cell.classList.contains('marked')) {
    drawnNumbers.push(number);
  } else {
    // Remove from list if unmarked
    const idx = drawnNumbers.indexOf(number);
    if (idx !== -1) drawnNumbers.splice(idx, 1);
  }

  updateDrawnNumbers();
}

function updateDrawnNumbers() {
  drawnNumbersDiv.innerHTML = drawnNumbers.join(', ');
}

newGameBtn.addEventListener('click', () => {
  if (confirm('Er du sikker på du vil starte et nyt spil?')) {
    drawnNumbers.length = 0;
    updateDrawnNumbers();
    createBoard();
  }
});

createBoard();
