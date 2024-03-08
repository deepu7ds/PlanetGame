let buttonAgain = document.getElementById('button');
let score = document.querySelector('.score');

score.innerHTML = 'Score: ' + parseInt(localStorage.getItem('score')) || 0;

buttonAgain.addEventListener('click', () => {
  window.location.href = '../start/start.html';
});
