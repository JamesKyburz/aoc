const input = require('./read')(__filename)

console.log(Math.max(...[...input].map(id)))

function id (input) {
  const row = find([...Array(128).keys()], [...input].slice(0, 7))
  const col = find([...Array(8).keys()], [...input].slice(7))
  return row * 8 + col
}

function find (array, steps) {
  if (array.length === 1) return array[0]
  const step = steps.shift()
  if (step === 'F' || step === 'L') {
    return find(array.slice(0, array.length / 2), steps)
  } else if (step === 'B' || step === 'R') {
    return find(array.slice(array.length / 2), steps)
  }
}
