const test = require('tape')

var partOne = require('../src/days/1/part-1')
var partTwo = require('../src/days/1/part-2')
var fixtures = require('./fixtures')

test('day 1, part 1', (t) => {
  t.plan(1)
  fixtures({ day: 1 })
  .then((input) => t.equals(partOne(input), 252))
  .catch(t.error.bind(t))
})

test('day 1, part 2', (t) => {
  t.plan(1)
  fixtures({ day: 1 })
  .then((input) => t.equals(partTwo(input), 143))
  .catch(t.error.bind(t))
})
