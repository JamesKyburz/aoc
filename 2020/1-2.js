const expenses = [...require('./read')(__filename).mapNumber()]

let result = 0
const seen = {}

for (const i of expenses) {
  for (const j of expenses) {
    for (const k of expenses) {
      if (i + j + k === 2020) {
        const key = [i, j, k].sort().join(',')
        if (seen[key]) continue
        result += (i * j * k)
        seen[key] = true
      }
    }
  }
}

console.log(result)
