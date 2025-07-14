let slider;
let colorPicker;
let N = 100;
let p = [],
  v = [];
let row, col;
let off = 0.01;
let cnv;
let fireflyColors = [
  [6, 167, 25],    // default green
  [255, 255, 102], // yellow
  [255, 255, 0],   // bright yellow
  [0, 255, 128],   // teal-green
  [0, 255, 255],   // cyan
  [255, 153, 51],  // orange
  [255, 51, 153],  // pink
  [102, 255, 102], // light green
];
let currentColor = fireflyColors[0];
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(50);
  cnv = createGraphics(width, height);
  for (let i = 0; i < N; i++) {
    p[i] = createVector(random(width), random(height));
  }
  slider = createSlider(50, 500, 100, 10)
    .position(10, 10)
    .input(() => {
      N = slider.value();
      if (N > p.length) {
        for (let i = p.length; i < N; i++) {
          p[i] = createVector(random(width), random(height));
        }
      } else {
        for (let i = p.length - 1; i > N - 1; i--) {
          p.pop();
        }
      }
    });
  let pickerY = slider.y + slider.height + 10;
  colorPicker = [];
  for (let i = 0; i < fireflyColors.length; i++) {
    let c = fireflyColors[i];
    let btn = createButton('')
      .style('background-color', `rgb(${c[0]},${c[1]},${c[2]})`)
      .style('width', '30px')
      .style('height', '30px')
      .style('border', i === 0 ? '2px solid #fff' : '1px solid #333')
      .position(10 + i * 35, pickerY)
      .mousePressed(() => {
        currentColor = c;
        colorPicker.forEach((b, j) => b.style('border', j === i ? '2px solid #fff' : '1px solid #333'));
      });
    colorPicker.push(btn);
  }
}
function draw() {
  background(30);
  noStroke();
  fill(255);
  textAlign(LEFT, CENTER);
  textSize(20);
  text(N, slider.width + 20, 25);
  let x = 0.01;
  for (let i = 0; i < N; i++) {
    col = (p[i].x / N) * 0.001;
    row = (p[i].y / N) * 0.001;
    let a = noise(col, row, off + x / 1) * TWO_PI * 5;
    let d = p5.Vector.fromAngle(a);
    if (p[i].x > width) p[i].x = 1;
    if (p[i].y > height) p[i].y = 1;
    if (p[i].x < 0) p[i].x = width;
    if (p[i].y < 0) p[i].y = height;
    p[i].add(d);

    stroke(currentColor[0], currentColor[1], currentColor[2], abs(sin(off * 100 + x * 10) * 255));
    strokeWeight(ceil(500 / N) + 2);
    point(p[i].x, p[i].y);

    x += 0.1;
  }
  off += 0.001;
  cnv.noStroke();
  cnv.fill(200);
  cnv.textSize(25);
  cnv.textAlign(CENTER, CENTER);
  cnv.textStyle(BOLD);
  cnv.text("Firefly Flow Feild", width / 2, 25);
  image(cnv, 0, 0, width, height);
}
