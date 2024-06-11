import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@latest/dist/index.esm.js';

// rest of your code

let buttonAgain = document.getElementById('button');
let score = document.querySelector('.score');

let scoreValue = parseInt(localStorage.getItem('score')) || 0;
score.innerHTML = 'Your Score: ' + scoreValue;

buttonAgain.addEventListener('click', () => {
  window.location.href = '../start/start.html';
});

// Initialize Supabase
const supabaseUrl = process.env.URL_NAME;
const supabaseKey = process.env.KEY_NAME;
const supabase = createClient(supabaseUrl, supabaseKey);

// Get the player's name and score from local storage
let playerName = localStorage.getItem('playerName');
let playerScore = parseInt(localStorage.getItem('score')) || 0;
let playerGender = localStorage.getItem('gender');

// Function to insert the player's name, score, and gender into the database
async function insertPlayer() {
  if (playerName === null || playerScore === null || playerGender === null) {
    return;
  }

  // Fetch the 10th highest scoring player
  const { data: topScores, error: fetchError } = await supabase
    .from('Player')
    .select('score, created_at')
    .order('score', { ascending: false })
    .order('created_at', { ascending: true })
    .range(0, 9);

  if (fetchError) {
    console.error('Error fetching top scores:', fetchError);
    return;
  }

  // If there are less than 10 scores or the player's score is higher than the 10th highest score, insert the player's score
  if (
    topScores.length < 10 ||
    playerScore > topScores[topScores.length - 1].score
  ) {
    const { data, error } = await supabase
      .from('Player')
      .insert([{ name: playerName, score: playerScore, gender: playerGender }]);

    if (error) {
      console.error('Error inserting player:', error);
    } else {
      console.log('Player inserted:', data);
    }
  }

  localStorage.removeItem('playerName');
  localStorage.removeItem('score');
  localStorage.removeItem('gender');
}

insertPlayer();

// Function to fetch scores from the database and populate the leaderboard
async function populateLeaderboard() {
  const { data, error } = await supabase
    .from('Player')
    .select('name, score')
    .order('score', { ascending: false })
    .range(0, 4);

  if (error) {
    console.error('Error fetching scores:', error);
  } else {
    const leaderboard = document
      .getElementById('leaderboard')
      .getElementsByTagName('tbody')[0];

    // Clear any existing rows
    leaderboard.innerHTML = '';

    // Add a new row for each score
    data.forEach((player, index) => {
      let row = leaderboard.insertRow();

      let rankCell = row.insertCell();
      let nameCell = row.insertCell();
      let scoreCell = row.insertCell();

      rankCell.textContent = index + 1;
      nameCell.textContent = player.name.toUpperCase();
      scoreCell.textContent = player.score;
    });
  }
}
populateLeaderboard();

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

let navigationEntries = window.performance.getEntriesByType('navigation');

// If there are any navigation entries and the last one was a reload
if (
  navigationEntries.length > 0 &&
  navigationEntries[navigationEntries.length - 1].type === 'reload'
) {
  window.location.href = '../start/start.html';
}
