// const player1 = document.getElementById("player1");
const button1 = document.getElementById("button1");
const gameWindow = document.getElementById("game-window");

const gameWindowRect = gameWindow.getBoundingClientRect();
// let player1Y = player1.getBoundingClientRect().top;
// let player1X = player1.getBoundingClientRect().left;


class Player {
  constructor(){
    this.div = document.getElementById("player1");
    this.boundries = {
      top: false,
      bottom: false,
      left: false,
      right: false
    }
  }

  // methods.
  getXPos(){
    return this.div.getBoundingClientRect().left;
  }
  getYPos(){
    return this.div.getBoundingClientRect().top;
  }

  incrementPos(dx,dy){
    let x = this.getXPos();
    let y = this.getYPos();
    this.div.style.left = `${x+dx}px`;
    this.div.style.top = `${y+dy}px`;
  }

  checkBoundries(){

  }
}

var player1 = new Player();

// console.log(player1.div);




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
// button1.addEventListener("click", ()=>{
//   if(button1.textContent === "pause"){
//     button1.textContent = "resume"; // not playing
//   } else {
//     button1.textContent = "pause"; // playing
//     movePlayer();
//   }
// })

function handleKeyDown(event){
  keysPressed[event.key] = true;
  // movePlayer();
}
function handleKeyUp(event){
  keysPressed[event.key] = false;
  // movePlayer();
}

// function checkBoundries(){
//   let player1Rect = player1.getBoundingClientRect();
//   if(player1Rect.right >= gameWindowRect.right){
//     playerBoundries.right = true;
//   } else {
//     playerBoundries.right = false;
//   }
//   if(player1Rect.left <= gameWindowRect.left){
//     playerBoundries.left = true;
//   } else {
//     playerBoundries.left = false;
//   }
//   if(player1Rect.top <= gameWindowRect.top){
//     playerBoundries.top = true;
//   } else {
//     playerBoundries.top = false;
//   }
//   if(player1Rect.bottom >= gameWindowRect.bottom){
//     playerBoundries.bottom = true;
//   } else {
//     playerBoundries.bottom = false;
//   }
// }

movePlayer(player1);
function movePlayer(_player){
  // if(button1.textContent === "resume") {
  //   return;
  // }

  const speed = 4;

  // checkBoundries();
  
  if (keysPressed.ArrowUp && !playerBoundries.top) {
    _player.incrementPos(0,-speed);
  }
  if (keysPressed.ArrowDown && !playerBoundries.bottom) {
    _player.incrementPos(0,speed);
  }
  if (keysPressed.ArrowLeft && !playerBoundries.left) {
    _player.incrementPos(-speed,0);
  }
  if (keysPressed.ArrowRight && !playerBoundries.right) {
    _player.incrementPos(speed,0);
  }

  requestAnimationFrame(() => {
    movePlayer(_player);
  });
  
}


// // gravity.
// function gravityFall(){
//   if(playerBoundries.bottom){
//     return;
//   }
//   player1Y += 0.4;
//   player1.style.top = `${player1Y}px`;
// }
