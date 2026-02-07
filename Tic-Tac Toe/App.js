let boxes = document.querySelectorAll(".box");
let restbtn = document.querySelector("#reset");
let newGameButn=document.querySelector("#new-btn");
let msgCont=document.querySelector(".msg-container")
let msg=document.querySelector("#msg")
let turnO = true;
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];
const resetGame=()=>{
    turnO=true;
    enableBoxes();
    msgCont.classList.add("hide")
    
}
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO === true) {
            box.innerText = "O";
            box.classList.add("O");
            box.classList.remove("X")
            turnO = false;
        }
        else {
            box.innerText = "X"
            turnO = true;
            box.classList.add("X")
            box.classList.remove("O")
        }
        box.disabled = true;
        checkWinner();
    });
});
const disableBoxes=()=>{
    for (let box of boxes){
        box.disabled = true;
    }
    
}
const enableBoxes=()=>{
    for (let box of boxes){
        box.disabled = false;
        box.innerText=""
    }
    
}
const showWinner=(winner)=>{
msg.innerText=`Congratulations! the Winner is ${winner}`
msgCont.classList.remove("hide");
disableBoxes();
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let post1val= boxes[pattern[0]].innerText
        let post2val=boxes[pattern[1]].innerText
        let pos3val=boxes[pattern[2]].innerText
        if (post1val!=""& post2val!=""& pos3val!=""){
            if (post1val==post2val & post2val==pos3val){
                showWinner(post1val);
            }
        }
    }
}
newGameButn.addEventListener("click",resetGame);
restbtn.addEventListener("click",resetGame);

