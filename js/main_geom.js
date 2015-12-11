var EXTRUDE = 0.72;
var X_FACTOR = 3;
var Y_FACTOR = 2;
var CAMERANGLE = 30;

var Point = function (x, y, z) {
  z = z || CAMERANGLE;
  this.x = x + (z * EXTRUDE);
  this.y = y - (z * EXTRUDE);
  this.z = z;
};

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function drawrect (x, y, w, h) {
  ctx.fillStyle = 'blue';
  ctx.rect(x, y, w, h);
  ctx.stroke();
}

function drawLine (a, b) {
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
}

function clear () {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  console.log(canvas.width, canvas.height);
}

function render () {
  clear();
  var pointA = new Point(100, 100);
  var pointB = new Point(pointA.x * X_FACTOR, pointA.y * Y_FACTOR);
  var pointC = new Point(pointB.x, pointA.y);
  var pointD = new Point(pointA.x, pointB.y);
  var pointAA = new Point(pointA.x, pointA.y);
  var pointCC = new Point(pointB.x, pointA.y, pointC.z * Y_FACTOR);
  var pointBB = new Point(pointB.x, pointB.y);

  var x = pointA.x;
  var y = pointA.y;
  var w = pointB.x - pointA.x;
  var h = pointB.y - pointA.y;

  drawLine(pointA, pointC);
  drawLine(pointC, pointB);
  drawLine(pointB, pointD);
  drawLine(pointD, pointA);
  drawLine(pointA, pointB);
  drawLine(pointC, pointD);

  drawLine(pointAA, pointCC);
  drawLine(pointA, pointAA);
  drawLine(pointC, pointCC);
  drawLine(pointCC, pointBB);
  drawLine(pointB, pointBB);

  drawLine(pointA, pointCC);
  drawLine(pointAA, pointC);
  drawLine(pointC, pointBB);
  drawLine(pointCC, pointB);
}

setInterval(function () {
  render();
}, 10);

setTimeout(function () {
// window.location.reload();
}, 1000);
