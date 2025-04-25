let playerHealth = 100;
let opponentHealth = 100;
let playerTurn = true;  // Starts with the player's turn
let gameOver = false;
let playerAction = "";  // Holds player's chosen action

// Initialize the player and opponent positions (could be more complex for actual game)
let playerPosition = { x: 50, y: 50 };  // Player's starting position

// Update health and UI
function updateHealth() {
  document.getElementById("playerHealthValue").textContent = playerHealth;
  document.getElementById("opponentHealthValue").textContent = opponentHealth;
}

// Function to handle player's action (FIGHT, ACT, ITEM, MERCY)
function playerActionChoice(action) {
  if (gameOver) return;

  playerAction = action;
  console.log(`Player chooses to ${action}`);

  // Switch to opponent's turn after action
  startOpponentTurn();
}

// Start the opponent's turn (Bullet Hell)
function startOpponentTurn() {
  if (gameOver) return;

  console.log("Opponent's Turn: Bullet Hell");
  playerTurn = false;

  // Bullet Hell Attack
  opponentAttack();

  // Wait for Bullet Hell to end before going back to player's turn
  setTimeout(() => {
    if (!gameOver) {
      startPlayerTurn();
    }
  }, 3000);  // Bullet Hell lasts for 3 seconds, can be adjusted for difficulty
}

// Simulate the opponent attacking (bullet hell)
function opponentAttack() {
  let damage = Math.floor(Math.random() * 10) + 5;  // Random damage (could be bullets in the future)
  playerHealth -= damage;
  updateHealth();

  if (playerHealth <= 0) {
    gameOver = true;
    alert("Game Over! You lost.");
  }
}

// Start the player's turn (choose an action)
function startPlayerTurn() {
  if (gameOver) return;

  console.log("Player's Turn: Choose your action.");
  playerTurn = true;
  displayActionChoices();  // Show action options (FIGHT, ACT, ITEM, MERCY)
}

// Display action choices for the player
function displayActionChoices() {
  const actionOptions = ["FIGHT", "ACT", "ITEM", "MERCY"];
  // Display these choices in the UI, assuming we have buttons for each action
  actionOptions.forEach(action => {
    let actionButton = document.createElement("button");
    actionButton.textContent = action;
    actionButton.onclick = () => playerActionChoice(action);
    document.body.appendChild(actionButton);
  });
}

// Handle bullet hell and movement (player's movement during bullet hell phase)
function movePlayer(event) {
  if (!playerTurn || gameOver) return;

  let left = parseInt(playerPosition.x);
  let top = parseInt(playerPosition.y);

  switch (event.key) {
    case "w": top -= 5; break;  // Move up
    case "a": left -= 5; break;  // Move left
    case "s": top += 5; break;  // Move down
    case "d": left += 5; break;  // Move right
  }

  // Update player position on screen
  playerPosition.x = left;
  playerPosition.y = top;

  // Update player on screen (assuming a div for the player)
  const player = document.getElementById("player");
  player.style.left = `${left}%`;
  player.style.top = `${top}%`;
}

// Key event listener for movement
document.addEventListener("keydown", movePlayer);

// Start the game loop
function startGame() {
  startPlayerTurn();  // Player starts the game
}

startGame();
