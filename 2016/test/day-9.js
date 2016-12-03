const test = require('tape')

const partOne = require('../src/days/9/part-1')
const partTwo = require('../src/days/9/part-2')
const fixtures = require('./fixtures')

test('day 9, part 1 - example', (t) => {
  t.plan(1)
  fixtures({ day: 9, example: true })
  .then((inputs) => t.equals(partOne(inputs), 57))
  .catch(t.error.bind(t))
})

test('day 9, part 1', (t) => {
  t.plan(1)
  fixtures({ day: 9 })
  .then((inputs) => t.equals(partOne(inputs), 107035))
  .catch(t.error.bind(t))
})

test('day 9, part 2 - example', (t) => {
  t.plan(1)
  fixtures({ day: 9, example: true, part: 2 })
  .then((inputs) => t.equals(partTwo(inputs), 242394))
  .catch(t.error.bind(t))
})

test('day 9 part 2', (t) => {
  t.plan(1)
  fixtures({ day: 9 })
  .then((inputs) => t.equals(partTwo(inputs), 11451628995))
  .catch(t.error.bind(t))
})
