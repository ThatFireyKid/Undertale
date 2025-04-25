// Initialize player and opponent health
let playerHealth = 100;
let opponentHealth = 100;
let playerTurn = true;  // Starts with the player's turn
let gameOver = false;

// Function to move the player heart using keypresses (WASD)
function movePlayer(event) {
  const player = document.getElementById("player");
  let left = parseInt(player.style.left || "50%");
  let top = parseInt(player.style.top || "50%");

  // Moving the player based on keypress
  switch (event.key) {
    case "w": // Move up
      top -= 5;
      break;
    case "a": // Move left
      left -= 5;
      break;
    case "s": // Move down
      top += 5;
      break;
    case "d": // Move right
      left += 5;
      break;
  }

  // Update player position
  player.style.left = `${left}%`;
  player.style.top = `${top}%`;
}

// Function to switch turns (for future bullet hell)
function switchTurn() {
  if (playerTurn) {
    playerTurn = false;
    // Logic for opponent turn (bullet hell or other actions)
    // Once opponent turn is over, switch back to player turn
    setTimeout(() => {
      playerTurn = true;
    }, 1000);  // You can adjust this delay as needed
  }
}

// Update health values (for future damage handling)
function updateHealth() {
  document.getElementById("playerHealthValue").textContent = playerHealth;
  document.getElementById("opponentHealthValue").textContent = opponentHealth;
}

// Add event listener for movement
document.addEventListener("keydown", movePlayer);

// Placeholder to simulate an opponent attack (you can add your own logic later)
function opponentAttack() {
  if (!playerTurn && !gameOver) {
    // Simulate opponent attack (e.g., reduce player health)
    playerHealth -= 10;
    updateHealth();

    // Check if game is over
    if (playerHealth <= 0) {
      gameOver = true;
      alert("Game Over! You lost.");
    }
  }
}

// Simulate a battle turn cycle
setInterval(() => {
  opponentAttack();
  switchTurn();
}, 2000); // Every 2 seconds, opponent takes a turn (this can be adjusted)
