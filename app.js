const canvas = document.querySelector("canvas");
const w = Math.floor(window.innerWidth / 2.5);
const h = Math.floor(window.innerHeight / 4);

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

    this.update()
  }

  update() {
    if (this.x < 0) this.x = w;
    else if (this.x > w) this.x = 0;
  }

  moveRight() {
    this.x += this.velocity.x
  }

  moveLeft() {
    this.x -= this.velocity.x
  }
}

const snakes = [];
(function init() {
  const defaultLong = 10;
  const gap = 10;
  const wSnake = 16;
  const hSnake = 20;
  let x = w / 2;
  let y = h / 2;

  for (let i = 0; i < defaultLong; i++) {
    if (i !== 0) x += gap;

    snakes.push(new Snake(x, y, wSnake, hSnake));
  }
})();

(function animate() {
  let intervalAnimate = setInterval(() => {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, w, h);

    clearInterval(intervalAnimate)
  }, 1000);

  drawBait(w / 1.2, h / 1.2);
  snakes.forEach(snake => {
    snake.draw();
    snake.moveRight()
  });
})();
