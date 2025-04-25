const menuOptions = ["fight", "act", "item", "mercy"];
let selectedIndex = 0;
let isPlayerTurn = true;
let enemyTurn = false;

const soul = document.getElementById("soul");
const battleBox = document.getElementById("battle-box");

let soulX = 150;
let soulY = 150;
const speed = 1.5;
const gravity = 0.2;
const jumpStrength = -4;
let velocityY = 0;
let onGround = false;

const keysHeld = new Set();
let soulMode = "gray"; // gray, blue, yellow
let bullets = [];

function updateSoulPosition() {
  if (!isPlayerTurn) {
    if (soulMode !== "blue") {
      if (keysHeld.has("w") || keysHeld.has("ArrowUp")) soulY -= speed;
      if (keysHeld.has("s") || keysHeld.has("ArrowDown")) soulY += speed;
      if (keysHeld.has("a") || keysHeld.has("ArrowLeft")) soulX -= speed;
      if (keysHeld.has("d") || keysHeld.has("ArrowRight")) soulX += speed;
    }

    if (soulMode === "blue") {
      velocityY += gravity;
      soulY += velocityY;

      if ((keysHeld.has("w") || keysHeld.has("ArrowUp")) && onGround) {
        velocityY = jumpStrength;
        onGround = false;
      }

      if (soulY >= 190) {
        soulY = 190;
        velocityY = 0;
        onGround = true;
      }
    }

    soulX = Math.max(0, Math.min(290, soulX));
    soulY = Math.max(0, Math.min(190, soulY));

    soul.style.left = soulX + "px";
    soul.style.top = soulY + "px";

    bullets.forEach((bullet, i) => {
      bullet.x += 5;
      bullet.element.style.left = bullet.x + "px";
      if (bullet.x > 300) {
        bullet.element.remove();
        bullets.splice(i, 1);
      }
    });
  }

  requestAnimationFrame(updateSoulPosition);
}
requestAnimationFrame(updateSoulPosition);

// Input Handling
document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  keysHeld.add(key);

  // Menu controls
  if (isPlayerTurn) {
    if (key === "a" || e.key === "ArrowLeft") {
      selectedIndex = (selectedIndex - 1 + menuOptions.length) % menuOptions.length;
      updateSelection();
    }
    if (key === "d" || e.key === "ArrowRight") {
      selectedIndex = (selectedIndex + 1) % menuOptions.length;
      updateSelection();
    }
    if (key === "z" || e.key === "Enter") {
      const selectedOption = menuOptions[selectedIndex];
      console.log("You selected:", selectedOption);
      if (selectedOption === "fight") {
        startEnemyTurn();
      }
    }
  }

  // Yellow soul shoots
  if (!isPlayerTurn && soulMode === "yellow" && (key === "z")) {
    shootBullet();
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

function shootBullet() {
  const bullet = document.createElement("div");
  bullet.classList.add("bullet");
  bullet.style.position = "absolute";
  bullet.style.width = "6px";
  bullet.style.height = "2px";
  bullet.style.backgroundColor = "yellow";
  bullet.style.left = soulX + 10 + "px";
  bullet.style.top = soulY + 8 + "px";
  battleBox.appendChild(bullet);

  bullets.push({ element: bullet, x: soulX + 10 });
}

function startEnemyTurn() {
  isPlayerTurn = false;
  enemyTurn = true;
  document.getElementById("ui").style.display = "none";
  battleBox.style.display = "block";

  // Set the mode here for testing (you can randomize or change it later)
  setSoulMode("gray"); // try "blue" or "yellow"

  soulX = 150;
  soulY = 150;
  velocityY = 0;
  onGround = false;

  setTimeout(() => {
    isPlayerTurn = true;
    enemyTurn = false;
    document.getElementById("ui").style.display = "block";
    battleBox.style.display = "none";

    bullets.forEach(b => b.element.remove());
    bullets = [];

    updateSelection();
  }, 5000);
}

updateSelection();
