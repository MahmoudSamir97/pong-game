import Paddle  from "/Paddle.js";
import Ball from "/Ball.js";
const playerScore = document.querySelector('.player__score');
const computerScore = document.querySelector('.computer__score');
const playerPaddleObj = new Paddle (document.getElementById('player-paddle'));
const computerPaddleObj = new Paddle (document.getElementById('computer-paddle'));
const ballObj = new Ball(document.querySelector('.ball'));
let lastTime;


function update(time){
    if (lastTime != null){
        const delta = time - lastTime;
        ballObj.update(delta , [playerPaddleObj.rect(), computerPaddleObj.rect()])
        computerPaddleObj.update(delta, ballObj.y);
        let hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"));
        document.documentElement.style.setProperty("--hue",   hue + delta * 0.01) 
        console.log(getComputedStyle(document.documentElement).getPropertyValue("--hue"));
    }
    lastTime = time;

    if(isLose()){
     handleLose();
    }
   
    requestAnimationFrame(update);
}

document.addEventListener('mousemove', (e)=>{
    playerPaddleObj.position = e.y;

})

function isLose(){
    const rect = ballObj.rect();
    return (rect.left <= 0 || rect.right >= window.innerWidth);

}

function handleLose(){
    const rect = ballObj.rect();
    if (rect.right >= window.innerWidth){
        playerScore.textContent = parseInt(playerScore.textContent) +1;

    } if (rect.left <=0){
        computerScore.textContent = parseInt(playerScore.textContent) +1;

    }
    ballObj.reset();
    computerPaddleObj.reset();

}

requestAnimationFrame(update);


