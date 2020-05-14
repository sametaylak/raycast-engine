function normalizeAngle(angle) {
  let newAngle = angle % (2 * Math.PI)
  if (newAngle < 0)
    newAngle = (2 * Math.PI) + newAngle
  return newAngle
}

function distanceBetweenPoints(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2 /* DUMB MOVE */))
}

function getColorBy(value) {
  switch (value) {
    case 1:
      return { r: 225, g: 225, b: 225 }
    case 2:
      return { r: 255, g: 0, b: 0 }
    case 3:
      return { r: 255, g: 255, b: 0 }
    default:
      return { r: 0, g: 0, b: 0 }
  }
}
