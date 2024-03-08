let playerForm = document.getElementById('player-form');
let playBtn = document.querySelector('.play-btn');
let inputName = document.getElementById('name');
let selectGender = document.getElementById('gender');

function disableButton() {
  playBtn.disabled = true;
  playBtn.style.cursor = 'not-allowed';
  playBtn.style.backgroundColor = '#9290C3';
}

function enableButton() {
  playBtn.disabled = false;
  playBtn.style.cursor = 'pointer';
  playBtn.style.backgroundColor = 'rgb(0, 255, 0)';
}

// Disable the button initially
disableButton();

// Add event listener to form submission
playerForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form submission
  let playerName = inputName.value.trim();
  let gender = selectGender.value;

  // Perform any validation or processing here before redirecting
  console.log(playerName, gender);

  // Clear input fields
  inputName.value = '';
  selectGender.selectedIndex = 0; // Reset the select element to its first option

  // Redirect to the game page
  window.location.href = '../game/game.html';
});

// Add input event listener to the name input field
inputName.addEventListener('input', () => {
  if (inputName.value.trim().length > 0) {
    enableButton();
  } else {
    disableButton();
  }
});
