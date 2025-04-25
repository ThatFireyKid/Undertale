// Initialize player and opponent health
let playerHealth = 100;
let opponentHealth = 100;
let playerTurn = true;  // Starts with the player's turn
let gameOver = false;

// Function to move the player heart using keypresses (WASD)
function movePlayer(event) {
  // Only allow movement if it's the player's turn
  if (!playerTurn || gameOver) return;

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
  if (gameOver) return; // If the game is over, stop switching turns.

  playerTurn = !playerTurn;  // Toggle turns
  if (playerTurn) {
    // Reset some things for the player's turn
    console.log("Player's turn! Move and attack.");
  } else {
    // Opponent's turn logic (attacks, bullet hell, etc.)
    console.log("Opponent's turn! Enemy attacks!");
    opponentAttack();
  }
}

// Function to simulate opponent attack (for damage handling)
function opponentAttack() {
  if (!playerTurn && !gameOver) {
    // Simulate opponent attack (e.g., reduce player health)
    let damage = Math.floor(Math.random() * 10) + 5; // Random damage
    playerHealth -= damage;
    updateHealth();

    // Check if game is over
    if (playerHealth <= 0) {
      gameOver = true;
      alert("Game Over! You lost.");
    } else {
      // If player is still alive, switch to player's turn after a brief delay
      setTimeout(switchTurn, 1000);  // Delay before switching to the player's turn
    }
  }
}

// Update health values on screen
function updateHealth() {
  document.getElementById("playerHealthValue").textContent = playerHealth;
  document.getElementById("opponentHealthValue").textContent = opponentHealth;
}

// Add event listener for movement (WASD keys)
document.addEventListener("keydown", movePlayer);

// Simulate a battle turn cycle with a delay
setInterval(() => {
  if (!gameOver) {
    switchTurn();
  }
}, 3000); // Change turns every 3 seconds
