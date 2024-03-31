let buttonAgain = document.getElementById('button');
let score = document.querySelector('.score');

score.innerHTML = 'Score: ' + parseInt(localStorage.getItem('score')) || 0;

buttonAgain.addEventListener('click', () => {
  window.location.href = '../start/start.html';
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
