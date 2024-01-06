const pausePlay = document.getElementById("pause-play");

const gameWindow = document.getElementById("game-window");
const gameWindowRect = gameWindow.getBoundingClientRect();

class Player {
  constructor(_playerId){
    this.playerId = _playerId;
    this.div = document.getElementById(_playerId);
    this.speed = 4;
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
    let playerRect = this.div.getBoundingClientRect();
      if(playerRect.right >= gameWindowRect.right){
        this.boundries.right = true;
      } else {
        this.boundries.right = false;
      }
      if(playerRect.left <= gameWindowRect.left){
        this.boundries.left = true;
      } else {
        this.boundries.left = false;
      }
      if(playerRect.top <= gameWindowRect.top){
        this.boundries.top = true;
      } else {
        this.boundries.top = false;
      }
      if(playerRect.bottom >= gameWindowRect.bottom){
        this.boundries.bottom = true;
      } else {
        this.boundries.bottom = false;
      }
  }

  movePlayer(_keysPressed){
    if(pausePlay.textContent === "resume") {
      return;
    }
  
    this.checkBoundries();
    
    if (_keysPressed.up && !this.boundries.top) {
      this.incrementPos(0,-this.speed);
    }
    if (_keysPressed.down && !this.boundries.bottom) {
      this.incrementPos(0,this.speed);
    }
    if (_keysPressed.left && !this.boundries.left) {
      this.incrementPos(-this.speed,0);
    }
    if (_keysPressed.right && !this.boundries.right) {
      this.incrementPos(this.speed,0);
    }

    this.gravityFall();
    
    // arrow function creating closure for arrows pressed.
    requestAnimationFrame(() => {
      this.movePlayer(_keysPressed)
    });
    
  }

  gravityFall(){
    this.checkBoundries();
    if(this.boundries.bottom){
      return;
    }
    this.incrementPos(0,0.4);
  }
}

const keysPressed = {
  player1 : { up : false, down : false, left : false, right : false }, 
  player2 : { up : false, down : false, left : false, right : false }
};

// listen for keys state.
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);
pausePlay.addEventListener("click", ()=>{
  if(pausePlay.textContent === "pause"){
    pausePlay.textContent = "resume"; // not playing
  } else {
    pausePlay.textContent = "pause"; // playing
    player1.movePlayer(keysPressed.player1);
    player2.movePlayer(keysPressed.player2);
  }
})


function handleKeyDown(event){
  let foo = true;
  switch (event.key){
    case 'ArrowUp':
      keysPressed.player1.up = foo;
      break;
    case 'ArrowDown':
      keysPressed.player1.down = foo;
      break;
    case 'ArrowLeft':
      keysPressed.player1.left = foo;
      break;
    case 'ArrowRight':
      keysPressed.player1.right = foo;
      break;
    case 'w':
      keysPressed.player2.up = foo;
      break;
    case 's':
      keysPressed.player2.down = foo;
      break;
    case 'a':
      keysPressed.player2.left = foo;
      break;
    case 'd':
      keysPressed.player2.right = foo;
      break;
  }
  // keysPressed.player1[event.key] = true;
}
function handleKeyUp(event){
  let foo = false;
  switch (event.key){
    case 'ArrowUp':
      keysPressed.player1.up = foo;
      break;
    case 'ArrowDown':
      keysPressed.player1.down = foo;
      break;
    case 'ArrowLeft':
      keysPressed.player1.left = foo;
      break;
    case 'ArrowRight':
      keysPressed.player1.right = foo;
      break;
    case 'w':
      keysPressed.player2.up = foo;
      break;
    case 's':
      keysPressed.player2.down = foo;
      break;
    case 'a':
      keysPressed.player2.left = foo;
      break;
    case 'd':
      keysPressed.player2.right = foo;
      break;
  }
}


const player1 = new Player("player1");
const player2 = new Player("player2");

player1.movePlayer(keysPressed.player1);
player2.movePlayer(keysPressed.player2);




