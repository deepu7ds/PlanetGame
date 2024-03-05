let playBtn = document.querySelector('.play-btn');
let inputName = document.getElementById('name');

let playerName = '';
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

inputName.addEventListener('input', () => {
  playerName = inputName.value.trim();
  if (inputName.value.trim().length > 0) {
    enableButton();
  } else {
    disableButton();
  }
});

playBtn.addEventListener('click', () => {
  inputName.value = '';
  window.location.href = '../game/game.html';
});

console.log(playerName);
