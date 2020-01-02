const canvas = document.querySelector("canvas");
const w = window.innerWidth / 1.1;
const h = window.innerHeight / 1.1;

canvas.width = w;
canvas.height = h;

const c = canvas.getContext("2d");
const primaryColor = "#6B6B11";
const baitWidth = 4;

c.fillStyle = primaryColor;

/** Draw bait */
c.beginPath();
c.arc(100 + baitWidth, 100 + baitWidth, baitWidth, Math.PI * 2, false);
c.strokeStyle = primaryColor;
c.fill();
c.stroke();

/** Draw the snake */
const snakes = [{ x: 200, y: 200 }];
const defaultLong = 5;
for (let i = 1; i <= defaultLong; i++) {
  const data = snakes[i - 1];

  snakes.push({
    x: data.x + 10,
    y: data.y
  });

  c.beginPath();
  c.fillRect(data.x, data.y, 16, 20);
  c.stroke();
}
