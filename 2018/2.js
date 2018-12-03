const { test } = require('tap')
const { lines, input, sequence } = require('./helpers')

test('day 2, part 1', async t => {
  t.plan(1)
  const ids = lines(await input('2/input'))

  let ii = 0
  let iii = 0

  for (const id of ids) {
    const values = Object.values(
      [...id].reduce(
        (sum, key) => ({
          ...sum,
          [key]: (sum[key] || 0) + 1
        }),
        {}
      )
    )
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
    const positions = sequence(i.length)
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
