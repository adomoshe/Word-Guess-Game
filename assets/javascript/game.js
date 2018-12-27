'use strict';

// List of Tarantino movies used in the game
const movieList = [
  'Pulp Fiction',
  'Inglorious Basterds',
  'Reservoir Dogs',
  'The Hateful Eight',
  'Kill Bill',
  'Jackie Brown',
  'Django Unchained'
];

const wins = 0,
  losses = 0;

let spaceCounter = 0;

const start = () => {
  const collectPositions = [],
    moviePicklow = randomMovie(),
    moviePick = moviePicklow.toUpperCase();

  console.log(moviePick);

  let userGuess = '',
    remainingGuesses = 5,
    wordBeingGuessed = '',
    guessedLetters = '';

  for (let i = 0; i < moviePick.length; i++) {
    wordBeingGuessed += '_ ';
  }
  updateHTML(wordBeingGuessed, guessedLetters, remainingGuesses);

  document.addEventListener('keyup', event => {
    if (event.keyCode < 65 || event.keyCode > 90) {
      return alert(`${event.key} is an invalid key`);
    }
    const userGuess = event.key.toUpperCase();
    console.log(`User Guess ${userGuess}`);

    if (guessedLetters.indexOf(userGuess) !== -1) {
      return alert(`You already guessed ${userGuess}!`);
    }
    guessedLetters += `${userGuess} `;

    if (moviePick.indexOf(userGuess) === -1) {
      remainingGuesses--;
      return updateHTML(wordBeingGuessed, guessedLetters, remainingGuesses);
    } else {
      let letterIndex = moviePick.indexOf(userGuess);
      return console.log(`Letter Index ${letterIndex}`);
      // wordBeingGuessed.replace(/\s/g, '');
    }

    updateHTML(wordBeingGuessed, guessedLetters, remainingGuesses);
  });
};

const randomMovie = () => {
  return movieList[Math.floor(Math.random() * movieList.length)];
};

const updateHTML = (wordBeingGuessed, guessedLetters, remainingGuesses) => {
  document.getElementById('get-started').innerHTML = '';
  document.getElementById('wins').innerHTML = `Wins: ${wins}`;
  document.getElementById('losses').innerHTML = `Losses: ${losses}`;
  document.getElementById('word-being-guessed').innerHTML = wordBeingGuessed;
  document.getElementById(
    'letters-already-guessed'
  ).innerHTML = `You have already guessed: ${guessedLetters}`;
  document.getElementById(
    'number-of-guesses'
  ).innerHTML = `You have ${remainingGuesses} guesses left`;
};

document.addEventListener('keyup', event => {
  console.log(event);
  if (event.code === 'Space' && spaceCounter === 0) {
    spaceCounter++;
    start();
  }
});
