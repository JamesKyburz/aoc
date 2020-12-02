const input = require('./read')(__filename)
  .splitNewline()
  .mapNumber()

const expenses = [...input]

let result = 0
const seen = {}

for (const i of expenses) {
  for (const j of expenses) {
    if (i + j === 2020) {
      const key = [i, j].sort().join(',')
      if (seen[key]) continue
      result += (i * j)
      seen[key] = true
    }
  }
}

console.log(result)
