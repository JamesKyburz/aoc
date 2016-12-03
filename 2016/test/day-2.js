const test = require('tape')

const partOne = require('../src/days/2/part-1')
const partTwo = require('../src/days/2/part-2')
const fixtures = require('./fixtures')

let input, inputExample

test('day 2, get fixtures', (t) => {
  t.plan(2)
  fixtures({ day: 2, example: true })
  .then((data) => {
    inputExample = data
    t.ok('example input')
  })
  .catch(t.error.bind(t))
  fixtures({ day: 2 })
  .then((data) => {
    input = data
    t.ok('input')
  })
  .catch(t.error.bind(t))
})

test('day 2, part 1 example', (t) => {
  t.plan(1)
  t.equals(partOne(inputExample), 1985)
})

test('day 2, part 1', (t) => {
  t.plan(1)
  t.equals(partOne(input), 52981)
})

test('day 2, part 2 example', (t) => {
  t.plan(1)
  t.equals(partTwo(inputExample), '5DB3')
})

test('day 2, part 2', (t) => {
  t.plan(1)
  t.equals(partTwo(input), '74CD2')
})
