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
  userGuess: '',
  moviePick: '',
  correctUserGuesses: [],

  initial() {
    if (this.spaceCounter === 0) {
      document.addEventListener('keyup', e => {
        if (e.code === 'Space' && this.spaceCounter === 0) {
          this.spaceCounter++;
          document.getElementById('get-started').innerHTML = '';
          return this.start();
        }
      });
    } else {
      return this.start();
    }
  },
  start() {
    this.moviePick = this.randomMovie().toUpperCase();
    console.log(this.moviePick);
    this.stringGen();
    this.updateHTML();
    return document.addEventListener('keyup', this.guess);
  },
  guess(e) {
    game.inputScreening(e, error => {
      if (error) {
        return;
      } else {
        if (game.moviePick.indexOf(game.userGuess) === -1) {
          game.remainingGuesses--;
          game.guessedLetters += `${game.userGuess} `;
          game.updateHTML();
          return game.check();
        } else {
          game.stringBuilder();
          return game.check();
        }
      }
    });
  },
  inputScreening(e, cb) {
    let error = false;
    try {
      if (e.keyCode < 65 || e.keyCode > 90) {
        if (e.code === 'Space') {
          throw e.code;
        } else {
          throw e.key;
        }
      } else {
        this.userGuess = e.key.toUpperCase();
      }
    } catch (err) {
      if (err) {
        error = true;
      }
      return alert(`${err} is an invalid key`);
    }
    try {
      if (
        game.guessedLetters.indexOf(game.userGuess) !== -1 ||
        game.wordBeingGuessed.indexOf(game.userGuess) !== -1
      ) {
        throw game.userGuess;
      }
    } catch (err) {
      if (err) {
        error = true;
      }
      return alert(`You already guessed ${err}!`);
    } finally {
      cb(error);
    }
  },
  stringBuilder() {
    const letterIndices = [],
      moviePickArr = this.moviePick.split('');
    let wordBeingGuessedArr = [];
    while (moviePickArr.indexOf(this.userGuess) !== -1) {
      letterIndices.push(moviePickArr.indexOf(this.userGuess));
      let curIndex = letterIndices.slice(-1);
      moviePickArr.splice(curIndex, 1, '');
    }
    wordBeingGuessedArr = this.wordBeingGuessed.split(' ');
    for (let i = 0; i < letterIndices.length; i++) {
      wordBeingGuessedArr.splice(letterIndices[i], 1, this.userGuess);
    }
    this.wordBeingGuessed = wordBeingGuessedArr.join().replace(/,/g, ' ');
    return this.updateHTML();
  },
  stringGen() {
    this.wordBeingGuessed = '';
    for (let i = 0; i < this.moviePick.length; i++) {
      // for (let t = 0; t < this.correctUserGuesses.length; t++) {
      //   if (moviePick[i] === this.correctUserGuesses[t]) {
      //     this.wordBeingGuessed += this.correctUserGuesses[t] + ' ';
      //     this.updateHTML();
      //   }
      // }
      if (i === this.moviePick.length - 1) {
        this.wordBeingGuessed += '_';
        this.updateHTML();
      } else if (this.moviePick[i] === ' ') {
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
  check() {
    if (this.wordBeingGuessed.indexOf('_ ' && '_') === -1) {
      this.wins++;

      return this.resetGame();
    } else if (this.remainingGuesses === 0) {
      this.losses++;
      return this.resetGame();
    }
  },
  resetGame() {
    this.remainingGuesses = 5;
    this.wordbeingGuessed = '';
    this.guessedLetters = '';
    this.correctUserGuesses = [];
    document.removeEventListener('keyup', this.guess);
    return this.initial();
  }
};
game.initial();
