const CANVAS_HEIGHT = 750;
const CANVAS_WIDTH = 1200;
const CANVAS_NAME = "gamecanvas";

const UNIT_LENGTH = 50;
const GRAVITY = 2;

const PLAYER_SIZE = UNIT_LENGTH;
const PLAYER_SPEED_DEFAULT = 10;
const PLAYER_JUMP_BOOST = 25;

class Player {
  constructor() {
    this.posn = createVector(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    this.speed = PLAYER_SPEED_DEFAULT;
    this.velocity = createVector(0, 0);
    this.isJumping = true;
  }

  update() {
    this.processInput();
    // Apply gravity.
    this.velocity.y += GRAVITY;
    // Apply player movement and gravity.
    this.posn.add(this.velocity);
    // Don't let the player go out of bounds.
    if (this.posn.y > CANVAS_HEIGHT - PLAYER_SIZE) {
      this.posn.y = CANVAS_HEIGHT - PLAYER_SIZE;
      this.velocity.y = 0;
      this.isJumping = false;
    }
    if (this.posn.y < 0) {
      this.posn.y = 0;
      this.velocity.y = 0;
    }
  }

  draw() {
    noStroke();
    fill("red");
    rect(this.posn.x, this.posn.y, PLAYER_SIZE, PLAYER_SIZE);
  }

  processInput() {
    if (keyIsDown(RIGHT_ARROW)) {
      this.velocity.x = this.speed;
    } else if (keyIsDown(LEFT_ARROW)) {
      this.velocity.x = -this.speed;
    } else {
      this.velocity.x = 0;
    }
  }

  flap() {
    this.isJumping = true;
    this.velocity.y = -PLAYER_JUMP_BOOST;
  }
}

addEventListener("keyup", (event) => {
  if (event.key === "ArrowUp") {
    player.flap();
  }
});

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
