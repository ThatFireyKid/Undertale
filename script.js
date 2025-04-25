const menuOptions = ["fight", "act", "item", "mercy"];
let selectedIndex = 0;
let isPlayerTurn = true;
let enemyTurn = false;

const soul = document.getElementById("soul");
let soulX = 150;
let soulY = 150;
const speed = 2; 
const keysHeld = new Set();

function updateSoulPosition() {
  if (!isPlayerTurn) {
    if (keysHeld.has("w") || keysHeld.has("ArrowUp")) soulY -= speed;
    if (keysHeld.has("s") || keysHeld.has("ArrowDown")) soulY += speed;
    if (keysHeld.has("a") || keysHeld.has("ArrowLeft")) soulX -= speed;
    if (keysHeld.has("d") || keysHeld.has("ArrowRight")) soulX += speed;

    // Clamp within battle box bounds (adjust as needed)
    soulX = Math.max(0, Math.min(290, soulX));
    soulY = Math.max(0, Math.min(190, soulY));

    soul.style.left = soulX + "px";
    soul.style.top = soulY + "px";
  }

  requestAnimationFrame(updateSoulPosition);
}

// Start the loop
requestAnimationFrame(updateSoulPosition);

// Track key presses
document.addEventListener("keydown", (e) => {
  keysHeld.add(e.key.toLowerCase());
});

document.addEventListener("keyup", (e) => {
  keysHeld.delete(e.key.toLowerCase());
});

function updateSelection() {
  menuOptions.forEach((id, index) => {
    const btn = document.getElementById(id);
    if (index === selectedIndex) {
      btn.classList.add("selected");
    } else {
      btn.classList.remove("selected");
    }
  });
}

function startEnemyTurn() {
  isPlayerTurn = false;
  enemyTurn = true;
  document.getElementById("ui").style.display = "none";
  document.getElementById("battle-box").style.display = "block";

  updateSoulPosition();

  setTimeout(() => {
    isPlayerTurn = true;
    enemyTurn = false;
    document.getElementById("ui").style.display = "block";
    document.getElementById("battle-box").style.display = "none";
    updateSelection();
  }, 5000); // 5 seconds of bullet hell
}

document.addEventListener("keydown", (e) => {
  // PLAYER TURN CONTROLS
  if (isPlayerTurn) {
    if (e.key === "a" || e.key === "ArrowLeft") {
      selectedIndex = (selectedIndex - 1 + menuOptions.length) % menuOptions.length;
      updateSelection();
    }

    if (e.key === "d" || e.key === "ArrowRight") {
      selectedIndex = (selectedIndex + 1) % menuOptions.length;
      updateSelection();
    }

    if (e.key === "z" || e.key === "Enter") {
      const selectedOption = menuOptions[selectedIndex];
      console.log("You selected:", selectedOption);
      if (selectedOption === "fight") {
        startEnemyTurn();
      }
    }
  }

  // ENEMY TURN (SOUL MOVEMENT)
  if (enemyTurn) {
    if (e.key === "w") soulY -= moveSpeed;
    if (e.key === "s") soulY += moveSpeed;
    if (e.key === "a") soulX -= moveSpeed;
    if (e.key === "d") soulX += moveSpeed;
    updateSoulPosition();
  }
});

updateSelection();
