// battle.js

let playerHealth = 100;
let opponentHealth = 100;
let playerTurn = true;  // Starts with the player's turn
let gameOver = false;

// Function to update the health bars
function updateHealth() {
  document.getElementById('player-health').style.width = `${playerHealth}%`;
  document.getElementById('opponent-health').style.width = `${opponentHealth}%`;
}

// Function to handle the player's action
function takeAction(action) {
  if (gameOver) return;

  if (playerTurn) {
    if (action === 'fight') {
      opponentHealth -= 10;
      alert('You attacked the opponent!');
    } else if (action === 'act') {
      alert('You try to act...');
    } else if (action === 'mercy') {
      alert('You chose mercy...');
    }

    if (opponentHealth <= 0) {
      alert('You defeated the boss!');
      gameOver = true;
    } else {
      switchTurn();  // Switch to the opponent's turn
    }
  } else {
    alert('It\'s not your turn!');
  }
}

// Function to switch turns
function switchTurn() {
  playerTurn = !playerTurn;
  document.getElementById('turn-indicator').textContent = playerTurn ? "It's your turn!" : "Opponent's turn! Bullet Hell!";
  
  if (!playerTurn) {
    // Start the opponent's turn (Bullet Hell phase)
    setTimeout(opponentTurn, 1000);
  }
}

// Opponent's turn: Bullet Hell Phase (simple simulation)
function opponentTurn() {
  // In Bullet Hell phase, the opponent shoots bullets at the player
  alert('The opponent shoots bullets! You must dodge!');
  playerHealth -= 10; // Damage from bullets (can be improved later)

  if (playerHealth <= 0) {
    alert('You have been defeated!');
    gameOver = true;
  }

  // Switch back to the player's turn after opponent's action
  switchTurn();
}

// Initialize the game with health bars
updateHealth();
