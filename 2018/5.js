const { test } = require('tap')
const { input } = require('./helpers')

test('day 5', async t => {
  t.plan(2)
  const data = [...(await input('5/input'))]
    .slice(0, -1)
    .map(x => x.charCodeAt(0))
  let reduced

  while (true) {
    const shrink = data.reduce((sum, item) => {
      const last = sum.slice(-1)[0]
      if (last && Math.abs(last - item) === 32) {
        sum.pop()
      } else {
        sum.push(item)
      }
      return sum
    }, [])
    if (reduced && reduced.toString() === shrink.toString()) break
    reduced = shrink
  }

  t.equals(reduced.length, 10762)

  const counter = [...Array(26)].map((_, x) => 97 + x).reduce(
    (sum, letter) => ({
      ...sum,
      [letter]: {
        count: 0,
        check: x => x !== letter && x + 32 !== letter
      }
    }),
    {}
  )

  for (const letter of Object.keys(counter)) {
    let reduced
    while (true) {
      const shrink = data.reduce((sum, item) => {
        if (counter[letter].check(item)) {
          const last = sum.slice(-1)[0]
          if (last && Math.abs(last - item) === 32) {
            sum.pop()
          } else {
            sum.push(item)
          }
        }
        return sum
      }, [])
      if (reduced && reduced.toString() === shrink.toString()) {
        counter[letter].count = reduced.length
        break
      }
      reduced = shrink
    }
  }

  const best = Object.keys(counter).sort(
    (a, b) => counter[a].count - counter[b].count
  )[0]

  t.equals(counter[best].count, 6946)
})
