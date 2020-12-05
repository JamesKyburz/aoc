const input = require('./read')(__filename)

console.log(Math.max(...[...input].map(id)))

function id (input) {
  const row = find(0, 127, [...input].slice(0, 7))
  const col = find(0, 7, [...input].slice(7))
  return row * 8 + col
}

function find (min, max, steps) {
  const reduce = min + ((max - min) >> 1)
  if (min === max) return min
  return find(
    ...(/F|L/.test(steps.shift()) ? [min, reduce] : [reduce + 1, max]),
    steps
  )
}
