//function to choose a move
function computerPlay() {
    let moves = ["Rock", "Paper", "Scissors"];
    let selectedMove = Math.floor((Math.random() * 3));
    return moves[selectedMove];
}

//function to play a round
function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection[0].toUpperCase() + playerSelection.slice(1).toLowerCase();
    if (playerSelection === computerSelection) {
        return `It's a tie. You both selected ${playerSelection}!`;
    } else {
        switch (playerSelection) {
            case "Scissors":
                return computerSelection === "Paper" ? `You Win! ${playerSelection} beats ${computerSelection}!` :
                    `You Lose! ${computerSelection} beats ${playerSelection}!`;
            case 'Rock':
                return computerSelection === "Scissors" ? `You Win! ${playerSelection} beats ${computerSelection}!` :
                    `You Lose! ${computerSelection} beats ${playerSelection}!`;
            case 'Paper':
                return computerSelection === "Rock" ? `You Win! ${playerSelection} beats ${computerSelection}!` :
                    `You Lose! ${computerSelection} beats ${playerSelection}!`;
            default:
                return "Invalid move! Computer gets a point. Please Enter a Valid Move!";
        }
    }
}

//function to play 5 rounds with user and keep score
function game() {
    let userScore = 0;
    let computerScore = 0;
    let tie = 0;
    let computerSelection = computerPlay();
    let playerSelection = "";
    for (let i = 0; i < 5; i++) {
        playerSelection = prompt("Enter Your Move!");
        let result = playRound(playerSelection, computerSelection);
        alert(result);
        result.includes("Win") ? ++userScore : (result.includes("Lose") || result.includes("Invalid")) ? ++computerScore : ++tie;
    }
    alert(`Scores: User: ${userScore}, Computer: ${computerScore}, Tie: ${tie}`);
}

game();
