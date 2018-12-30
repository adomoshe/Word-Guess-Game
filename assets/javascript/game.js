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
  correctUserGuesses: [],

  start() {
    document.addEventListener('keyup', event => {
      if (event.code === 'Space' && this.spaceCounter === 0) {
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
    this.stringGen(moviePick);
    this.updateHTML();

    document.addEventListener('keyup', event => {
      if (event.keyCode < 65 || event.keyCode > 90) {
        if (event.code === 'Space') {
          return alert(`${event.code} is an invalid key`);
        } else {
          return alert(`${event.key} is an invalid key`);
        }
      } else {
        userGuess = event.key.toUpperCase();
        console.log(`User Guess ${userGuess}`);
      }

      if (
        this.guessedLetters.indexOf(userGuess) !== -1 ||
        this.wordBeingGuessed.indexOf(userGuess) !== -1
      ) {
        return alert(`You already guessed ${userGuess}!`);
      } else if (moviePick.indexOf(userGuess) === -1) {
        this.remainingGuesses--;
        this.guessedLetters += `${userGuess} `;
        return this.updateHTML();
      } else if (this.wordBeingGuessed.indexOf('_ ' || '_') === -1 ) {
        this.wins++;
        return this.resetGame();
      } else if (this.remainingGuesses === 0 ) {
        this.losses++;
        return this.resetGame();
      } else {
        return this.stringBuilder(moviePick, userGuess);
      }
    });
  },
  stringBuilder(moviePick, userGuess) {
    const letterIndices = [],
      moviePickArr = moviePick.split('');
    let wordBeingGuessedArr = [];
    console.log('movie pick arr 1', moviePickArr);
    while (moviePickArr.indexOf(userGuess) !== -1) {
      letterIndices.push(moviePickArr.indexOf(userGuess));
      let curIndex = letterIndices.slice(-1);
      console.log('cur index', curIndex);
      moviePickArr.splice(curIndex, 1, '');
      console.log('movie pick arr 2', moviePickArr);
    }
    console.log(`Letter Indices ${letterIndices}`);
    wordBeingGuessedArr = this.wordBeingGuessed.split(' ');
    console.log('word being guessed Arr', wordBeingGuessedArr);
    for (let i = 0; i < letterIndices.length; i++) {
      wordBeingGuessedArr.splice(letterIndices[i], 1, userGuess);
      console.log(
        'word being guessed index',
        this.wordBeingGuessed[letterIndices[i]]
      );
      console.log('word being guessed Arr', wordBeingGuessedArr);
    }
    this.wordBeingGuessed = wordBeingGuessedArr.join().replace(/,/g, ' ');
    return this.updateHTML();
  },
  stringGen(moviePick) {
    for (let i = 0; i < moviePick.length; i++) {
      for (let t = 0; t < this.correctUserGuesses.length; t++) {
        if (moviePick[i] === this.correctUserGuesses[t]) {
          this.wordBeingGuessed += this.correctUserGuesses[t] + ' ';
          this.updateHTML();
        }
      }
      if (i === moviePick.length - 1) {
        this.wordBeingGuessed += '_';
        this.updateHTML();
      } else if (moviePick[i] === ' ') {
        this.wordBeingGuessed += '- ';
        this.updateHTML();
      } else {
        this.wordBeingGuessed += '_ ';
        this.updateHTML();
      }
    }
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
  },
  resetGame() {
    this.remainingGuesses = 5;
    this.wordbeingGuessed = '';
    this.guessedLetters = '';
    this.correctUserGuesses = [];
    return this.logic();
  }
};

game.start();
