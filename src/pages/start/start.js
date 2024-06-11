document.addEventListener('DOMContentLoaded', async function () {
  const playerForm = document.getElementById('player-form');
  const playBtn = document.querySelector('.play-btn');
  const inputName = document.getElementById('name');
  const selectGender = document.getElementById('gender');

  // Functions to enable and disable the button
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

  // Add input event listener to the name input field
  inputName.addEventListener('input', () => {
    if (inputName.value.trim().length > 0) {
      enableButton();
    } else {
      disableButton();
    }
  });

  // Handle form submission
  playerForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission

    let playerName = inputName.value.trim();
    let genderValue = selectGender.value;

    // Map the numeric gender values to their corresponding genders
    let genderMap = {
      1: 'Male',
      2: 'Female',
      3: 'LGBTQ+',
    };

    let gender = genderMap[genderValue];

    if (playerName) {
      // Store name and gender in local storage
      localStorage.setItem('playerName', playerName);
      localStorage.setItem('gender', gender);

      // Clear input fields
      inputName.value = '';
      selectGender.selectedIndex = 0; // Reset the select element to its first option

      // Redirect to the game page
      window.location.href = '../game/game.html';
    }
  });

  // Function to detect if the user is using a mobile device
  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  // Redirect back to index.html if user is on a mobile device
  if (isMobileDevice()) {
    window.location.href = '../../../index.html'; // Adjust the path as needed
  }
  console.log('hi');
});
