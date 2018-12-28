'use strict';

const game = {
  movieList: [
    'Pulp Fiction',
    'Inglorious Basterds',
    'Reservoir Dogs',
    'The Hateful Eight',
    'Kill Bill',
    'Jackie Brown',
    'Django Unchained'
  ],
  spaceCounter: 0,
  wins: 0,
  losses: 0,
  remainingGuesses: 5,
  wordBeingGuessed: '',
  guessedLetters: '',

  start() {
    document.addEventListener('keyup', event => {
      console.log('start', event);
      if (event.code === 'Space' && this.spaceCounter === 0) {
        console.log('start', this);
        this.spaceCounter++;
        return this.logic();
      }
    });
  },

  logic() {
    const moviePicklow = this.randomMovie(),
      moviePick = moviePicklow.toUpperCase();
    let userGuess = '';

    console.log(moviePick);

    for (let i = 0; i < moviePick.length; i++) {
      this.wordBeingGuessed += '_ ';
    }
    this.updateHTML();

    document.addEventListener('keyup', event => {
      if (event.keyCode < 65 || event.keyCode > 90) {
        return alert(`${event.key} is an invalid key`);
      }
      userGuess = event.key.toUpperCase();
      console.log(`User Guess ${userGuess}`);

      if (
        this.guessedLetters.indexOf(userGuess) !== -1 ||
        this.wordBeingGuessed.indexOf(userGuess) !== -1
      ) {
        return alert(`You already guessed ${userGuess}!`);
      }

      if (moviePick.indexOf(userGuess) === -1) {
        this.remainingGuesses--;
        this.guessedLetters += `${userGuess} `;
        return this.updateHTML();
      } else {
        return this.stringBuilder(moviePick, userGuess);
      }
    });
  },
  stringBuilder(moviePick, userGuess) {
    const letterIndices = [],
      moviePickArr = moviePick.split('');
    console.log('movie pick arr 1', moviePickArr);
    while (moviePickArr.indexOf(userGuess) !== -1) {
      letterIndices.push(moviePickArr.indexOf(userGuess));
      let curIndex = letterIndices.slice(-1);
      console.log('cur index', curIndex)
      moviePickArr.splice(curIndex, 1, '');
      console.log('movie pick arr 2', moviePickArr);
    }
    console.log(`Letter Indices ${letterIndices}`);
    let wordBeingGuessedArr = this.wordBeingGuessed.split(' ')
    wordBeingGuessedArr.pop();
    console.log('word being guessed Arr', wordBeingGuessedArr);
    for (let i = 0; i < letterIndices.length; i++) {
      wordBeingGuessedArr.splice(letterIndices[i], 1, userGuess);
      console.log(this.wordBeingGuessed[letterIndices[i]]);
      console.log('word being guessed Arr', wordBeingGuessedArr);
    }
    this.wordBeingGuessed = wordBeingGuessedArr.join().replace(/,/g, ' ');
    return this.updateHTML();
  },
  randomMovie() {
    return this.movieList[Math.floor(Math.random() * this.movieList.length)];
  },
  updateHTML() {
    document.getElementById('get-started').innerHTML = '';
    document.getElementById('wins').innerHTML = `Wins: ${this.wins}`;
    document.getElementById('losses').innerHTML = `Losses: ${this.losses}`;
    document.getElementById(
      'word-being-guessed'
    ).innerHTML = this.wordBeingGuessed;
    document.getElementById(
      'letters-already-guessed'
    ).innerHTML = `You have already guessed: ${this.guessedLetters}`;
    document.getElementById('number-of-guesses').innerHTML = `You have ${
      this.remainingGuesses
    } guesses left`;
  }
};

game.start();
