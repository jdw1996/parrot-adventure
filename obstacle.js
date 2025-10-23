class Obstacle {
  constructor(x, y) {
    this.posn = createVector(x, y);
  }

  draw() {
    noStroke();
    fill("dimgrey");
    rect(this.posn.x, this.posn.y, UNIT_LENGTH, UNIT_LENGTH);
  }

  isSolid() {
    return true;
  }
}
