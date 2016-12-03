const test = require('tape')

var partOne = require('../src/days/3/part-1')
var partTwo = require('../src/days/3/part-2')
var fixtures = require('./fixtures')

test('day 3, part 1', (t) => {
  t.plan(1)
  fixtures({ day: 3 })
  .then((input) => t.equals(partOne(input), 1050))
  .catch(t.error.bind(t))
})

test('day 3, part 2', (t) => {
  t.plan(1)
  fixtures({ day: 3 })
  .then((input) => t.equals(partTwo(input), 1921))
  .catch(t.error.bind(t))
})
