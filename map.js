class Map {
  constructor(layout) {
    this.blocks = layout;

    for (let i = 0; i < this.blocks.length; ++i) {
      for (let j = 0; j < this.blocks[0].length; ++j) {
        switch (this.blocks[i][j]) {
          case 0:
            this.blocks[i][j] = null;
            continue;
          case 1:
            this.blocks[i][j] = new Obstacle(j * UNIT_LENGTH, i * UNIT_LENGTH);
            continue;
        }
      }
    }
  }

  getBlock(xPixel, yPixel) {
    const row = Math.floor(yPixel / UNIT_LENGTH);
    const col = Math.floor(xPixel / UNIT_LENGTH);
    if (row < this.blocks.length && col < this.blocks[0].length) {
      return this.blocks[row][col];
    }
    return null;
  }

  draw() {
    background("skyblue");

    for (const row of this.blocks) {
      for (const block of row) {
        block?.draw();
      }
    }
  }
}
