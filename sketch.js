function preload() {
  // TODO: Load images.
}

function setup() {
  canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  canvas.parent(CANVAS_NAME);
  background(0);
  player = new Player();
}

function draw() {
  background("skyblue");
  player.update();
  player.draw();
}
