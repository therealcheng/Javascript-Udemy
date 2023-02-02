'use strict';

// ? Numbers
let secretNumber = Math.floor(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

// ? DOM
const check = document.querySelector('.check');
const number = document.querySelector('.number');
const body = document.querySelector('body');
const scoreText = document.querySelector('.score').textContent;

// Updates Message
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

// Game Logic
check.addEventListener('click', () => {
  const guess = Number(document.querySelector('.guess').value);

  // when there is wrong input, update message to say this.
  if (!guess || guess > 20 || guess < 0) {
    displayMessage('This is not between 1 and 20!');
  } else if (guess === secretNumber) {
    displayMessage('CORRECT!');
    number.textContent = secretNumber;
    body.style.backgroundColor = '#60b347';
    number.style.width = '30rem';
    if (score > highScore) {
      // update high score
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      // document.querySelector('.message').textContent = 'guess > secretNumber ? 'Too High !!' : 'Too Low !!'
      displayMessage(guess > secretNumber ? 'Too High !!' : 'Too Low !!');
      score--;
      scoreText = score;
    } else {
      displayMessage('💥 You Lost !!');
      scoreText = 0;
    }
  }

  //    // when guess is too high
  //  } else if (guess > secretNumber) {
  //    if (score > 1) {
  //      document.querySelector('.message').textContent = 'Too High !!';
  //      score--;
  //      document.querySelector('.score').textContent = score;
  //    } else {
  //      document.querySelector('.message').textContent = '💥 You Lost !!';
  //      document.querySelector('.score').textContent = 0;
  //    }

  //    // when guess is too low
  //  } else if (guess < secretNumber) {
  //    if (score > 1) {
  //      document.querySelector('.message').textContent = 'Too Low !!';
  //      score--;
  //      document.querySelector('.score').textContent = score;
  //    } else {
  //      document.querySelector('.message').textContent = '💥 You Lost !!';
  //      document.querySelector('.score').textContent = 0;
  //    }
  //  }
});

// resetting the game
document.querySelector('.again').addEventListener('click', function () {
  // reset Secret number
  secretNumber = Math.floor(Math.random() * 20) + 1;
  //reset score back to 20
  score = 20;
  document.querySelector('.score').textContent = 'score';
  document.querySelector('.number').textContent = '?';
  //changing text back to original 'start guessing'
  // document.querySelector('.message').textContent = 'Start guessing...';
  displayMessage('Start guessing...');
  // resetting width and background colour (if the player guessed correctly)
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  //resetting guess value to nothing
  document.querySelector('.guess').value = '';
});
