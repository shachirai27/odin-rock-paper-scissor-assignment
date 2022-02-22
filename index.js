let userScore = 0;
let computerScore = 0;
let tie = 0;
let buttons = document.querySelectorAll("button");
let enterButton = document.getElementsByClassName("enter-button")[0];
let span = document.getElementsByClassName("close")[0];;
let modal = document.getElementById("myModal");
let resultModal = document.getElementById("resultAnnounce");

//function to choose a move
function computerPlay() {
    let moves = ["Rock", "Paper", "Scissors"];
    let selectedMove = Math.floor((Math.random() * 3));
    return moves[selectedMove];
}

//function to play a round
function playRound(playerSelection, computerSelection) {
    /* playerSelection = playerSelection[0].toUpperCase() + playerSelection.slice(1).toLowerCase(); */
    /* let computerSelection = computerPlay(); */
    let result = "";
    if (userScore < 5 && computerScore < 5) {
        result = playerSelectionOption(playerSelection, computerSelection);
        document.getElementById("result-text").textContent = result;
        result.includes("Win") ? ++userScore : (result.includes("Lose") || result.includes("Invalid")) ? ++computerScore : ++tie;
        updateScore();
    }
}

function playerSelectionOption(playerSelection, computerSelection) {
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

function updateScore() {
    document.getElementById("user-score").textContent = userScore;
    document.getElementById("comp-score").textContent = computerScore;
    document.getElementById("tie-score").textContent = tie;
}

function keepScore() {
    resultModal.style.display = "block";
    if (userScore === 5) {
        document.getElementById("results").textContent = "You Win!";
    } else {
        document.getElementById("results").textContent = "You Lose! Try Again!!";
    }
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        playerSelection = button.textContent;
        let computerSelection = computerPlay();
        playRound(playerSelection, computerSelection);
        if (userScore === 5 || computerScore === 5) {
            keepScore();
        }
    });
});

function loadModal() {
    modal.style.display = "block";
}

enterButton.onclick = function () {
    modal.style.display = "none";
}

span.onclick = function () {
    resultModal.style.display = "none";
    userScore = 0;
    tie = 0;
    computerScore = 0;
    document.getElementById("result-text").textContent = "Results for each round will be displayed here...";
    updateScore()
}

window.onclick = function (event) {
    if (event.target == resultModal) {
        resultModal.style.display = "none";
        userScore = 0;
        tie = 0;
        computerScore = 0;
        document.getElementById("result-text").textContent = "Results for each round will be displayed here...";
        updateScore()
    }
}

const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
};

const texts = [
    "Welcome!",
    "Get",
    "Ready",
    "to",
    "Play",
    "This Game",
    "Of",
    "Sheer Luck!",
    "Click Enter",
    "to continue.."
];

const morphTime = 1.5;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
    }

    setMorph(fraction);
}

function setMorph(fraction) {
    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
}

function animate() {
    requestAnimationFrame(animate);
    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
        if (shouldIncrementIndex) {
            textIndex++;
        }

        doMorph();
    } else {
        doCooldown();
    }
}

animate();


//function to play 5 rounds with user and keep score
/* function game() {
    let userScore = 0;
    let computerScore = 0;
    let tie = 0;
    let computerSelection = computerPlay();
    let playerSelection = "";
    for (let i = 0; i < 5; i++) {
    playerSelection = prompt("Enter Your Move!");
    if (playerSelection === null || playerSelection === " ") {
        alert("Game Cancelled!");
        return;
    }
    let result = playRound(playerSelection, computerSelection);
    alert(result);
    result.includes("Win") ? ++userScore : (result.includes("Lose") || result.includes("Invalid")) ? ++computerScore : ++tie;
     } 
    alert(`Scores: User: ${userScore}, Computer: ${computerScore}, Tie: ${tie}`);
}

game(); */
