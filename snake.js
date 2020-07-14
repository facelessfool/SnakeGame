const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");

const box = 32;

//images

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// //snake

var snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

// //food

var food = {
  x: Math.floor(Math.random() * 16 + 2) * box,
  y: Math.floor(Math.random() * 14 + 4) * box,
};

// //score
var score = 0;

//arrow keys
var d;

document.addEventListener("keydown", direction);
function direction(event) {
  if (event.keyCode == 37 && d != "right") {
    d = "left";
  } else if (event.keyCode == 38 && d != "down") {
    d = "up";
  } else if (event.keyCode == 39 && d != "left") {
    d = "right";
  } else if (event.keyCode == 40 && d != "up") {
    d = "down";
  }
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}

function draw() {
  ctx.drawImage(ground, 0, 0);
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "white" : "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }
  ctx.drawImage(foodImg, food.x, food.y);
  //old head
  var snakeX = snake[0].x;
  var snakeY = snake[0].y;

  if (d == "left") snakeX -= box;
  if (d == "up") snakeY -= box;
  if (d == "right") snakeX += box;
  if (d == "down") snakeY += box;

  if (snakeX == food.x && snakeY == food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 16 + 2) * box,
      y: Math.floor(Math.random() * 14 + 4) * box,
    };
  } else {
    snake.pop();
  }

  //game over

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  if (
    snakeX < box ||
    snakeX > 17 * box ||
    snakeY < 3 * box ||
    snakeY > 17 * box ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
  }
  snake.unshift(newHead);

  ctx.fillStyle = "white";
  ctx.font = "45px Changa one";
  ctx.fillText(score, 2 * box, 1.6 * box);
}

let game = setInterval(draw, 100);
