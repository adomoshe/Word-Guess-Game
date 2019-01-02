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
    let pick = this.movieList[
      Math.floor(Math.random() * this.movieList.length)
    ];
    this.moviePick = pick.toUpperCase();
    console.log(this.moviePick);
    this.stringGen();
    this.updateHTML();
    return document.addEventListener('keyup', this.guess);
  },
  stringGen() {
    this.wordBeingGuessed = '';
    for (let i = 0; i < this.moviePick.length; i++) {
      let added = false;
      for (let t = 0; t < this.correctUserGuesses.length; t++) {
        if (this.moviePick[i] === this.correctUserGuesses[t]) {
          this.wordBeingGuessed += this.correctUserGuesses[t] + ' ';
          this.updateHTML();
          added = true;
        }
      }
      if (i === this.moviePick.length - 1 && !added) {
        this.wordBeingGuessed += '_';
        this.updateHTML();
      } else if (this.moviePick[i] === ' ') {
        this.wordBeingGuessed += '- ';
        this.updateHTML();
      } else if (!added) {
        this.wordBeingGuessed += '_ ';
        this.updateHTML();
      }
    }
  },
  guess(e) {
    game.screenInput(e, error => {
      if (error) {
        return;
      } else {
        game.logic();
      }
    });
  },
  logic() {
    if (this.moviePick.indexOf(this.userGuess) === -1) {
      this.remainingGuesses--;
      this.guessedLetters += `${this.userGuess} `;
      this.updateHTML();
      return this.check();
    } else {
      this.correctUserGuesses.push(this.userGuess);
      this.stringGen();
      return this.check();
    }
  },
  screenInput(input, cb) {
    let error = false;
    try {
      if (input.keyCode < 65 || input.keyCode > 90) {
        if (input.code === 'Space') {
          throw input.code;
        } else {
          throw input.key;
        }
      } else {
        this.userGuess = input.key.toUpperCase();
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

// Below method's capabilities have been incorporated into the stringGen method for simplicity

// stringBuilder() {
//   const letterIndices = [],
//     moviePickArr = this.moviePick.split('');
//   let wordBeingGuessedArr = [];
//   while (moviePickArr.indexOf(this.userGuess) !== -1) {
//     letterIndices.push(moviePickArr.indexOf(this.userGuess));
//     let curIndex = letterIndices.slice(-1);
//     moviePickArr.splice(curIndex, 1, '');
//   }
//   wordBeingGuessedArr = this.wordBeingGuessed.split(' ');
//   for (let i = 0; i < letterIndices.length; i++) {
//     wordBeingGuessedArr.splice(letterIndices[i], 1, this.userGuess);
//   }
//   this.wordBeingGuessed = wordBeingGuessedArr.join().replace(/,/g, ' ');
//   return this.updateHTML();
// },
