const input = require('./read')(__filename)

console.log(
  [...records(input)].map(record => record.size).reduce((a, b) => a + b)
)

function * records (input) {
  let record = []
  const all = () => {
    const count = {}
    for (const answer of record.flat()) {
      count[answer] = count[answer] || 0
      count[answer]++
    }
    return new Set(
      Object.keys(count).filter(key => count[key] === record.length)
    )
  }
  for (const [...answers] of input) {
    if (answers.length) {
      record = [...record, answers]
    } else if (record) {
      yield all()
      record = []
    }
  }
  if (record) yield all()
}
