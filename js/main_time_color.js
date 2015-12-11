var hashids = new Hashids('this is my salt', 6, 'ABCDEF1234567890');
var hourColors = [];
for (var i = 0; i < 24; i++) {
  var colorHex = ('#' + hashids.encode(i));
  hourColors.push(colorHex);
}

function getColor (number) {
  return ('#' + hashids.encode(number));
}
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function fillRect (x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
  ctx.fill();
}

function render () {
  var time = new Date();
  var legendHeight = 30;
  var legendLeft = 0;
  var gutter = 10;
  // draw hours
  fillRect(0, 0, ((canvas.width - gutter) / 2),
    (canvas.height - (legendHeight + gutter)),
    getColor(time.getHours()));

  // draw minutes
  fillRect((((canvas.width - gutter) / 2) + gutter), 0,
    ((canvas.width - gutter) / 2),
    (canvas.height - (legendHeight + (gutter * 2))) / 2,
    getColor(time.getMinutes()));

  // draw seconds
  fillRect((((canvas.width - gutter) / 2) + gutter),
    ((canvas.height - (gutter * 2) + legendHeight) / 2) - (gutter * 2),
    ((canvas.width - (gutter * 4)) / 4),
    (canvas.height - (legendHeight + (gutter * 2))) / 2,
    getColor(time.getSeconds()));

  // draw milliseconds
  fillRect((((canvas.width - (gutter * 3)) / 4) * 3) + (gutter * 3),
    ((canvas.height - (gutter * 2) + legendHeight) / 2) - (gutter * 2),
    ((canvas.width - (gutter * 3)) / 4),
    (canvas.height - (legendHeight + (gutter * 2))) / 2,
    getColor(time.getMilliseconds()));

  var legendWidth = (canvas.width - ((hourColors.length - 1) * gutter)) / hourColors.length;
  var legendTop = canvas.height - legendHeight;

  for (var i = 0; i < hourColors.length; i++) {
    if (i >= 1) legendLeft = i * legendWidth + (i * gutter);
    fillRect(legendLeft, legendTop, legendWidth, legendHeight, hourColors[i]);
  }
}

setInterval(function () {
  render();
}, 10);
