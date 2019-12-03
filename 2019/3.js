const manhattan = ([x, y], [x1, y1]) => Math.abs(x - x1) + Math.abs(y - y1)

const wires = require('./read')(__filename)
  .splitNewline()
  .value()

const getMoves = wire => wire.split(/,/).map(x => [x[0], Number(x.slice(1))])

const seen = []

let i = 0

for (const wire of wires) {
  i++
  const moves = getMoves(wire)
  let [x, y] = [0, 0]
  for (const [direction, steps] of moves) {
    let n = steps
    if (direction === 'R') {
      while (n--) saveStep(i, ++x, y, 'LR')
    } else if (direction === 'L') {
      while (n--) saveStep(i, --x, y, 'LR')
    } else if (direction === 'U') {
      while (n--) saveStep(i, x, ++y, 'UD')
    } else if (direction === 'D') {
      while (n--) saveStep(i, x, --y, 'UD')
    }
  }
}

function saveStep (number, x, y, type) {
  seen[[x, y]] = seen[[x, y]] || []
  seen[[x, y]].push({ number, type })
}

const crossed = Object.keys(seen)
  .filter(key => {
    for (const item of seen[key]) {
      for (const other of seen[key]) {
        if (item.number !== other.number && item.type !== other.type) {
          return true
        }
      }
    }
  })
  .map(x => x.split(/,/).map(Number))

console.log(
  crossed.map(point => manhattan([0, 0], point)).sort((a, b) => a - b)[0]
)
