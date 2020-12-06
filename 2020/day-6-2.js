const input = require('./read')(__filename)

console.log(
  [...records(input)].map(record => record.size).reduce((a, b) => a + b)
)

function * records (input) {
  let record = []
  for (const [...answers] of input) {
    if (answers.length) {
      record = [...record, answers]
    } else if (record) {
      yield new Set(record.flat())
      record = []
    }
  }
  if (record) yield new Set(record.flat())
}
