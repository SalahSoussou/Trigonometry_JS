let theta = Math.PI / 4;

const cnv = document.getElementById("cnv"),
  cnv2 = document.getElementById("cnv2"),
  ctx = cnv.getContext("2d"),
  ctx2 = cnv2.getContext("2d"),
  c = 100,
  A = { x: 0, y: 0, text: "A" },
  B = { x: Math.cos(theta) * c, y: Math.sin(theta) * c, text: "B" },
  C = { x: B.x, y: 0, text: "C" };

cnv.width = 500;
cnv.height = 500;

cnv2.width = 500;
cnv2.height = 150;

const offset = { x: cnv.width / 2, y: cnv.height / 2 };
const chartOffset = { x: cnv2.width / 2, y: cnv2.height / 2 };
ctx.translate(offset.x, offset.y);
ctx2.translate(chartOffset.x, chartOffset.y);

drawCoodinate(ctx2, chartOffset);

// document.addEventListener("mousemove", (e) => {
//   B.x = e.x - offset.x;
//   B.y = e.y - offset.y;
//   C.x = B.x;
//   update();
// });
document.onwheel = (e) => {
  theta -= toRad(Math.sign(e.deltaY));
  B.x = Math.cos(theta) * c;
  B.y = Math.sin(theta) * c;
  C.x = B.x;
  update();
};
document.addEventListener("click", (e) => {
  C.x = e.x - offset.x;
  C.y = e.y - offset.y;

  update();
});

function drawCoodinate(ctx, offset) {
  ctx.beginPath();
  ctx.moveTo(-offset.x, 0);
  ctx.lineTo(offset.x, 0);
  ctx.moveTo(0, -offset.y);
  ctx.lineTo(0, offset.y);
  ctx.setLineDash([4, 2]);
  ctx.strokeStyle = "gray";
  ctx.lineWidth = 2;

  ctx.stroke();
  ctx.setLineDash([]);
}
function drawText(point, text, avrege, color = "white") {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "bold 13px Courier";
  ctx.strokeStyle = "aquamarine";
  ctx.lineWidth = 7;
  ctx.strokeText(
    text ? text : point.text,
    avrege ? avrege.x : point.x,
    avrege ? avrege.y : point.y
  );
  ctx.fillText(
    text ? text : point.text,
    avrege ? avrege.x : point.x,
    avrege ? avrege.y : point.y
  );
  //   ctx.fillStyle = "black";
}

function drawLine(point1, point2, color = "black") {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.moveTo(point2.x, point2.y);
  ctx.lineTo(point1.x, point1.y);

  ctx.stroke();
}

function avrege(p1, p2) {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  };
}

function distance(p1, p2) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

function toDeg(rad) {
  return (rad * 180) / Math.PI;
}
function toRad(deg) {
  return (deg * Math.PI) / 180;
}
function darwPoint(point, ctx, size, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(point.x, point.y, size / 2, 0, Math.PI * 2);
  ctx.fill();
}
update();
function update() {
  const c = distance(A, B),
    b = distance(A, C),
    a = distance(B, C);
  const sin = Math.sin(theta),
    cos = Math.cos(theta),
    tan = Math.tan(theta); // or a/b
  // theta = Math.asin(sin);
  const T = { x: Math.sign(cos) * Math.hypot(1, tan) * c, y: 0 };
  ctx.clearRect(-offset.x, -offset.y, cnv.width, cnv.height);
  drawCoodinate(ctx, offset);

  drawLine(A, B);
  drawText("", "c", avrege(A, B), "black");
  drawLine(A, C, "blue");
  drawText("", "b", avrege(A, C), "blue");

  drawLine(B, C, "red");
  drawText("", "a", avrege(B, C), "red");
  drawLine(B, T, "magenta");
  drawText("", "tan", avrege(B, T), "magenta");

  drawText(A, "0", 0, "black");

  // theta coordonent

  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  // const start = B.x > A.x ? 0 : Math.PI,
  //   clockwise = (B.y < C.y) ^ (B.x > A.x);
  // let end = B.y < C.y ? -theta : theta;
  // if (B.x < A.x) {
  //   end = Math.PI - end;
  // }
  // ctx.arc(0, 0, 15, start, end, !clockwise);
  ctx.arc(0, 0, c, 0, theta, theta < 0);
  ctx.stroke();

  //   darwPoint(A, ctx);
  //   darwPoint(B, ctx);
  // darwPoint(C, ctx);

  drawText("", "c:  1", { x: -offset.x + 50, y: -offset.y + 50 }, "black");
  drawText(
    "",
    "b:" + (b / 100).toFixed(2).toString().padStart(3, " "),
    { x: -offset.x + 50, y: -offset.y + 80 },
    "black"
  );
  drawText(
    "",
    "a:" + (a / 100).toFixed(2).toString().padStart(3, " "),
    { x: -offset.x + 50, y: -offset.y + 110 },
    "black"
  );
  // draw sine 0
  drawText(
    "",
    "sin0 = a/c = " + sin.toFixed(3),
    { x: -offset.x / 2, y: offset.y * 0.7 },
    "red"
  );
  drawText(
    "",
    `0 = ${theta.toFixed(3)}  (${Math.round(toDeg(theta))
      .toString()
      .padStart(2, " ")}°)`,
    { x: offset.x / 2, y: offset.y * 0.7 },
    "black"
  );
  // draw cos 0
  drawText(
    "",
    "cos0 = b/c = " + cos.toFixed(3),
    { x: -offset.x / 2, y: offset.y * 0.8 },
    "blue"
  );

  drawText(
    "",
    "tan0 = a/b = " + tan.toFixed(3),
    { x: -offset.x / 2, y: offset.y * 0.9 },
    "magenta"
  );
  // ================== cnv2
  const chartScaler = chartOffset.y * 0.5;
  darwPoint({ x: theta * chartScaler, y: sin * chartScaler }, ctx2, 2, "red");
  darwPoint({ x: theta * chartScaler, y: cos * chartScaler }, ctx2, 2, "blue");
  darwPoint(
    { x: theta * chartScaler, y: tan * chartScaler },
    ctx2,
    2,
    "magenta"
  );
}
