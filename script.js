class NerfGun {
  constructor() {
    this.chambers = Array(6).fill(false);
    this.pelletPosition = Math.floor(Math.random() * 6); // Random pellet position
    this.chambers[this.pelletPosition] = true;
    this.currentPosition = 0; // Tracks current chamber position
    this.shotsFired = 0; // Tracks how many shots have been fired
  }

  shoot() {
    const result = this.chambers[this.currentPosition] ? "hit" : "miss";
    this.currentPosition = (this.currentPosition + 1) % 6; // Move to next chamber
    this.shotsFired++; // Increment shots fired count
    return result; // Return the result
  }

  getRemainingBullets() {
    return 6 - this.shotsFired; // Return the number of bullets remaining
  }
}

const players = [];

// Function to initialize the game
function initializeGame() {
  let numPlayers;
  do {
    numPlayers = parseInt(prompt("Enter the number of players (1-4):"), 10);
  } while (isNaN(numPlayers) || numPlayers < 1 || numPlayers > 4); // Ensure a valid number of players

  for (let i = 0; i < numPlayers; i++) {
    const playerName = prompt(`Enter the name of Player ${i + 1}:`);
    players.push({
      name: playerName,
      gun: new NerfGun(), // Create a new NerfGun instance for each player
      out: false, // Track if the player is "out" after a hit
    });
  }
  renderPlayers();
}

// Function to render players on the page
function renderPlayers() {
  const container = document.getElementById("players-container");
  container.innerHTML = ""; // Clear previous content

  players.forEach((player, index) => {
    const playerDiv = document.createElement("div");
    playerDiv.className = "player-bar";
    playerDiv.innerHTML = `
            <h2>${player.name}</h2>
            <p>Remaining Bullets: <span id="remaining-bullets-${index}">${player.gun.getRemainingBullets()}</span></p>
            <div id="bullet-boxes-${index}">${renderBulletBoxes(index)}</div>
            <button id="shoot-button-${index}" onclick="handleShoot(${index})">Shoot</button>
            <p id="result-${index}"></p>
        `;
    container.appendChild(playerDiv);
  });
}

// Function to render bullet boxes
function renderBulletBoxes(index) {
  let boxes = "";
  for (let i = 0; i < 6; i++) {
    boxes += `<div class="bullet-box" id="box-${index}-${i}"></div>`;
  }
  return boxes;
}

// Function to handle shooting action for each player
function handleShoot(playerIndex) {
  const player = players[playerIndex];

  // Check if the player is already "out"
  if (player.out || player.gun.shotsFired >= 6) {
    document.getElementById(`result-${playerIndex}`).textContent =
      "All rounds have been fired!";
    return;
  }

  const result = player.gun.shoot();
  document.getElementById(`result-${playerIndex}`).textContent =
    result === "hit" ? "Hit!" : "Miss!";

  // Update bullet box color
  document.getElementById(
    `box-${playerIndex}-${player.gun.shotsFired - 1}`
  ).className = `bullet-box ${result}`;
  document.getElementById(`remaining-bullets-${playerIndex}`).textContent =
    player.gun.getRemainingBullets();

  // If a hit occurs, disable further shooting for this player
  if (result === "hit") {
    player.out = true;
    const shootButton = document.getElementById(`shoot-button-${playerIndex}`);
    shootButton.disabled = true;
    shootButton.textContent = "Out";
  }
}

// Function to handle exit action
function handleExit() {
  window.close();
}

// Initialize the game on page load
window.onload = initializeGame;
