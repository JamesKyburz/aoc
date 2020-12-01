const input = require('./read')(__filename)
  .splitNewline()
  .mapNumber()
  .value()

const expenses = [...input]

let result = 0

for (const i of expenses) {
  for (const j of expenses) {
    if (i + j === 2020) {
      result += (i * j)
    }
  }
}

console.log(result / 2)
