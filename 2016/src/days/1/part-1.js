module.exports = (inputs) => {
  let [ x, y, dir ] = [ 0, 0, 'N' ]
  inputs.split(', ')
  .forEach((instruction) => {
    rotate(instruction[0])
    move(+instruction.slice(1))
  })

  return Math.abs(x) + Math.abs(y)

  function rotate (by) {
    let newDir = ''
    if (dir === 'N') newDir = by === 'R' ? 'E' : 'W'
    if (dir === 'E') newDir = by === 'R' ? 'S' : 'N'
    if (dir === 'S') newDir = by === 'R' ? 'W' : 'E'
    if (dir === 'W') newDir = by === 'R' ? 'N' : 'S'
    dir = newDir
  }

  function move (n) {
    if (dir === 'N') y -= n
    if (dir === 'E') x += n
    if (dir === 'S') y += n
    if (dir === 'W') x -= n
  }
}
