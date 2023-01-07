'use strict';
/*
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = 'DOM MANIPULATION!';
console.log(document.querySelector('.message').textContent);

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 69;
document.querySelector('.guess').value = 23; 
*/

let secretNumber = Math.floor(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  // when there is wrong input
  if (!guess || guess > 20 || guess < 0) {
    // document.querySelector('.message').textContent = 'This is not between 1 and 20!';
    displayMessage('This is not between 1 and 20!');

    //when guess is the right number
  } else if (guess === secretNumber) {
    displayMessage('CORRECT!');
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      // document.querySelector('.message').textContent = 'guess > secretNumber ? 'Too High !!' : 'Too Low !!'
      displayMessage(guess > secretNumber ? 'Too High !!' : 'Too Low !!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      // document.querySelector('.message').textContent = '💥 You Lost !!';
      displayMessage('💥 You Lost !!');
      document.querySelector('.score').textContent = 0;
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
