// This is just for drawing a ragged frame around the screen; it doesn't
// affect the logic of the game.
class Frame {
  constructor() {
    this.points = [[0, 0]];

    for (let i = 1; i < CANVAS_WIDTH / UNIT_LENGTH; ++i) {
      this.points.push([
        i * UNIT_LENGTH,
        Math.floor(Math.random() * FRAME_AMPLITUDE),
      ]);
    }

    this.points.push([CANVAS_WIDTH, 0]);

    for (let i = 1; i < CANVAS_HEIGHT / UNIT_LENGTH; ++i) {
      this.points.push([
        CANVAS_WIDTH - Math.floor(Math.random() * FRAME_AMPLITUDE),
        i * UNIT_LENGTH,
      ]);
    }

    this.points.push([CANVAS_WIDTH, CANVAS_HEIGHT]);

    for (let i = 1; i < CANVAS_WIDTH / UNIT_LENGTH; ++i) {
      this.points.push([
        CANVAS_WIDTH - i * UNIT_LENGTH,
        CANVAS_HEIGHT - Math.floor(Math.random() * FRAME_AMPLITUDE),
      ]);
    }

    this.points.push([0, CANVAS_HEIGHT]);

    for (let i = 1; i < CANVAS_HEIGHT / UNIT_LENGTH; ++i) {
      this.points.push([
        Math.floor(Math.random() * FRAME_AMPLITUDE),
        CANVAS_HEIGHT - i * UNIT_LENGTH,
      ]);
    }

    this.points.push(
      [0, 0],
      [-5, CANVAS_HEIGHT + 5],
      [CANVAS_WIDTH + 5, CANVAS_HEIGHT + 5],
      [CANVAS_WIDTH + 5, -5]
    );
  }

  draw() {
    noStroke();
    fill("oldlace");
    beginShape();

    for (const point of this.points) {
      vertex(...point);
    }

    endShape(CLOSE);
  }
}
