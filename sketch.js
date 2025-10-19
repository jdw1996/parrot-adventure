const CANVAS_HEIGHT = 500;
const CANVAS_WIDTH = 1000;
const CANVAS_NAME = "gamecanvas";

const UNIT_LENGTH = 50;

const PLAYER_SPEED_DEFAULT = 10;

class Player {
  constructor() {
    this.posn = createVector(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    this.speed = PLAYER_SPEED_DEFAULT;
  }

  update() {
    this.processInput();
  }

  draw() {
    noStroke();
    fill("red");
    rect(this.posn.x, this.posn.y, UNIT_LENGTH, UNIT_LENGTH);
  }

  processInput() {
    if (keyIsDown(LEFT_ARROW)) {
      this.posn.add(createVector(-this.speed, 0));
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.posn.add(createVector(this.speed, 0));
    }
    if (keyIsDown(UP_ARROW)) {
      this.posn.add(createVector(0, -this.speed));
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.posn.add(createVector(0, this.speed));
    }
  }
}

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
