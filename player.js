class Player {
  constructor(map) {
    this.map = map;
    this.posn = createVector(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    this.speed = PLAYER_SPEED_DEFAULT;
    this.velocity = createVector(0, 0);
    this.energy = PLAYER_TOTAL_ENERGY;
    this.addInputListeners();
  }

  update() {
    // Apply gravity.
    this.applyGravity();
    // Apply velocity and resolve collisions.
    this.applyVelocity();
  }

  draw() {
    noStroke();
    fill("crimson");
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
    this.velocity.y = -PLAYER_JUMP_BOOST;
    this.energy -= 1;
  }

  applyGravity() {
    // Gravity always applies, not just when jumping. Otherwise player can't
    // fall off ledges.
    this.velocity.y += GRAVITY;
  }

  applyVelocity() {
    // Clamp to top speed.
    this.velocity.x = Math.min(this.velocity.x, PLAYER_SPEED_MAX);
    this.velocity.y = Math.min(this.velocity.y, PLAYER_SPEED_MAX);

    // this.posn is still used for some calculations, so we create a separate
    // position newPosn which will be assigned to this.posn in the end.
    const newPosn = createVector(this.posn.x, this.posn.y);
    newPosn.add(this.velocity);

    // For each corner, compare the heading of velocity to the heading from
    // player corner to obstacle corner. This determines whether newPosn needs
    // to be pushed in the x direction or y direction.
    // When calling getBlock, we adjust by one pixel to allow for smooth
    // movement over flat surfaces.

    // top-left corner
    const nwBlock = this.map.getBlock(newPosn.x + 1, newPosn.y + 1);
    if (nwBlock?.isSolid()) {
      const nwVectorToCorner = createVector(
        nwBlock.posn.x + UNIT_LENGTH - this.posn.x,
        nwBlock.posn.y + UNIT_LENGTH - this.posn.y
      );

      if (this.velocity.heading() < nwVectorToCorner.heading()) {
        this.velocity.y = 0;
        newPosn.y = nwBlock.posn.y + UNIT_LENGTH;
      } else {
        newPosn.x = nwBlock.posn.x + UNIT_LENGTH;
      }
    }
    // top-right corner
    const neBlock = this.map.getBlock(
      newPosn.x + PLAYER_SIZE - 1,
      newPosn.y + 1
    );
    if (neBlock?.isSolid()) {
      const neVectorToCorner = createVector(
        neBlock.posn.x - (this.posn.x + UNIT_LENGTH),
        neBlock.posn.y + UNIT_LENGTH - this.posn.y
      );

      if (this.velocity.heading() > neVectorToCorner.heading()) {
        this.velocity.y = 0;
        newPosn.y = neBlock.posn.y + UNIT_LENGTH;
      } else {
        newPosn.x = neBlock.posn.x - PLAYER_SIZE;
      }
    }
    // bottom-left corner
    const swBlock = this.map.getBlock(
      newPosn.x + 1,
      newPosn.y + PLAYER_SIZE - 1
    );
    if (swBlock?.isSolid()) {
      const swVectorToCorner = createVector(
        swBlock.posn.x + UNIT_LENGTH - this.posn.x,
        swBlock.posn.y - (this.posn.y + UNIT_LENGTH)
      );

      if (this.velocity.heading() > swVectorToCorner.heading()) {
        this.velocity.y = 0;
        newPosn.y = swBlock.posn.y - PLAYER_SIZE;
        this.energy = PLAYER_TOTAL_ENERGY;
      } else {
        newPosn.x = swBlock.posn.x + UNIT_LENGTH;
      }
    }
    // bottom-right corner
    const seBlock = this.map.getBlock(
      newPosn.x + PLAYER_SIZE - 1,
      newPosn.y + PLAYER_SIZE - 1
    );
    if (seBlock?.isSolid()) {
      const seVectorToCorner = createVector(
        seBlock.posn.x - (this.posn.x + UNIT_LENGTH),
        seBlock.posn.y - (this.posn.y + UNIT_LENGTH)
      );

      if (this.velocity.heading() < seVectorToCorner.heading()) {
        this.velocity.y = 0;
        newPosn.y = seBlock.posn.y - PLAYER_SIZE;
        this.energy = PLAYER_TOTAL_ENERGY;
      } else {
        newPosn.x = seBlock.posn.x - PLAYER_SIZE;
      }
    }

    this.posn = newPosn;
  }

  addInputListeners() {
    addEventListener("keyup", (event) => {
      if (event.key === "ArrowRight" && this.isMovingRight()) {
        this.stopMoving();
      }
      if (event.key === "ArrowLeft" && this.isMovingLeft()) {
        this.stopMoving();
      }
    });
    addEventListener("keydown", (event) => {
      if (event.key === "ArrowUp" || event.key === " ") {
        this.flap();
      }
      if (event.key === "ArrowLeft") {
        this.moveLeft();
      }
      if (event.key === "ArrowRight") {
        this.moveRight();
      }
    });
  }
}
