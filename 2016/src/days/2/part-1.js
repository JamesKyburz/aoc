module.exports = (inputs) => {
  const instructions = inputs
  .split('\n')
  .filter(Boolean)
  .map((line) => line.replace(/ /g, '').match(/./g).map(move))

  function move (instruction) {
    return {
      U: up,
      D: down,
      L: left,
      R: right
    }[instruction]
  }

  var [x, y] = [0, 0]

  function up () { y = Math.max(0, y - 1) }
  function down () { y = Math.min(2, y + 1) }
  function left () { x = Math.max(0, x - 1) }
  function right () { x = Math.min(2, x + 1) }

  const pad = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ]

  var result = ''

  instructions.forEach((set) => {
    set.forEach((fn) => fn())
    result += pad[y][x]
  })
  return +result
}
