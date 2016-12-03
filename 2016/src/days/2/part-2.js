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

  var [x, y] = [0, 2]

  function up () {
    const t = Math.max(0, y - 1)
    if (pad[t][x]) y = t
  }

  function down () {
    const t = Math.min(4, y + 1)
    if (pad[t][x]) y = t
  }

  function left () {
    const t = Math.max(0, x - 1)
    if (pad[y][t]) x = t
  }

  function right () {
    const t = Math.min(4, x + 1)
    if (pad[y][t]) x = t
  }

  const pad = [
    [null, null, 1, null, null],
    [null, 2, 3, 4, null],
    [5, 6, 7, 8, 9],
    [null, 'A', 'B', 'C', null],
    [null, null, 'D', null, null]
  ]

  var result = ''

  instructions.forEach((set) => {
    set.forEach((fn) => fn())
    result += pad[y][x]
  })
  return result
}
