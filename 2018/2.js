const { test } = require('tap')
const { lines, input } = require('./helpers')

test('day 2, part 1', async t => {
  t.plan(1)
  const ids = lines(await input('2/input'))

  let ii = 0
  let iii = 0

  for (const id of ids) {
    const letters = [...id]
    const sum = letters.reduce((sum, key) => {
      sum[key] = sum[key] || 0
      sum[key]++
      return sum
    }, {})
    const values = Object.values(sum)
    if (values.includes(2)) ii++
    if (values.includes(3)) iii++
  }
  t.equals(ii * iii, 6723)
})

test('day 2, part 2', async t => {
  t.plan(1)
  const ids = lines(await input('2/input'))

  let match

  for (const [...i] of ids) {
    if (match) break
    const positions = [...Array(i.length)].map((x, i) => i)
    for (const [...j] of ids) {
      let diff = 0
      let lastPos = 0
      for (const pos of positions) {
        if (i[pos] !== j[pos]) {
          diff++
          lastPos = pos
        }
      }
      if (diff === 1) {
        i.splice(lastPos, 1)
        match = i.join('')
        break
      }
    }
  }
  t.equals(match, 'prtkqyluiusocwvaezjmhmfgx')
})
