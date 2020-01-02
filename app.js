const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth / 1.1;
canvas.height = window.innerHeight / 1.1;

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
for (let i = 0; i < 2; i++) {
  c.beginPath();
  c.fillRect(110, 95, 20, 20);
  c.stroke();
}
