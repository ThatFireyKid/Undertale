const menuOptions = ["fight", "act", "item", "mercy"];
let selectedIndex = 0;
let isPlayerTurn = true;

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
  document.getElementById("ui").style.display = "none";
  document.getElementById("battle-box").style.display = "block";

  // Enemy attack logic will go here eventually

  setTimeout(() => {
    isPlayerTurn = true;
    document.getElementById("ui").style.display = "block";
    document.getElementById("battle-box").style.display = "none";
    updateSelection();
  }, 5000); // 5 seconds of bullet hell
}

document.addEventListener("keydown", (e) => {
  if (!isPlayerTurn) return;

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
    // Later: handle ACT, ITEM, MERCY here too
  }
});

updateSelection();
