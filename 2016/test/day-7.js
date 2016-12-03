const test = require('tape')

var partOne = require('../src/days/7/part-1')
var partTwo = require('../src/days/7/part-2')
var fixtures = require('./fixtures')

test('day 7, part 1 - example', (t) => {
  t.plan(1)
  fixtures({ day: 7, example: true })
  .then((inputs) => t.equals(partOne(inputs), 2))
  .catch(t.error.bind(t))
})

test('day 7 part 1', (t) => {
  t.plan(1)
  fixtures({ day: 7 })
  .then((inputs) => t.equals(partOne(inputs), 110))
  .catch(t.error.bind(t))
})

test('day 7 part 2 - example', (t) => {
  t.plan(1)
  fixtures({ day: 7, example: true, part: 2 })
  .then((inputs) => t.equals(partTwo(inputs), 3))
  .catch(t.error.bind(t))
})

test('day 7 part 2', (t) => {
  t.plan(1)
  fixtures({ day: 7 })
  .then((inputs) => t.equals(partTwo(inputs), 242))
  .catch(t.error.bind(t))
})
