'use strict';

// Selecting elements.
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions.
let startingConditions = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden'); // makes dice png hidden.
};
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

startingConditions();

// Switch Player (on rolling 1)
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Roll dice funcitonality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Dice rolled from click*
    const dice = Math.floor(Math.random() * 6) + 1;
    // 2. Display dice number to page
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. If rolled a '1' switch & update UI
    if (dice !== 1) {
      currentScore += dice; // add 1
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // UI update
    } else {
      // Switch the Player, reset current score for both, changing visuals.
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to activePlayer
    scores[activePlayer] += currentScore;
    // score[1] = score[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // else, switch the player.
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  startingConditions(); // reset conditions to initial
  current0El.textContent = 0; // show 0 for content
  current1El.textContent = 0;
  scores = [0, 0]; // reset total scores
  currentScore = 0; // reset current score
  activePlayer = 0; // make active Player = Player 1
  playing = true; // makes button able to activate

  // resetting the visuals
  // if either of both players have player--winner active, remove it.
  if (
    document.querySelector('.player--0').classList.contains('player--winner')
  ) {
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--0').classList.add('player--active');
  } else {
    document.querySelector('.player--1').classList.remove('player--winner');
    document.querySelector('.player--0').classList.add('player--active');
  }

  if (
    document.querySelector('.player--0').classList.contains('player--active') &&
    document.querySelector('.player--1').classList.contains('player--active')
  ) {
    document.querySelector('.player--1').classList.remove('player--active');
  }
});
