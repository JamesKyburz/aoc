const test = require('tape')

var partOne = require('../src/days/4/part-1')
var partTwo = require('../src/days/4/part-2')
var fixtures = require('./fixtures')

test('day 4, part 1 - example', (t) => {
  t.plan(1)
  fixtures({ day: 4, example: true })
  .then((input) => t.equals(partOne(input), 1514))
  .catch(t.error.bind(t))
})

test('day 4, part 1', (t) => {
  t.plan(1)
  fixtures({ day: 4 })
  .then((input) => t.equals(partOne(input), 158835))
  .catch(t.error.bind(t))
})

test('day 4, part2', (t) => {
  t.plan(1)
  let input = 'qzmt-zixmtkozy-ivhz-343[jashdsad]'
  t.equals(partTwo(input, 'very encrypted name'), 343)
})

test('day 4, part 2', (t) => {
  t.plan(1)
  fixtures({ day: 4 })
  .then((input) => t.equals(partTwo(input, 'northpole object storage'), 993))
  .catch(t.error.bind(t))
})
