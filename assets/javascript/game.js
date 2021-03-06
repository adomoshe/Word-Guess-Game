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
  wins: 0,
  losses: 0,
  remainingGuesses: 5,
  wordBeingGuessed: '',
  guessedLetters: '',
  userGuess: '',
  moviePick: '',
  correctUserGuesses: [],

  initial(e) {
    if (e.code === 'Space') {
      document.getElementById('get-started').innerHTML = '';
      document.getElementById('game-over').innerHTML = '';
      return game.start();
    }
  },
  start() {
    document.removeEventListener('keyup', this.initial);
    let pick = this.movieList[
      Math.floor(Math.random() * this.movieList.length)
    ];
    this.moviePick = pick.toUpperCase();
    console.log(`Here it is... ${this.moviePick}`);
    this.stringGen();
    return document.addEventListener('keyup', this.guess);
  },
  stringGen() {
    this.wordBeingGuessed = '';
    letter: for (let i = 0; i < this.moviePick.length; i++) {
      for (let t = 0; t < this.correctUserGuesses.length; t++) {
        if (this.moviePick[i] === this.correctUserGuesses[t]) {
          this.wordBeingGuessed += this.correctUserGuesses[t] + ' ';
          continue letter;
        }
      }
      if (i === this.moviePick.length - 1) {
        this.wordBeingGuessed += '_';
      } else if (this.moviePick[i] === ' ') {
        this.wordBeingGuessed += '- ';
      } else {
        this.wordBeingGuessed += '_ ';
      }
    }
    this.updateHTML();
  },
  guess(e) {
    if (game.screenInput(e)) {
      return;
    } else {
      game.logic();
    }
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
  screenInput(input) {
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
      alert(`${err} is an invalid key`);
      return true;
    }
    try {
      if (
        game.guessedLetters.indexOf(game.userGuess) !== -1 ||
        game.wordBeingGuessed.indexOf(game.userGuess) !== -1
      ) {
        throw game.userGuess;
      }
    } catch (err) {
      alert(`You already guessed ${err}!`);
      return true;
    }
    return false;
  },
  updateHTML(game) {
    document.getElementById('wins').innerHTML = `Wins: ${this.wins}`;
    document.getElementById('losses').innerHTML = `Losses: ${this.losses}`;
    if (game) {
      document.getElementById('word-being-guessed').innerHTML = '';
      document.getElementById('letters-already-guessed').innerHTML = '';
      document.getElementById('number-of-guesses').innerHTML = '';
      if (game === 'win') {
        document.getElementById('game-over').innerHTML =
          'Correct!<br/><br/>Press Space to play again';
      } else if (game === 'loss') {
        document.getElementById(
          'game-over'
        ).innerHTML = `The correct movie was ${
          this.moviePick
        }!<br/><br/>Press Space to play again`;
      }
    } else {
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
  },
  check() {
    if (this.wordBeingGuessed.indexOf('_ ' && '_') === -1) {
      this.wins++;
      this.updateHTML('win');
      return this.resetGame();
    } else if (this.remainingGuesses === 0) {
      this.losses++;
      this.updateHTML('loss');
      return this.resetGame();
    }
  },
  resetGame() {
    this.remainingGuesses = 5;
    this.wordBeingGuessed = '';
    this.guessedLetters = '';
    this.userGuess = '';
    this.moviePick = '';
    this.correctUserGuesses = [];
    document.removeEventListener('keyup', this.guess);
    return document.addEventListener('keyup', this.initial);
  }
};
document.addEventListener('keyup', game.initial);
