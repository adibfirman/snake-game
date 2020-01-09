const canvas = document.querySelector("canvas");
const w = Math.floor(window.innerWidth / 3);
const h = Math.floor(window.innerHeight / 3.5);

canvas.width = w;
canvas.height = h;

window.addEventListener("resize", () => {
  canvas.width = w;
  canvas.height = h;
});

const c = canvas.getContext("2d");
const primaryColor = "#6B6B11";

c.fillStyle = primaryColor;

/** Draw bait */
function drawBait(x, y) {
  const r = 4;

  c.beginPath();
  c.arc(x + r, y + r, 4, Math.PI * 2, false);
  c.strokeStyle = primaryColor;
  c.fill();
  c.stroke();
}

/** random number given range */
function randomIntNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class Snake {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.velocity = {
      x: 10,
      y: 10
    };
  }

  draw() {
    c.beginPath();
    c.fillRect(this.x, this.y, this.w, this.h);
    c.stroke();
    c.closePath();
  }

  moveLeft() {
    this.x += this.velocity.x;
  }
}

const defaultLong = 5;
const gap = 10;
const snakes = [];
(function init() {
  const wSnake = 16;
  const hSnake = 20;
  let x = randomIntNum(wSnake, w);
  let y = randomIntNum(hSnake, h);
  for (let i = 0; i < defaultLong; i++) {
    if (i !== 0) x += gap;

    snakes.push(new Snake(x, y, wSnake, hSnake));
  }
})();

setInterval(() => {
  snakes.forEach(snake => snake.moveLeft());
}, 1000);

(function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, w, h);

  drawBait(100, 100);
  snakes.forEach(snake => {
    snake.draw();

    if (snake.x > w) snake.x = 0;
    if (snake.x < 0) snake.x = w;
    if (snake.y > h) snake.y = 0;
    if (snake.y < 0) snake.y = h;
  });
})();
