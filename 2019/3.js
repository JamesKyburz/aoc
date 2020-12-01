const manhattan = ([x, y], [x1, y1]) => Math.abs(x - x1) + Math.abs(y - y1)

const wires = require('./read')(__filename)
  .splitNewline()
  .value()

const [a, b] = wires

const getMoves = wire => wire.split(/,/).map(x => [x[0], Number(x.slice(1))])

function getSteps (wire, i) {
  const moves = getMoves(wire)
  let [x, y] = [0, 0]
  const wireSteps = {}
  let count = 0
  for (const [direction, steps] of moves) {
    let n = steps
    if (direction === 'R') {
      while (n--) saveStep(++x, y, direction)
    } else if (direction === 'L') {
      while (n--) saveStep(--x, y, direction)
    } else if (direction === 'U') {
      while (n--) saveStep(x, ++y, direction)
    } else if (direction === 'D') {
      while (n--) saveStep(x, --y, direction)
    }
  }
  function saveStep (x, y, direction) {
    count++
    if (!wireSteps[[x, y]]) {
      wireSteps[[x, y]] = {
        count,
        value: direction.match(/U|D/) ? '|' : '-'
      }
    }
  }
  return wireSteps
}

const stepsA = getSteps(a, 1)
const stepsB = getSteps(b, 2)

const both = Object.keys(stepsA).filter(key => {
  const { count: countA, value: valueA, direction: directionA } = stepsA[key]
  const { count: countB, value: valueB, direction: directionB } =
    stepsB[key] || {}
  if (valueB && valueA !== valueB) return true
})

console.log(
  Math.min(...both.map(key => manhattan([0, 0], key.split(',').map(Number))))
)

console.log(
  both
    .map(key => Math.min(stepsA[key].count, stepsB[key].count))
    .reduce((a, b) => a + b)
)
