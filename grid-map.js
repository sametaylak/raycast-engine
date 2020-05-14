/*
 *
 * 1, 2, 3 -> Wall with Shading
 * 0 -> Walkable blocks
 *
 */

class GridMap {
  constructor() {
    this.grid = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 2, 2, 1, 0, 1, 2, 2, 0, 1],
      [1, 0, 2, 2, 1, 0, 1, 2, 2, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 3, 3, 0, 0, 0, 3, 3, 0, 1],
      [1, 0, 3, 3, 0, 0, 0, 3, 3, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]
  }

  getBlockValue(x, y) {
    const gridX = Math.floor(x / TILE_SIZE)
    const gridY = Math.floor(y / TILE_SIZE)

    return this.grid[gridY][gridX]
  }

  isWalkable(x, y) {
    if (x < 0 || x > SCREEN_WIDTH || y < 0 || y > SCREEN_HEIGHT) {
      return false
    }

    const gridX = Math.floor(x / TILE_SIZE)
    const gridY = Math.floor(y / TILE_SIZE)

    return this.grid[gridY][gridX] === 0
  }

  render() {
    for (let rowIndex = 0; rowIndex < NUMBER_OF_ROWS; rowIndex++)
      for (let colIndex = 0; colIndex < NUMBER_OF_COLS; colIndex++) {
        const tileX = colIndex * TILE_SIZE
        const tileY = rowIndex * TILE_SIZE
        const tileValue = this.grid[rowIndex][colIndex]
        const { r, g, b } = getColorBy(tileValue)

        stroke('#222')
        fill(`rgba(${r}, ${g}, ${b}, 255)`)
        rect(
          SCALE_FACTOR * tileX,
          SCALE_FACTOR * tileY,
          SCALE_FACTOR * TILE_SIZE,
          SCALE_FACTOR * TILE_SIZE,
        )
      }
  }
}
