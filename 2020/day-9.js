const numbers = require('./read')(__filename).mapNumber().value()

const preamble = process.env.TEST ? 5 : 25

let invalid

for (const i of [...Array(numbers.length).keys()]) {
  const series = numbers.slice(i, i+preamble)
  const check = numbers[(i + 1 * preamble)]
  let valid = false
  for (const x of series) {
    for (const y of series) {
      if (x !== y && x + y === check) {
        valid = true
        break
      }
    }
  }
  if (!valid) {
    console.log('invalid', check)
    invalid = check
    break
  }
}

for (const i of [...Array(numbers.length).keys()]) {
  const series = numbers.slice(i)
  const list = []
  let result = 0
  for (const x of series) {
    if (x === invalid) break
    list.push(x)
    result+=x
    if (result === invalid) {
      console.log(Math.min(...list) + Math.max(...list))
    }
  }
}
