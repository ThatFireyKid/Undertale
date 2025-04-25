const menuOptions = ["fight", "act", "item", "mercy"];
let selectedIndex = 0;
let isPlayerTurn = true;
let enemyTurn = false;

const soul = document.getElementById("soul");

let soulX = 150;
let soulY = 150;
const speed = 1.5;
const keysHeld = new Set();

let soulMode = "gray"; // Options: gray, blue, yellow

function updateSoulPosition() {
  if (!isPlayerTurn) {
    if (keysHeld.has("w") || keysHeld.has("ArrowUp")) soulY -= speed;
    if (keysHeld.has("s") || keysHeld.has("ArrowDown")) soulY += speed;
    if (keysHeld.has("a") || keysHeld.has("ArrowLeft")) soulX -= speed;
    if (keysHeld.has("d") || keysHeld.has("ArrowRight")) soulX += speed;

    soulX = Math.max(0, Math.min(290, soulX));
    soulY = Math.max(0, Math.min(190, soulY));

    soul.style.left = soulX + "px";
    soul.style.top = soulY + "px";
  }

  requestAnimationFrame(updateSoulPosition);
}
requestAnimationFrame(updateSoulPosition);

// Handle held keys
document.addEventListener("keydown", (e) => {
  keysHeld.add(e.key.toLowerCase());

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

function setSoulMode(mode) {
  soulMode = mode;
  switch (mode) {
    case "red";
      soul.src = "assets/RedSoul.png";
    case "blue":
      soul.src = "assets/BlueSoul.png";
      break;
    case "yellow":
      soul.src = "assets/YellowSoul.png";
      break;
    case "gray":
    default:
      soul.src = "assets/GraySoul.png";
      break;
  }
}

function startEnemyTurn() {
  setSoulMode("blue");   // or "yellow", or "gray"
  isPlayerTurn = false;
  enemyTurn = true;
  document.getElementById("ui").style.display = "none";
  document.getElementById("battle-box").style.display = "block";

  setSoulMode("gray"); // Change this to blue/yellow if you want different behavior

  setTimeout(() => {
    isPlayerTurn = true;
    enemyTurn = false;
    document.getElementById("ui").style.display = "block";
    document.getElementById("battle-box").style.display = "none";
    updateSelection();
  }, 5000);
}

updateSelection();
