// Rock, Paper, Scissor

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

let playRound = (playerSelection, computerSelection) => {
    switch(playerSelection.toLowerCase()) {
        case "rock":
            if (computerSelection == "rock") {
                console.log("Tie game.");
            }
            else if (computerSelection == "paper") {
                console.log("Rock loses to paper.  You lose.");
            }
            else {
                // Scissor
                console.log("Rock beats scissor.  You win.");
            }
            break;
        case "paper":
            if (computerSelection == "rock") {
                console.log("Paper beats rock.  You win.");
            }
            else if (computerSelection == "paper") {
                console.log("Tie game.");
            }
            else {
                // Scissor
                console.log("Paper loses to scissor.  You lose.");
            }
            break;
        case "scissor":
            if (computerSelection == "rock") {
                console.log("Scissor loses to rock.  You lose.");
            }
            else if (computerSelection == "paper") {
                console.log("Scissor beats paper.  You Win.");
            }
            else {
                // Scissor
                console.log("Tie game.");
            }
            break;
        default:
            console.error("Invalid player selection.");
            break;
    }
};

let game = () => {
    for (let i = 0; i < 5; i++) {
        let playerChoice = prompt("Enter a choice (rock, paper, scissor): ");
        playRound(playerChoice, getComputerChoice());
    }
};

game();
