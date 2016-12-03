module.exports = (inputs) => {
  let [ x, y, dir ] = [ 0, 0, 'N' ]
  let tracker = {}
  let duplicate = null

  inputs.split(', ')
  .forEach((instruction) => {
    rotate(instruction[0])
    move(+instruction.slice(1))
  })

  return Math.abs(duplicate.x) + Math.abs(duplicate.y)

  function rotate (by) {
    let newDir = ''
    if (dir === 'N') newDir = by === 'R' ? 'E' : 'W'
    if (dir === 'E') newDir = by === 'R' ? 'S' : 'N'
    if (dir === 'S') newDir = by === 'R' ? 'W' : 'E'
    if (dir === 'W') newDir = by === 'R' ? 'N' : 'S'
    dir = newDir
  }

  function move (n) {
    for (let i = 0; i < n; i++) {
      if (dir === 'N') y -= 1
      if (dir === 'E') x += 1
      if (dir === 'S') y += 1
      if (dir === 'W') x -= 1
      if (!duplicate) {
        let key = `${x}.${y}`
        tracker[key] = tracker[key] || 0
        tracker[key]++
        if (tracker[key] === 2) duplicate = { x, y }
      }
    }
  }
}
