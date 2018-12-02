const { test } = require('tap')
const { input, lines } = require('./helpers')

test('day 1', async t => {
  t.plan(2)
  const numbers = lines(await input('1/input')).map(Number)

  const seen = {}
  let n = 0
  let sameFrequency
  let rounds = 0

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
    rounds++
    if (rounds === 1) {
      t.equals(n, 580)
    }
  }
})
