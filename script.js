/************************Constants and Variables********************************/
//As page loads i.e.the game starts snake should be stationary and only move when we press any arrow key
const board = document.getElementById("board");
let inputDir = { x: 0, y: 0 };
const speed = 10;
let previousFrameTime = 0;
let snakeArr = [{ x: 15, y: 14 }];
let food = { x: 3, y: 7 };
const points = document.getElementsByTagName("h3")[0];
const maxpoints = document.getElementsByTagName("h2")[0];
let score = 0;
let hiscoreval;

/************Creating a loop to paint screen after 30 seconds******************/
//This loop is exactly the same as setInterval only difference is that animation rendering is better
function main(currentTime) {
  window.requestAnimationFrame(main);
  if ((currentTime - previousFrameTime) / 1000 <= 1 / speed) {
    return;
  } else {
    previousFrameTime = currentTime;
    gameEngine();
  }
}

function isCollide(snake) {
  if (
    snake[0].x == 1 ||
    snake[0].y === 1 ||
    snake[0].x === 18 ||
    snake[0].y === 18
  ) {
    return true;
  }
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      return true;
    }
  }
  return false;
}

function gameEngine() {
  if (isCollide(snakeArr)) {
    snakeArr = [{ x: 15, y: 14 }];
    inputDir = { x: 0, y: 0 };
    food = { x: 3, y: 7 };
    score = 0;
    points.innerText = `Score:${score}`;
  }

  //If snake has eaten the food

  if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    score++;
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      maxpoints.innerText = `Hi Score:${hiscoreval}`;
    }

    points.innerText = `Score:${score}`;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  //Part 2 :- Displaying Snake and food
  board.innerHTML = "";
  snakeArr.forEach((e, i) => {
    let snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (i == 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snakeBody");
    }
    board.appendChild(snakeElement);
  });

  let foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}
/************************Main Logic Starts Here*********************************/
let hiscore = localStorage.getItem("hiscore");

if (hiscore == null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  maxpoints.innerText = `Hi Score:${hiscoreval}`;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; //When user press any key game will start
  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;

      break;
    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;

      break;
    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;

      break;
    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;

      break;
    default:
      break;
  }
});

/*****************Adding buttons for mobile phones*******************/
let buttons = document.getElementsByClassName("arrow");
buttons = Array.from(buttons);

buttons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    if (index === 0) {
      inputDir.x = 0;
      inputDir.y = -1;
    } else if (index === 1) {
      inputDir.x = -1;
      inputDir.y = 0;
    } else if (index === 2) {
      inputDir.x = 1;
      inputDir.y = 0;
    } else if (index === 3) {
      inputDir.x = 0;
      inputDir.y = 1;
    }
  });
});
