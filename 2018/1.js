const { test } = require('tap')

test('day 1', async t => {
  t.plan(2)
  const input = await require('./input')('1/input')
  const lines = input
    .split(/\n/)
    .slice(0, -1)
  const numbers = lines.map(Number)

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
