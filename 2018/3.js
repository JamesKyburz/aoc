const { test } = require('tap')
const { input, lines, sequence } = require('./helpers')

test('day 3', async t => {
  t.plan(2)
  const counter = {}
  const parse = line =>
    [...line.match(/^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/)].map(Number)
  const instructions = lines(await input('3/input'))
    .map(parse)
    .map(([, id, x, y, width, height]) => ({
      id,
      matrix: sequence(height)
        .map(iy => sequence(width).map(ix => `${x + ix}x${y + iy}`))
        .reduce((sum, item) => {
          for (const pos of item) {
            sum[pos] = counter[pos] = (counter[pos] || 0) + 1
          }
          return sum
        }, {})
    }))

  const overlap = Object.values(counter).filter(x => x > 1).length
  t.equals(119572, overlap)

  for (const instruction of instructions) {
    if (Object.keys(instruction.matrix).every(pos => counter[pos] === 1)) {
      t.equals(775, instruction.id)
      break
    }
  }
})
