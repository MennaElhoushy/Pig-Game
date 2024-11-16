'use strict';
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const imgEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');

let activePlayer, currentScore, playing;
const init = function () {
  activePlayer = 0;
  currentScore = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  imgEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 1 ? 0 : 1;
  console.log(activePlayer);
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    imgEl.classList.remove('hidden');
    imgEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    document.getElementById(`score--${activePlayer}`).textContent =
      Number(document.getElementById(`score--${activePlayer}`).textContent) +
      currentScore;

    if (
      Number(document.getElementById(`score--${activePlayer}`).textContent) >=
      20
    ) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      imgEl.classList.add('hidden');
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

btnNewGame.addEventListener('click', init);
