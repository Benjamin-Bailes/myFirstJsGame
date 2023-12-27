const player1 = document.getElementById("player1");

let player1Y = player1.getBoundingClientRect().top;
let player1X = player1.getBoundingClientRect().left;

// while(1){
//   player1Y -= 1;
//   player1.style.top = `${player1Y}px`;
// }

// while (player1Y>200) {
//     player1Y += 10;
//     player1.style.top = `${player1Y}px`;
//     setTimeout(function() {
//       console.log('Delayed message');
//    }, 2000);
// }

const keysPressed = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false
}
// listen for keys state.
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

function handleKeyDown(event){
  keysPressed[event.key] = true;
  movePlayer();
}
function handleKeyUp(event){
  keysPressed[event.key] = false;
  movePlayer();
}

function movePlayer(dx, dy){
  const speed = 20;
  const diagonalSpeed = 1 / (2 * speed);

  if (keysPressed.ArrowUp) {
    player1Y -= speed;
  }
  if (keysPressed.ArrowDown) {
    player1Y += speed;
  }
  if (keysPressed.ArrowLeft) {
    player1X -= speed;
  }
  if (keysPressed.ArrowRight) {
    player1X += speed;
  }

  // diagonal movement.
  if (keysPressed.ArrowUp && keysPressed.ArrowLeft) {
    player1Y -= diagonalSpeed;
    player1X -= diagonalSpeed;
  }
  if (keysPressed.ArrowUp && keysPressed.ArrowRight) {
    player1Y -= diagonalSpeed;
    player1X += diagonalSpeed;
  }
  if (keysPressed.ArrowDown && keysPressed.ArrowLeft) {
    player1Y += diagonalSpeed;
    player1X -= diagonalSpeed;
  }
  if (keysPressed.ArrowDown && keysPressed.ArrowRight) {
    player1Y += diagonalSpeed;
    player1X += diagonalSpeed;
  }
  // update movement.
  player1.style.top = `${player1Y}px`;
  player1.style.left = `${player1X}px`;
}

// gravity.
function gravityFall(){
  player1Y += 1;
  player1.style.top = `${player1Y}px`;
  requestAnimationFrame(gravityFall);
}
gravityFall();
