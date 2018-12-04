const { test } = require('tap')
const { input, lines, sequence } = require('./helpers')

test('day 3', async t => {
  t.plan(2)
  const counter = {}
  const instructions = lines(await input('3/input'))
    .map(line =>
      [...line.match(/^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/)].map(Number)
    )
    .map(([, id, x, y, width, height]) => ({
      id,
      matrix: sequence(height)
        .map(iy => sequence(width).map(ix => [ix, iy]))
        .reduce((sum, item) => {
          for (const [ix, iy] of item) {
            const pos = `${x + ix}x${y + iy}`
            sum[pos] = 0
            counter[pos] = counter[pos] || 0
            counter[pos]++
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