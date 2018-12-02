const { test } = require('tap')
const { input, lines } = require('./helpers')

test('day 1, part 1', async t => {
  t.plan(1)
  const numbers = lines(await input('1/input')).map(Number)
  t.equals(numbers.reduce((a, b) => a + b), 580)
})

test('day 1, part 2', async t => {
  t.plan(1)
  const numbers = lines(await input('1/input')).map(Number)

  const seen = {}
  let n = 0
  let sameFrequency

  while (!sameFrequency) {
    for (const value of numbers) {
      n += value
      if (seen[n]) {
        sameFrequency = true
        t.equals(n, 81972)
        break
      }
      seen[n] = 1
    }
  }
})
