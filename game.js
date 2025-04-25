let player = document.getElementById('player');
let bullet = document.createElement('div');
bullet.id = 'bullet';

let gameState = {
  playerPos: { x: 1, y: 1 },
  enemyTurn: false,
  playerTurn: true,
  turnMessage: "Player's Turn",
};

let bulletPosition = { x: 1, y: 0 }; // Initial bullet position

// Setup grid size (3x3)
const gridSize = 3;
const cellSize = 100;

// Function to update player position
function updatePlayerPosition() {
  player.style.left = gameState.playerPos.x * cellSize + 'px';
  player.style.top = gameState.playerPos.y * cellSize + 'px';
}

// Move player with WASD keys
document.addEventListener('keydown', (e) => {
  if (gameState.playerTurn) {
    if (e.key === 'w' && gameState.playerPos.y > 0) gameState.playerPos.y--;
    if (e.key === 'a' && gameState.playerPos.x > 0) gameState.playerPos.x--;
    if (e.key === 's' && gameState.playerPos.y < gridSize - 1) gameState.playerPos.y++;
    if (e.key === 'd' && gameState.playerPos.x < gridSize - 1) gameState.playerPos.x++;

    updatePlayerPosition();
  }
});

// Handle action choices (Fight, Act, Item, Mercy)
function chooseAction(action) {
  if (!gameState.playerTurn) return; // Disable action during enemy's turn
  gameState.playerTurn = false;
  gameState.enemyTurn = true;
  document.getElementById('turn-indicator').textContent = "Enemy's Turn";

  // Simulate enemy's turn (bullet hell)
  simulateBulletHell();

  // After enemy turn, return to player's turn
  setTimeout(() => {
    gameState.playerTurn = true;
    gameState.enemyTurn = false;
    document.getElementById('turn-indicator').textContent = "Player's Turn";
    resetBulletPosition();
  }, 2000); // Wait 2 seconds before switching turns
}

// Simulate enemy's bullet hell attack
function simulateBulletHell() {
  bullet.style.left = bulletPosition.x * cellSize + 'px';
  bullet.style.top = bulletPosition.y * cellSize + 'px';
  document.getElementById('battle-screen').appendChild(bullet);

  // Move bullet down the grid
  let interval = setInterval(() => {
    if (bulletPosition.y < gridSize - 1) {
      bulletPosition.y++;
      bullet.style.top = bulletPosition.y * cellSize + 'px';
    } else {
      clearInterval(interval);
    }
  }, 500);
}

// Reset bullet position after player's turn
function resetBulletPosition() {
  bulletPosition = { x: 1, y: 0 };
  document.getElementById('battle-screen').removeChild(bullet);
}

updatePlayerPosition(); // Initial player position
