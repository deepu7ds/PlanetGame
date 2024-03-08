let playerScore = document.getElementById('score');
let player = document.getElementById('player');
let earth = document.getElementById('earth');

// Function to update the score and health values
function updateValues() {
  // Update score and health values from window object
  playerScore.innerHTML = 'Score: ' + window.score;
  player.innerHTML = 'Player: ' + window.playerHealth;
  earth.innerHTML = 'Earth: ' + Math.floor(window.earthHealth);
}

function dist(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// Check if the distance between player coordinates and the center of the window is less than 1.5 times the window width
function checkPlayerHealth() {
  if (
    dist(
      window.playerCoordinates.x,
      window.playerCoordinates.y,
      window.innerWidth / 2,
      window.innerHeight / 2
    ) >
    window.innerWidth * 2
  ) {
    // Redirect to the end page if the condition is met
    window.location.href = '../end/end.html';
    // console.log(window.playerCoordinates.x);
  }
  if (window.playerHealth <= 0 || window.earthHealth <= 0) {
    window.location.href = '../end/end.html';
  }
}

// Call the updateValues function initially
updateValues();

// Update the values every 100ms (for example)
setInterval(function () {
  updateValues(); // Update score and health values
  checkPlayerHealth(); // Check player's health
}, 100);