const input = require('./read')(__filename)
const ids = [...input].map(id).sort()
const diff = ids.map((id, i) => ids[i + 1] - id)

console.log(ids[diff.findIndex(x => x !== 1)] + 1)

function id (input) {
  return parseInt(input.replace(/(F|L)/g, '0').replace(/\D/g, '1'), 2)
}
