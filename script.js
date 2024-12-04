const player1 = document.querySelector("#player1");
const player2 = document.querySelector("#player2");
const gameArea = document.querySelector("#gameArea");
const gameHeader = document.querySelector("#gameHeader");
const pongball = document.querySelector("#pongBall")
let getGameAreaRect = gameArea.getBoundingClientRect();
let getPongBallRect = pongball.getBoundingClientRect();
let getPlayer1Rect = player1.getBoundingClientRect();
let getPlayer2Rect = player2.getBoundingClientRect();

let gamePaused = false;

// PLAYER 
const keyPressed = {}; 
let player1Y = 200;
let player2Y = 200;


function movePlayers() {


  let getPosPlayer1 = getPlayer1Rect.top - getGameAreaRect.top;
  let getPosPlayer2 = getPlayer2Rect.top - getGameAreaRect.top;
  let insideBorderBottom = getGameAreaRect.bottom-10;
  let moveSpeed = 10;
  
  if (keyPressed["w"] && getPosPlayer1 > 0) {
        player1Y = player1Y -= moveSpeed;
  }
  if (keyPressed["s"]) {
    if (getPlayer1Rect.height + player1Y > insideBorderBottom) {
      player1Y = insideBorderBottom - getPlayer1Rect.height;
    } else {
      player1Y += moveSpeed;
    }
  } 

  if(keyPressed["ArrowUp"] && getPosPlayer2 > 0){
    player2Y = player2Y -= moveSpeed;
  }
  if(keyPressed["ArrowDown"]){
    if (getPlayer2Rect.height + player2Y > insideBorderBottom) {
      player2Y = insideBorderBottom - getPlayer2Rect.height;
    } else {
      player2Y += moveSpeed;
    }
  }
  player1.style.top = player1Y + "px";
  player2.style.top = player2Y + "px";
} 


// BALL 
let ballSpeedY = 5;
let ballSpeedX = 5;
let ballPosY = getGameAreaRect.height/2;
let ballPosX = getGameAreaRect.width/2;

function moveBall(){
  getGameAreaRect = gameArea.getBoundingClientRect();
  getPlayer1Rect = player1.getBoundingClientRect();
  getPlayer2Rect = player2.getBoundingClientRect();
  ballPosY += ballSpeedY
  ballPosX += ballSpeedX;
  
  pongball.style.top = ballPosY + "px";
  pongball.style.left = ballPosX + "px";
  // console.log("Game Area: "+ getGameAreaRect.bottom);
  // console.log("ball "+ ballPosY);
  if (ballPosY <= (getGameAreaRect.top+10)) {
    ballSpeedY = -ballSpeedY;
  }
    if (ballPosY + getPongBallRect.height >= (getGameAreaRect.bottom-10)) {
      ballSpeedY = -ballSpeedY; 
  }
  if (ballPosX === getPlayer1Rect.right || ballPosX + getPongBallRect.width >= getGameAreaRect.right) {
      ballSpeedX = -ballSpeedX; 
  }
  if (ballPosX + getPongBallRect.width >= getPlayer2Rect.left && ballPosY >= getPlayer2Rect.top && ballPosY <= getPlayer2Rect.bottom) {
    ballSpeedX = -ballSpeedX; 
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