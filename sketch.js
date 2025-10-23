let player;
let map;

function preload() {
  // TODO: Load images.
}

function setup() {
  canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  canvas.parent(CANVAS_NAME);

  background(0);
  map = new Map(LAYOUT);
  player = new Player(map);
}

function draw() {
  background("skyblue");

  map.draw();

  player.update();
  player.draw();
}
