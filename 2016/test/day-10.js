const test = require('tape')

const solution = require('../src/days/10/solution')
const fixtures = require('./fixtures')

test('day 10, part 1', (t) => {
  t.plan(1)
  fixtures({ day: 10 })
  .then((inputs) => {
    let bot = +solution(inputs)
    .comparing
    .filter((x) => /61/.test(x) && /17/.test(x))
    .map((x) => x.match(/\d+/))
    [0]
    t.equals(bot, 157)
  })
  .catch(t.error.bind(t))
})

test('day 10, part 2', (t) => {
  t.plan(1)
  fixtures({ day: 10 })
  .then((inputs) => {
    let outputs = solution(inputs).outputs
    let product = [outputs[0], outputs[1], outputs[2]]
    .map((x) => x.chips[0])
    .reduce((product, n) => product * n, 1)
    t.equals(product, 1085)
  })
  .catch(t.error.bind(t))
})
