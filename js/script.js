//Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

//Global variables
let randomNumber;
let attempts = 0;
let allowedAttempts = 7;
let totalWins = 0;
let totalLosses = 0;

initializeGame();

function initializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("randomNumber: " + randomNumber);
    attempts = 0;

    //hiding the Reset button
    document.querySelector("#resetBtn").style.display = "none";

    //showing the guess button
    document.querySelector("#guessBtn").style.display = "inline";

    let playerGuesses = document.querySelector("#playerGuess");
    playerGuesses.focus(); //adding focus to textbox
    playerGuesses.value = ""; //clearing the textbox

    let feedback = document.querySelector("#feedback");
    feedback.textContent = "What could the number be?"; // clearing the feedback

    // Clearing previous guesses
    document.querySelector("#guesses").textContent = "";

    // Clearing previous attempts
    document.querySelector("#attempts").textContent = allowedAttempts;

    // Update win/loss display
    updateStatsDisplay();
}

function checkGuess() {
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    let guess = document.querySelector("#playerGuess").value;
    console.log("Player guess: " + guess);
    if (guess < 1 || guess > 99) {
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";
        return;
    }

    attempts++;
    console.log("Attempts: " + attempts);
    feedback.style.color = "orange";
    if (guess == randomNumber) {
        feedback.textContent = "You guessed it! You Won!";
        feedback.style.color = "darkgreen";
        totalWins++;
        updateStatsDisplay();

        // Displaying winning stats
        document.querySelector("#guesses").textContent += guess + " ";
        document.querySelector("#attempts").textContent = allowedAttempts - attempts;

        gameOver();
    } else {
        document.querySelector("#guesses").textContent += guess + " ";
        document.querySelector("#attempts").textContent = allowedAttempts - attempts;
        if (attempts == allowedAttempts) {
            feedback.textContent = "Sorry, you lost! The number was " + randomNumber;
            feedback.style.color = "red";
            totalLosses++;
            updateStatsDisplay();
            gameOver();
        } else if (guess > randomNumber) {
            feedback.textContent = "Guess was high";
        } else {
            feedback.textContent = "Guess was low";
        }
    }
}

function gameOver() {
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none";
    resetBtn.style.display = "inline";
    console.log("GAME OVER");
}

function updateStatsDisplay() {
    document.querySelector("#wins").textContent = totalWins;
    document.querySelector("#losses").textContent = totalLosses;
}