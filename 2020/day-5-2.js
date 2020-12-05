const input = require('./read')(__filename)

const ids = [...input].map(id).sort()

const diff = ids.map((id, i) => ids[i + 1] - id)

console.log(ids[diff.findIndex(x => x !== 1)] + 1)

function id (input) {
  const row = find(0, 127, [...input].slice(0, 7))
  const col = find(0, 7, [...input].slice(7))
  return row * 8 + col
}

function find (min, max, steps) {
  const step = steps.shift()
  if (step === 'F' || step === 'L') {
    return find(min, ((max + 1 + min) / 2) - 1, steps)
  } else if (step === 'B' || step === 'R') {
    return find(((max + 1 + min) / 2), max, steps)
  } else {
    return min
  }
}
