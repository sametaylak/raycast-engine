const gridMap = new GridMap()
const player = new Player(gridMap)

let rays = []

function castRays() {
  // we need to clear rays before casting
  rays = []
  
  let rayAngle = player.angle - (FOV_ANGLE / 2)
  for (let i = 0; i < NUMBER_OF_RAYS; i++) {
    const ray = new Ray(rayAngle, player /* origin */, gridMap)
    ray.cast()
    rays.push(ray)

    rayAngle += FOV_ANGLE / NUMBER_OF_RAYS
  }
}

function setup() {
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT)
}

function update() {
  player.update()
  castRays()
}

function draw() {
  noStroke()
  fill('#ccc')
  rect(
    0, SCREEN_HEIGHT / 2,
    SCREEN_WIDTH, SCREEN_HEIGHT / 2
  )
  fill('#222')
  rect(
    0, 0,
    SCREEN_WIDTH, SCREEN_HEIGHT / 2
  )

  update()

  rays.forEach((ray, index) => {
    // This will clear fish-eye effect
    const d = ray.distance * Math.cos(ray.rayAngle - player.angle)
    const { r, g, b } = ray.hitColor

    const projectionDistance = (SCREEN_WIDTH / 2) / Math.tan(FOV_ANGLE / 2)
    const projectionHeight = (TILE_SIZE / d) * projectionDistance

    // maybe we need to map it like 0 - 255 or 0 - 1
    const fog = 255

    noStroke()
    fill(r, g, b, fog)
    rect(
      index * RAY_WIDTH,
      SCREEN_HEIGHT / 2 - projectionHeight / 2,
      RAY_WIDTH,
      projectionHeight
    )
  })

  gridMap.render()
  for (const ray of rays) {
    ray.render()
  }
  player.render()
}

function keyPressed() {
  switch (keyCode) {
    case RIGHT_ARROW:
      player.rotationDirection = 1
      break
    case LEFT_ARROW:
      player.rotationDirection = -1
      break
    case UP_ARROW:
      player.moveDirection = 1
      break
    case DOWN_ARROW:
      player.moveDirection = -1
      break
  }
}

function keyReleased() {
  switch (keyCode) {
    case RIGHT_ARROW:
    case LEFT_ARROW:
      player.rotationDirection = 0
      break
    case UP_ARROW:
    case DOWN_ARROW:
      player.moveDirection = 0
      break
  }
}
