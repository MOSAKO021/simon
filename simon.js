let gameSeq = [];
let UserSeq = [];
let btns = ["yellow", "orange","pink","blue"];

let started = false;
let level = 0;
let h3 = document.querySelector("h3");
let maxScore = 0;

document.addEventListener("keypress", function(){
    if(!started){
        started = true;
        console.log("game started");
        levelUp();
    }
    
});
let max = document.querySelector(".maxScore");

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 100);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 150);
}

function levelUp() {
    UserSeq = [];
    level++;
    maxScore = Math.max(level,maxScore);
    h3.innerText = `Level ${level}`;

    let ranIdx = Math.floor(Math.random() * 4);
    let ranCol = btns[ranIdx];
    let btn = document.querySelector(`.${ranCol}`);
    gameFlash(btn);
    gameSeq.push(ranCol);
    console.log(gameSeq);
}

function ansCheck(idx){
    if(UserSeq[idx] === gameSeq[idx]){
        if(UserSeq.length == gameSeq.length){
            setTimeout(levelUp, 500);
        }
    } else {
        h3.innerHTML = `Game over! Your Score was <b>${level-1}</b> <br>Press any key to start again`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

let allBtns = document.querySelectorAll(".btns");
function btnPress() {
    let btn = this;
    userFlash(btn);
    let userCol = btn.getAttribute("id"); 
    UserSeq.push(userCol);
    ansCheck(UserSeq.length-1);
}
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    level = 0;
    UserSeq = [];
    gameSeq = [];
    max.innerText = `Your Highest Score : ${maxScore-1}`;
}
