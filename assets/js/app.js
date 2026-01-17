const board = document.getElementById('board');
const drawnNumbersDiv = document.getElementById('drawnNumbers');
const lastDrawnDiv = document.getElementById('lastDrawn');
const newGameBtn = document.getElementById('newGameBtn');
const drawNumberBtn = document.getElementById('drawNumberBtn');
const settingsPanel = document.getElementById('settingsPanel');

const drawnNumbers = [];

// Initialiser settings og tema ved opstart
function initApp() {
  const settings = getSettings();
  
  // Anvend gemt tema
  applyTheme(settings.theme);
  
  // Sæt tema-selector til gemt værdi
  const themeSelect = document.getElementById('themeSelect');
  if (themeSelect) {
    themeSelect.value = settings.theme;
  }
  
  // Initialiser settings panel
  initSettingsPanel(settingsPanel);
  
  // Opret board
  createBoard();
}

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
  lastDrawnDiv.textContent = drawnNumbers.length > 0 
    ? drawnNumbers[drawnNumbers.length - 1] 
    : '-';
}

newGameBtn.addEventListener('click', () => {
  if (confirm('Er du sikker på du vil starte et nyt spil?')) {
    drawnNumbers.length = 0;
    updateDrawnNumbers();
    createBoard();
  }
});

drawNumberBtn.addEventListener('click', () => {
  // Find alle numre der ikke er trukket endnu
  const availableNumbers = [];
  for (let i = 1; i <= 90; i++) {
    if (!drawnNumbers.includes(i)) {
      availableNumbers.push(i);
    }
  }
  
  // Hvis der er numre tilbage, træk et tilfældigt
  if (availableNumbers.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const num = availableNumbers[randomIndex];
    const cells = board.querySelectorAll('.cell');
    toggleCell(cells[num - 1], num);
  }
});

// Start app
initApp();
