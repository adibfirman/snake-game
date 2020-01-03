const canvas = document.querySelector("canvas");
const w = Math.floor(window.innerWidth / 1.1);
const h = Math.floor(window.innerHeight / 1.1);

canvas.width = w;
canvas.height = h;

const c = canvas.getContext("2d");
const primaryColor = "#6B6B11";
const baitWidth = 4;

c.fillStyle = primaryColor;

/** Draw bait */
drawBait();
function drawBait() {
  c.beginPath();
  c.arc(100 + baitWidth, 100 + baitWidth, baitWidth, Math.PI * 2, false);
  c.strokeStyle = primaryColor;
  c.fill();
  c.stroke();
}

/** Draw the snake */
const $snakes = new rxjs.BehaviorSubject([{ x: 100, y: 200 }]);
const valSnakes = $snakes.getValue();
const defaultLong = 5;

/** create default snakes */
for (let i = 0; i < defaultLong; i++) {
  const data = valSnakes[i];
  const x = data.x + 10;
  const y = data.y;

  valSnakes.push({ x, y });
  $snakes.next(valSnakes);
}

/** adding move to right */
const $moveToLeft = new rxjs.BehaviorSubject(false);
$moveToLeft.subscribe(status => {
  (function autoMove() {
    return setInterval(() => {
      const copyData = [...valSnakes];
      const lastData = copyData[copyData.length - 1];

      for (let i = 0; i < copyData.length; i++) {
        if (!status) copyData[i].x += 10;
        else copyData[i].x -= 10;
      }

      if (copyData[0].x < 0) clearInterval(autoMove);
      else if (lastData.x + 10 > w) clearInterval(autoMove);
      else {
        c.clearRect(0, 0, w, h);
        drawBait();

        $snakes.next(copyData);
      }
    }, 1000);
  })();
});

/** subs to draw a snake  */
$snakes.subscribe(snakes => {
  console.log(snakes);
  for (let i = 0; i < snakes.length; i++) {
    const data = snakes[i];

    c.beginPath();
    c.fillRect(data.x, data.y, 16, 20);
    c.stroke();
  }
});

/** adding keyboard event */
window.addEventListener("keyup", e => {
  if (e.keyCode === 37) $moveToLeft.next(true);
  else if (e.keyCode === 39) $moveToLeft.next(false);
});
