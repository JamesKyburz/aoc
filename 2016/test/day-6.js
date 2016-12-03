const test = require('tape')

var partOne = require('../src/days/6/part-1')
var partTwo = require('../src/days/6/part-2')
var fixtures = require('./fixtures')

test('day 6, part 1 - example', (t) => {
  t.plan(1)
  fixtures({ day: 6, example: true })
  .then((inputs) => t.equals(partOne(inputs), 'easter'))
  .catch(t.error.bind(t))
})

test('day 6, part 1', (t) => {
  t.plan(1)
  fixtures({ day: 6 })
  .then((inputs) => t.equals(partOne(inputs), 'afwlyyyq'))
  .catch(t.error.bind(t))
})

test('day 6, part 2 - example', (t) => {
  t.plan(1)
  fixtures({ day: 6, example: true })
  .then((inputs) => t.equals(partTwo(inputs), 'advent'))
  .catch(t.error.bind(t))
})

test('day 6, part 2', (t) => {
  t.plan(1)
  fixtures({ day: 6 })
  .then((inputs) => t.equals(partTwo(inputs), 'bhkzekao'))
  .catch(t.error.bind(t))
})
