// NerfGun class to manage the game logic
class NerfGun {
  constructor() {
    this.chambers = Array(6).fill(false);
    this.pelletPosition = Math.floor(Math.random() * 6); // Random pellet position
    this.chambers[this.pelletPosition] = true;
    this.currentPosition = 0;
    this.shotsFired = 0;
  }

  shoot() {
    const result = this.chambers[this.currentPosition]
      ? "Pellet fired!"
      : "Click. No pellet.";
    this.currentPosition = (this.currentPosition + 1) % 6;
    this.shotsFired++;
    return result;
  }

  getRemainingBullets() {
    return 6 - this.shotsFired;
  }
}

// Main application logic
let gun = null;

// Function to initialize the game
function initializeGame() {
  const playerName = prompt("Enter your name:");
  document.getElementById("player-name").textContent = `Player: ${playerName}`;
  gun = new NerfGun();
  updateRemainingBullets();
}

// Function to update remaining bullets
function updateRemainingBullets() {
  document.getElementById(
    "remaining-bullets"
  ).textContent = `Remaining Bullets: ${gun.getRemainingBullets()}`;
}

// Function to handle shooting action
function handleShoot() {
  if (gun.shotsFired >= 6) {
    document.getElementById("game-over-message").textContent =
      "All rounds have been fired. Game over!";
    return;
  }
  const result = gun.shoot();
  document.getElementById("result").textContent = result;
  updateRemainingBullets();

  if (result === "Pellet fired!") {
    document.getElementById("game-over-message").textContent =
      "Game over! You shot the pellet!";
    document.getElementById("shoot-button").disabled = true; // Disable shoot button
  }
}

// Function to handle exit action
function handleExit() {
  window.close();
}

// Event listeners for buttons
document.getElementById("shoot-button").addEventListener("click", handleShoot);
document.getElementById("exit-button").addEventListener("click", handleExit);

// Initialize the game on page load
window.onload = initializeGame;
