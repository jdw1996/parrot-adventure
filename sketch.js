let player;
let map;

function preload() {
  // TODO: Load images.
}

function setup() {
  canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  canvas.parent(CANVAS_NAME);

  frameRate(30);

  background(0);
  map = new Map(LAYOUT);
  player = new Player(map);
  frame = new Frame();
}

function draw() {
  map.draw();

  player.update();
  player.draw();

  frame.draw();
}
