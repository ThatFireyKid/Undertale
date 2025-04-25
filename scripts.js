let isPlayerTurn = true;
const soul = document.getElementById("soul");
const menu = document.getElementById("menu");
const battleBox = document.getElementById("battle-box");

document.addEventListener("keydown", (e) => {
  if (isPlayerTurn) {
    // Handle menu selection (future: A/D/Z/X controls)
    if (e.key === "Enter") {
      startEnemyTurn();
    }
  } else {
    // Soul movement in bullet hell
    const step = 10;
    const top = parseInt(soul.style.top) || 65;
    const left = parseInt(soul.style.left) || 140;

    if (e.key === "w") soul.style.top = `${top - step}px`;
    if (e.key === "s") soul.style.top = `${top + step}px`;
    if (e.key === "a") soul.style.left = `${left - step}px`;
    if (e.key === "d") soul.style.left = `${left + step}px`;
  }
});

function startEnemyTurn() {
  isPlayerTurn = false;
  menu.style.display = "none";
  battleBox.style.display = "block";

  // Bullet hell lasts 5 seconds
  setTimeout(() => {
    isPlayerTurn = true;
    menu.style.display = "flex";
    battleBox.style.display = "none";
  }, 5000);
}
