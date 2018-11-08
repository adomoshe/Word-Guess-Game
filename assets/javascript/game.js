// List of Tarantino movies used in the game
var movieList = ["Pulp Fiction", "Inglorious Basterds", "Reservoir Dogs", "The Hateful Eight", "Kill Bill", "Jackie Brown", "Django Unchained"]

// Keeping track of wins
var wins = 1

// Keeping track of losses
var losses = 0

// Function to start once window is loaded
window.onload = function (game){

    // Picks a random movie from the movieList array
    var moviePick = movieList[Math.floor(Math.random() * movieList.length)];

    // Determines how many characters the moviePick has
    var numberOfLetters = moviePick.length;

    // Function to start once key is released
    document.onkeyup = function(type){

        // Declares variable userGuess as the key pressed
        var userGuess = event.key.toLowerCase();

        // Loop that goes through each one of the characters in moviePick
        // for (var char = 1; char <= numberOfLetters; char++){

        if (userGuess === char){
            wins++;
        };

        };
    };

    };


    console.log(moviePick)
    console.log(numberOfLetters)
    console.log(userGuess)
    console.log(wins)
    console.log(losses)
};

