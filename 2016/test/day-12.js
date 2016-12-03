const test = require('tape')

const solution = require('../src/days/12/solution')
const fixtures = require('./fixtures')

test('day 12, part 1', (t) => {
  t.plan(1)
  fixtures({ day: 12 })
  .then((inputs) => {
    solution(inputs, ({ registers }) => {
      t.equals(registers.a.value(), 318083)
    })
  })
  .catch(t.error.bind(t))
})

test('day 12, part 1', (t) => {
  t.plan(1)
  fixtures({ day: 12 })
  .then((inputs) => {
    inputs = 'cpy 1 c\n' + inputs
    solution(inputs, ({ registers }) => {
      t.equals(registers.a.value(), 9227737)
    })
  })
  .catch(t.error.bind(t))
})
