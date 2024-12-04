const player1 = document.querySelector("#player1");
const player2 = document.querySelector("#player2");
const gameArea = document.querySelector("#gameArea");
const gameHeader = document.querySelector("#gameHeader");
const pongball = document.querySelector("#pongBall");
let getGameAreaRect = gameArea.getBoundingClientRect();
let getPongBallRect = pongball.getBoundingClientRect();
let getPlayer1Rect = player1.getBoundingClientRect();

let gamePaused = false;

// PLAYER 
const keyPressed = {}; 
let player1Y = 200;


function movePlayers() {


  let getPosPlayer1 = getPlayer1Rect.top - getGameAreaRect.top;
  
  let insideBorderBottom = getGameAreaRect.bottom-10;
  let moveSpeed = 10;
  
  if (keyPressed["w"] && getPosPlayer1 > 0) {
    console.log(getPosPlayer1)
        player1Y = player1Y -= moveSpeed;
        // player1.style.top = getPlayer1Rect.top - moveSpeed+"px";
  }
  if (keyPressed["s"]) {
    if (getPlayer1Rect.height + player1Y > insideBorderBottom) {
      player1Y = insideBorderBottom - getPlayer1Rect.height;
      // console.log("player: "+(player1Y+getPlayer1Rect.height));
      // console.log("border "+insideBorderBottom);
      // console.log("play1: " + player1Y)
    } else {
      player1Y += moveSpeed;
    }
  } 

  if(keyPressed["ArrowUp"]){
    
  }
  if(keyPressed["ArrowDown"]){
    
  }
  player1.style.top = player1Y + "px";
} 


// BALL 
let ballSpeedY = 5;
let ballSpeedX = 5;
let ballPosY = getGameAreaRect.height/2;
let ballPosX = getGameAreaRect.width/2;

function moveBall(){
  ballPosY += ballSpeedY
  ballPosX += ballSpeedX;
  
  pongball.style.top = ballPosY + "px";
  pongball.style.left = ballPosX + "px";
  console.log("Game Area: "+ getGameAreaRect.bottom);
  console.log("ball "+ ballPosY);
  if (ballPosY >= getGameAreaRect.bottom) {
      ballPosY -= ballSpeedY;
    // console.log(pongball.style.top);
  }
}


// GAMELOOP
function gameLoop(){ 

    // boolean for at checke om spillet er igang eller paused
    movePlayers();
    moveBall();
    requestAnimationFrame(gameLoop);
}

window.addEventListener("keydown", (e) => {
    keyPressed[e.key] = true;
});
window.addEventListener("keyup", (e) => {
    keyPressed[e.key] = false;
});

requestAnimationFrame(gameLoop);