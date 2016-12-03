const test = require('tape')

var solution = require('../src/days/8/solution')
var fixtures = require('./fixtures')

test('day 8, part 1 - example', (t) => {
  t.plan(1)
  fixtures({ day: 8, example: true })
  .then((inputs) => t.equals(solution(inputs, {}), 6))
  .catch(t.error.bind(t))
})

test('day 8, part 1', (t) => {
  t.plan(1)
  fixtures({ day: 8 })
  .then((inputs) => t.equals(solution(inputs, {}), 123))
  .catch(t.error.bind(t))
})

test('day 8, part 2', (t) => {
  t.plan(1)
  let expected = `
.##..####.###..#..#.###..####.###....##.###...###.
#..#.#....#..#.#..#.#..#....#.#..#....#.#..#.#....
#..#.###..###..#..#.#..#...#..###.....#.#..#.#....
####.#....#..#.#..#.###...#...#..#....#.###...##..
#..#.#....#..#.#..#.#....#....#..#.#..#.#.......#.
#..#.#....###...##..#....####.###...##..#....###..`
.split('\n')
.slice(1)
.join('\n')
  fixtures({ day: 8 })
  .then((inputs) => t.equals(solution(inputs, { print : true }), expected))
  .catch(t.error.bind(t))
})
