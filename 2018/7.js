const { test } = require('tap')
const { input, lines } = require('./helpers')

test('day 7', async t => {
  t.plan(1)

  const steps = lines(await input('7/input')).map(line =>
    line.match(/[A-Z]/g).slice(1)
  )

  const free = () =>
    steps
      .filter(x => !completed.has(x[0]) && !steps.find(y => y[1] === x[0]))
      .sort(([x], [y]) => (x < y ? -1 : x > y ? 1 : 0))[0]

  const canRun = step => !steps.find(x => x[1] === step && !completed.has(x[0]))

  let stack = []

  const completed = new Set()

  const walk = step => {
    if (completed.has(step)) return
    if (!canRun(step)) return
    completed.add(step)
    stack.push(...steps.filter(x => x[0] === step).map(x => x[1]))
    stack = [...new Set(stack.filter(x => !completed.has(x))), free() && free()[0]]
      .filter(Boolean)
      .sort()

    for (const step of stack) walk(step)
  }

  while (free()) walk(free()[0])
  t.equals([...completed].join(''), 'EBICGKQOVMYZJAWRDPXFSUTNLH')
})
