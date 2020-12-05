const input = require('./read')(__filename)
const ids = [...input].map(id).sort()
const diff = ids.map((id, i) => ids[i + 1] - id)

console.log(ids[diff.findIndex(x => x !== 1)] + 1)

function id ([...input]) {
  const [row, col] = [127, 7].map((max, i) =>
    find(0, max, i ? input : input.splice(0, 7))
  )
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
