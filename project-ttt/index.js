// Rock, Paper, Scissor

const result = document.getElementById("result");
const player = document.getElementById("playerScore");
const computer = document.getElementById("computerScore");
let playerScore = 0;
let computerScore = 0;
let gameOver = false;

let getComputerChoice = () => {
    let choiceNum_ = Math.floor(Math.random() * 3) + 1;

    switch(choiceNum_) {
        case 1:
            return "rock";
            break;
        case 2:
            return "paper";
            break;
        case 3:
            return "scissor";
            break;
    }
};

const tieGame = () => { result.textContent = "Tie Game."; }

const roundResult = (playerChoice, computerChoice, playerWin) => {
    if (playerWin) { 
        playerScore++;
        result.textContent = `${playerChoice} beats ${computerChoice}.  You Win.`;
    }
    else {
        computerScore++;
        result.textContent = `${computerChoice} beats ${playerChoice}.  You Lose.`;
    }
    updateScores();

    if (playerScore === 5) {
        endGame("Player");
    }
    else if (computerScore === 5) {
        endGame("Computer");
    }
};

const updateScores = () => {
    player.textContent = `Player Score: ${playerScore}`;
    computer.textContent = `Computer Score: ${computerScore}`;
};

const endGame = (winner) => {
    result.textContent = `${winner} wins!`;
    gameOver = true;
};

let playRound = (e) => {
    if (gameOver) return;
    const playerSelection = e.target.id;
    const computerSelection = getComputerChoice();

    switch(playerSelection) {
        case "rock":
            if (computerSelection == "rock") {
                tieGame();
            }
            else if (computerSelection == "paper") {
                roundResult(playerSelection, computerSelection, false);
            }
            else {
                // Scissor
                roundResult(playerSelection, computerSelection, true);
            }
            break;
        case "paper":
            if (computerSelection == "rock") {
                roundResult(playerSelection, computerSelection, true);
            }
            else if (computerSelection == "paper") {
                tieGame();
            }
            else {
                // Scissor
                roundResult(playerSelection, computerSelection, false);
            }
            break;
        case "scissor":
            if (computerSelection == "rock") {
                roundResult(playerSelection, computerSelection, false);
            }
            else if (computerSelection == "paper") {
                roundResult(playerSelection, computerSelection, true);
            }
            else {
                // Scissor
                tieGame();
            }
            break;
        default:
            console.error("Invalid player selection.");
            break;
    }
};

const options = document.querySelectorAll(".option");
options.forEach(option => option.addEventListener('click', playRound));
