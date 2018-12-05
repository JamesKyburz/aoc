const { test } = require('tap')
const { input, lines } = require('./helpers')

test('day 5', async t => {
  t.plan(1)
  const data = [...await input('5/input')].slice(0, -1).map(x => x.charCodeAt(0))
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
})
