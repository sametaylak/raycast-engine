class Player {
  constructor(grid) {
    this.grid = grid
    this.x = SCREEN_WIDTH / 2
    this.y = SCREEN_HEIGHT / 2
    this.angle = 0

    this.moveSpeed = 3.0
    this.rotationSpeed = 3 * (Math.PI / 180)

    this.moveDirection = 0
    this.rotationDirection = 0
  }

  update() {
    this.angle += this.rotationDirection * this.rotationSpeed

    const move = this.moveDirection * this.moveSpeed
    const moveX = this.x + Math.cos(this.angle) * move
    const moveY = this.y + Math.sin(this.angle) * move

    if (this.grid.isWalkable(moveX, moveY)) {
      this.x = moveX
      this.y = moveY
    }
  }

  render() {
    noStroke()
    fill('blue')
    circle(SCALE_FACTOR * this.x, SCALE_FACTOR * this.y, SCALE_FACTOR * 4 /* radius */)

    const directionAmplifier = 30
    stroke('blue')
    line(
     SCALE_FACTOR * this.x,
     SCALE_FACTOR * this.y,
     SCALE_FACTOR * this.x + Math.cos(this.angle) * directionAmplifier,
     SCALE_FACTOR * this.y + Math.sin(this.angle) * directionAmplifier
    )
  }
}
