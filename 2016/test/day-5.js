const test = require('tape')

var partOne = require('../src/days/5/part-1')
var partTwo = require('../src/days/5/part-2')

test.skip('day 5, part 1 - example', (t) => {
  t.plan(1)
  t.equals(partOne('abc'), '18f47a30')
})

test.skip('day 5, part 1', (t) => {
  t.plan(1)
  t.equals(partOne('reyedfim'), 'f97c354d')
})

test.skip('day 5, part 2 - example', (t) => {
  t.plan(1)
  t.equals(partTwo('abc'), '05ace8e3')
})

test.skip('day 5, part 2', (t) => {
  t.plan(1)
  t.equals(partTwo('reyedfim'), '863dde27')
})
