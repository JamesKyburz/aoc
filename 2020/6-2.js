const input = require('./read')(__filename)

console.log(
  [...records(input)].map(record => record.size).reduce((a, b) => a + b)
)

function * records (input) {
  let record = []
  const all = () => {
    return new Set(record.flat().filter(x => record.every(y => y.includes(x))))
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
