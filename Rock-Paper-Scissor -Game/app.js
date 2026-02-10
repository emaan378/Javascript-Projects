let userScore = 0;
let compScore = 0;
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg")
const userScorepara = document.querySelector("#user-score")
const compScorepara = document.querySelector("#comp-score")

const genCompChoice = () => {
    const options = ["rock", "paper", "Scissors"]
    const randidx = Math.floor(Math.random() * 3);
    return options[randidx]
}
const drawGame = () => {

    msg.innerText = "Game was Draw!.Play again"
    msg.style.backgroundColor = "#081b30"
}
const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorepara.innerText = userScore;
        msg.innerText = `You Win! you ${userChoice} beats ${compChoice}`
        msg.style.backgroundColor = "Green"
    }
    else {
        compScore++;
        compScorepara.innerText = compScore;
        msg.innerText = `You lose! ${compChoice} beats your ${userChoice}`
        msg.style.backgroundColor = "red"
    }
}


const playGame = (userChoice) => {
    console.log("User Choice =", userChoice)
    //Generate computer choice
    const compChoice = genCompChoice();
    console.log("Comp Choice =", compChoice)
    if (userChoice == compChoice) {
        drawGame();
    }
    else {
        let userWin = true;
        if (userChoice == "rock") {
            //scissrs,paper
            userWin = compChoice === "paper" ? false : true;

        }

        else if (userChoice === "paper") {
            //rock,scissors
            userWin =compChoice === "Scissors" ? false : true
        }
        else {
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }
}


choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id")

        playGame(userChoice);
    });
});