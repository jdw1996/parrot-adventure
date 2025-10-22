class Player {
  constructor() {
    this.posn = createVector(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    this.speed = PLAYER_SPEED_DEFAULT;
    this.velocity = createVector(0, 0);
    this.isJumping = true;
    this.energy = PLAYER_TOTAL_ENERGY;
    this.addInputListeners();
  }

  update() {
    // Apply gravity.
    this.velocity.y += GRAVITY;
    // Apply player movement and gravity.
    this.posn.add(this.velocity);
    // Don't let the player go out of bounds.
    this.resolveCollisions();
  }

  draw() {
    noStroke();
    fill("red");
    rect(this.posn.x, this.posn.y, PLAYER_SIZE, PLAYER_SIZE);
  }

  moveLeft() {
    this.velocity.x = -this.speed;
  }

  moveRight() {
    this.velocity.x = this.speed;
  }

  stopMoving() {
    this.velocity.x = 0;
  }

  isMovingLeft() {
    return this.velocity.x < 0;
  }

  isMovingRight() {
    return this.velocity.x > 0;
  }

  flap() {
    if (this.energy === 0) {
      return;
    }
    this.isJumping = true;
    this.velocity.y = -PLAYER_JUMP_BOOST;
    this.energy -= 1;
  }

  resolveCollisions() {
    if (this.posn.y > CANVAS_HEIGHT - PLAYER_SIZE) {
      this.posn.y = CANVAS_HEIGHT - PLAYER_SIZE;
      this.velocity.y = 0;
      this.isJumping = false;
      this.energy = PLAYER_TOTAL_ENERGY;
    }
    if (this.posn.y < 0) {
      this.posn.y = 0;
      this.velocity.y = 0;
    }
  }

  addInputListeners() {
    addEventListener("keyup", (event) => {
      if (event.key === "ArrowUp" || event.key === " ") {
        this.flap();
      }
      if (event.key === "ArrowRight" && this.isMovingRight()) {
        this.stopMoving();
      }
      if (event.key === "ArrowLeft" && this.isMovingLeft()) {
        this.stopMoving();
      }
    });
    addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        this.moveLeft();
      }
      if (event.key === "ArrowRight") {
        this.moveRight();
      }
    });
  }
}
