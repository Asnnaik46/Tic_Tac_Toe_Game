let boxes = document.querySelectorAll(".box");
let resetGameBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let playComputerBtn = document.querySelector("#play-computer-btn");
let multiplayerBtn = document.querySelector("#multiplayer-btn");
let msgcontainer = document.querySelector(".msg");
let msg = document.querySelector("#message");

let turnO = true;
let computerPlayer = false;

const winpattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const computerMove = () => {
    if (computerPlayer && !turnO) {
        let emptyBoxes = Array.from(boxes).filter(box => box.innerText === "");
        let randomIndex = Math.floor(Math.random() * emptyBoxes.length);
        let randomBox = emptyBoxes[randomIndex];
        randomBox.innerText = "X";
        randomBox.disabled = true;
        checkWin();
        turnO = true;
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkWin();
        computerMove();
    });
});

const disableboxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinners = (winner) => {
    msgcontainer.style.display = "block";
    if (computerPlayer) {
        if (winner === 'O') {
            msg.innerText = `Congratulations, You are the winner!`;
        } else if (winner === 'X') {
            msg.innerText = `Opps, Computer is winner!`;
        }
    } else {
        if (winner === 'X') {
            msg.innerText = `Congratulations, Player X wins!`;
        } else if (winner === 'O') {
            msg.innerText = `Congratulations, Player O wins!`;
        }
    }
    disableboxes();
};

const checkWin = () => {
    let draw = true;
    for (let pattern of winpattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinners(pos1Val);
                draw = false;
            }
        }
    }
    if (draw) {
        let allBoxesFilled = true;
        for (let box of boxes) {
            if (box.innerText === "") {
                allBoxesFilled = false;
                break;
            }
        }
        if (allBoxesFilled) {
            msgcontainer.style.display = "block";
            msg.innerText = "The game ends in a draw! Well played by both sides!";
        }
    }
};

const resetGame = () => {
    enableBoxes();
    turnO = true;
    msgcontainer.style.display = "none";
    msg.innerText = "";
};

newGameBtn.addEventListener("click", resetGame);
resetGameBtn.addEventListener("click", resetGame);

playComputerBtn.addEventListener("click", () => {
    computerPlayer = true;
    resetGame();
});

multiplayerBtn.addEventListener("click", () => {
    computerPlayer = false;
    resetGame();
});
