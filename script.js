'use strict';

//Selecting Elements
let score0El = document.getElementById('score--0');
let score1El = document.querySelector('#score--1');
let current0El = document.getElementById('current--0');
let current1El = document.getElementById('current--1');
let player0El = document.querySelector('.player--0');
let player1El = document.querySelector('.player--1');

let diceEl = document.querySelector('.dice');
let btnNew = document.querySelector('.btn--new');
let btnHold = document.querySelector('.btn--hold');
let btnRoll = document.querySelector('.btn--roll');

//Starting Conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let activity = true;
let switchPlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
  if (activity) {
    //1. Generating a random dice roll
    let dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check wheter roll is 1
    if (dice != 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switching the player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (activity) {
    //1. Add current score to total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2.Check if score is >=100
    if (scores[activePlayer] >= 20) {
      activity = false;
      diceEl.classList.add('hidden');
      //current player wins
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  activity = true;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document.querySelector('.player--0').classList.add('player--active');
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  document.getElementById('current--0').textContent = currentScore;
  document.getElementById('current--1').textContent = currentScore;
  document.getElementById('score--0').textContent = currentScore;
  document.getElementById('score--1').textContent = currentScore;
});
