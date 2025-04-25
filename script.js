const menuOptions = ["fight", "act", "item", "mercy"];
let selectedIndex = 0;
let isPlayerTurn = true;
let enemyTurn = false;

const soul = document.getElementById("soul");
let soulX = 150;
let soulY = 150;
let moveSpeed = 5;

function updateSoulPosition() {
  soul.style.left = soulX + "px";
  soul.style.top = soulY + "px";
}

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
