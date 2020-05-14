class Ray {
  constructor(rayAngle, rayOrigin, grid) {
    this.grid = grid
    this.rayAngle = normalizeAngle(rayAngle)
    this.rayOrigin = rayOrigin

    this.rayFacingDown = 
      this.rayAngle > 0 && this.rayAngle < Math.PI

    this.rayFacingUp = !this.rayFacingDown

    this.rayFacingRight =
      this.rayAngle < 0.5 * Math.PI || this.rayAngle > 1.5 * Math.PI

    this.rayFacingLeft = !this.rayFacingRight

    this.hitX = 0
    this.hitY = 0
    this.hitColor = null
    this.distance = 0
  }

  cast() {
    //// horizontal check
    let horizontalHit = false
    let horizontalHitX = 0
    let horizontalHitY = 0
    let horizontalHitColor = getColorBy(-1)

    let interceptY = Math.floor(this.rayOrigin.y / TILE_SIZE) * TILE_SIZE
    interceptY += this.rayFacingDown ? TILE_SIZE : 0

    let interceptX = 
      this.rayOrigin.x + (interceptY - this.rayOrigin.y) / Math.tan(this.rayAngle)

    let stepY = TILE_SIZE
    stepY *= this.rayFacingUp ? -1 : 1

    let stepX = TILE_SIZE / Math.tan(this.rayAngle)
    stepX *= this.rayFacingLeft && stepX > 0 ? -1 : 1
    stepX *= this.rayFacingRight && stepX < 0 ? -1 : 1

    let nextHorizontalX = interceptX
    let nextHorizontalY = interceptY

    if (this.rayFacingUp) {
      nextHorizontalY--
    }

    while (
      nextHorizontalX >= 0 && nextHorizontalX <= SCREEN_WIDTH &&
      nextHorizontalY >= 0 && nextHorizontalY <= SCREEN_HEIGHT
    ) {
      const isWalkable = this.grid.isWalkable(nextHorizontalX, nextHorizontalY)
      if (!isWalkable) {
        const blockValue = 
          this.grid.getBlockValue(nextHorizontalX, nextHorizontalY)

        horizontalHit = true
        horizontalHitX = nextHorizontalX
        horizontalHitY = nextHorizontalY
        horizontalHitColor = getColorBy(blockValue)
        break
      } else {
        nextHorizontalX += stepX
        nextHorizontalY += stepY
      }
    }

    // vertical check
    let verticalHit = false
    let verticalHitX = 0
    let verticalHitY = 0
    let verticalHitColor = getColorBy(-1)

    let vertInterceptX = Math.floor(this.rayOrigin.x / TILE_SIZE) * TILE_SIZE
    vertInterceptX += this.rayFacingRight ? TILE_SIZE : 0

    let vertInterceptY =
      this.rayOrigin.y + (vertInterceptX - this.rayOrigin.x) * Math.tan(this.rayAngle)

    let vertStepX = TILE_SIZE
    vertStepX *= this.rayFacingLeft ? -1 : 1

    let vertStepY = TILE_SIZE * Math.tan(this.rayAngle)
    vertStepY *= this.rayFacingUp && vertStepY > 0 ? -1 : 1
    vertStepY *= this.rayFacingDown && vertStepY < 0 ? -1 : 1

    let nextVerticalX = vertInterceptX
    let nextVerticalY = vertInterceptY

    if (this.rayFacingLeft) {
      nextVerticalX--
    }

    while (
      nextVerticalX >= 0 && nextVerticalX <= SCREEN_WIDTH &&
      nextVerticalY >= 0 && nextVerticalY <= SCREEN_HEIGHT
    ) {
      const isWalkable = this.grid.isWalkable(nextVerticalX, nextVerticalY)
      if (!isWalkable) {
        const blockValue =
          this.grid.getBlockValue(nextVerticalX, nextVerticalY)

        verticalHit = true
        verticalHitX = nextVerticalX
        verticalHitY = nextVerticalY
        verticalHitColor = getColorBy(blockValue)
        break
      } else {
        nextVerticalX += vertStepX
        nextVerticalY += vertStepY
      }
    }

    let horizontalDistance = horizontalHit
      ? distanceBetweenPoints(
          this.rayOrigin.x, this.rayOrigin.y,
          horizontalHitX, horizontalHitY
        )
      : Number.MAX_VALUE

    let verticalDistance = verticalHit
      ? distanceBetweenPoints(
          this.rayOrigin.x, this.rayOrigin.y,
          verticalHitX, verticalHitY
        )
      : Number.MAX_VALUE

    if (verticalDistance < horizontalDistance) {
      this.hitX = verticalHitX
      this.hitY = verticalHitY
      this.hitColor = verticalHitColor
      this.distance = verticalDistance
    } else {
      this.hitX = horizontalHitX
      this.hitY = horizontalHitY
      this.hitColor = horizontalHitColor
      this.distance = horizontalDistance
    }
  }

  render() {
    stroke('red')
    line(
      SCALE_FACTOR * this.rayOrigin.x,
      SCALE_FACTOR * this.rayOrigin.y,
      SCALE_FACTOR * this.hitX,
      SCALE_FACTOR * this.hitY
      // this.rayOrigin.x + Math.cos(this.rayAngle) * 30 /* amplifier */,
      // this.rayOrigin.y + Math.sin(this.rayAngle) * 30 /* amplifier */
    )
  }
}
