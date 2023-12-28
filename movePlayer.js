const player1 = document.getElementById("player1");
const button1 = document.getElementById("button1");
const gameWindow = document.getElementById("game-window");

const gameWindowRect = gameWindow.getBoundingClientRect();
let player1Y = player1.getBoundingClientRect().top;
let player1X = player1.getBoundingClientRect().left;

const keysPressed = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false
}
const playerBoundries = {
  top: false,
  bottom: false,
  left: false,
  right: false
}

// listen for keys state.
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);
button1.addEventListener("click", ()=>{
  if(button1.textContent === "pause"){
    button1.textContent = "resume"; // not playing
  } else {
    button1.textContent = "pause"; // playing
    movePlayer();
  }
})

function handleKeyDown(event){
  keysPressed[event.key] = true;
  // movePlayer();
}
function handleKeyUp(event){
  keysPressed[event.key] = false;
  // movePlayer();
}

function checkBoundries(){
  let player1Rect = player1.getBoundingClientRect();
  if(player1Rect.right >= gameWindowRect.right){
    playerBoundries.right = true;
  } else {
    playerBoundries.right = false;
  }
  if(player1Rect.left <= gameWindowRect.left){
    playerBoundries.left = true;
  } else {
    playerBoundries.left = false;
  }
  if(player1Rect.top <= gameWindowRect.top){
    playerBoundries.top = true;
  } else {
    playerBoundries.top = false;
  }
  if(player1Rect.bottom >= gameWindowRect.bottom){
    playerBoundries.bottom = true;
  } else {
    playerBoundries.bottom = false;
  }

}

movePlayer();
function movePlayer(){
  if(button1.textContent === "resume") {
    return;
  }

  const speed = 4;
  const diagonalSpeed = 1 / (2*speed);

  checkBoundries();
  
  if (keysPressed.ArrowUp && !playerBoundries.top) {
    player1Y -= speed;
  }
  if (keysPressed.ArrowDown && !playerBoundries.bottom) {
    player1Y += speed;
  }
  if (keysPressed.ArrowLeft && !playerBoundries.left) {
    player1X -= speed;
  }
  if (keysPressed.ArrowRight && !playerBoundries.right) {
    player1X += speed;
  }
  // // diagonal movement.
  // if (keysPressed.ArrowUp && keysPressed.ArrowLeft && !playerBoundries.top && !playerBoundries.left) {
  //   player1Y -= diagonalSpeed;
  //   player1X -= diagonalSpeed;
  // }
  // if (keysPressed.ArrowUp && keysPressed.ArrowRight && !playerBoundries.top && !playerBoundries.right) {
  //   player1Y -= diagonalSpeed;
  //   player1X += diagonalSpeed;
  // }
  // if (keysPressed.ArrowDown && keysPressed.ArrowLeft && !playerBoundries.bottom && !playerBoundries.left) {
  //   player1Y += diagonalSpeed;
  //   player1X -= diagonalSpeed;
  // }
  // if (keysPressed.ArrowDown && keysPressed.ArrowRight && !playerBoundries.bottom && !playerBoundries.right) {
  //   player1Y += diagonalSpeed;
  //   player1X += diagonalSpeed;
  // }

  // update position.
  player1.style.top = `${player1Y}px`;
  // player1.style.top = player1Y + "px";
  player1.style.left = `${player1X}px`;

  gravityFall();

  requestAnimationFrame(movePlayer);
}


// gravity.
function gravityFall(){
  if(playerBoundries.bottom){
    return;
  }
  player1Y += 0.4;
  player1.style.top = `${player1Y}px`;
}
