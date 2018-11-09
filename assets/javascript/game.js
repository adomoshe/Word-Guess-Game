// List of Tarantino movies used in the game
var movieList = ["Pulp Fiction", "Inglorious Basterds", "Reservoir Dogs", "The Hateful Eight", "Kill Bill", "Jackie Brown", "Django Unchained"];

// Keeping track of wins
var wins = 0;

// Keeping track of losses
var losses = 0;

// Keeping track of guesses remaining (also used to reset the game when = 0)
var remainingGuesses = 5;

// Forms the word being guessed by the player in an array
var wordBeingGuessed = [];

// Picks a random movie from the movieList array
var moviePick = movieList[Math.floor(Math.random() * movieList.length)];

// Turns the movie picked into lower case to interact better wtih the game
moviePickLowerCase = moviePick.toLowerCase();

// Determines how many characters moviePick has
var numberOfLetters = moviePickLowerCase.length;

console.log(moviePick)
console.log(numberOfLetters)
console.log(wins)
console.log(losses)

// Loop used to display the number of characters in the moviePick with "_" so the used can see how many characters are in the word
for (var i = 0; i < moviePick.length; i++){
    wordBeingGuessed.push ("_ ");
}

// Function to start once key is released
document.onkeydown = function(){

    // Gets rid of the Let's get started HTML prompting the player to hit a key to play
    document.getElementById("getStarted").innerHTML = " ";

    // Dynamically displays wins using .innerHTML
    document.getElementById("wins").innerHTML = "Wins: " + wins;

    // Dynamically displays losses using .innerHTML
    document.getElementById("losses").innerHTML = "Losses: " + losses;

    // Dynamically displays the word that is being guessed (changing "_" to letters)
    document.getElementById("wordBeingGuessed").innerHTML = wordBeingGuessed;

    // Dynamically displays what letters the player has already guessed
    document.getElementById("lettersAlreadyGuessed").innerHTML = "You have already guessed: " + guessedLetters;

    // Dynamically displays how many remaining guesses the player has
    document.getElementById("numberOfGuesses").innerHTML = "You have " + remainingGuesses + " guesses left";

    // Declares variable userGuess as the key pressed and translates to lower case
    var userGuess = event.key.toLowerCase();

    // Declares variable guessedLetters as an array that we will populate with letters the player guessed but were not in the moviePick
    var guessedLetters = []

    // Records positions of letters in an array used as reference between letters guessed correctly and their position in moviePick
    var collectPositions = [];

        // Loop setting i to the length of moviePick
        for (var i = 0; i < moviePick.length; i++){

            // If the letter the player guessed (userGuess) matched a letter in the movie randomly chosen (moviePickLowerCase) then the number of that character will be recorded by i and pushed into the collectPositions array to be later recalled and substituted in the html for the user to see
            if (moviePickLowerCase[i] === userGuess){
            collectPositions.push(i);
            }
        }

        // If the letter guessed did not match a letter in the movie generated then that letter will be pushed into the guessedLetters array for the player to see in the html and the player will lose a guess
        if (collectPositions.length === 0){
            remainingGuesses--;
            guessedLetters.push(i);
        }

        // An else statement that loops through the numbers in the collectPositions array populated by a correct player input that was translated into an index, marking the position of that character. Then the statement takes the letter form userGuess and feeds that into the right index of wordBeingGuessed to later display in the html
        else {
            for(var i = 0; i < collectPositions.length; i++) {
                wordBeingGuessed[collectPositions[i]] = userGuess;
            }
        }
    
    // If there are no more "_" in the wordBeingGuessed (moviePick) it means that all of the letters have been guessed correctly before the player ran out of guesses so the player gets a win
    if (wordBeingGuessed.indexOf("_ ") === 0) {
        wins++;
    
    
    }

    // If remainingGuesses = 0 then the game resets and a new movie is generated for the player to guess
    if (remainingGuesses == 0) {
        gameReset();
    }


            console.log(remainingGuesses);
            console.log(userGuess);
            console.log(collectPositions);
}


    

