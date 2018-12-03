const { test } = require('tap')
const { input, lines } = require('./helpers')

test('day 3', async t => {
  t.plan(2)
  const counter = {}
  const instructions = lines(await input('3/input')).map(line => {
    const [, id, x, y, width, height] = [
      ...line.match(/^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/)
    ].map(Number)
    const matrix = {}
    for (let iy = 0; iy < height; iy++) {
      for (let ix = 0; ix < width; ix++) {
        const pos = `${x + ix}x${y + iy}`
        matrix[pos] = 0
        counter[pos] = counter[pos] || 0
        counter[pos]++
      }
    }
    return {
      id,
      matrix,
    }
  })

  const overlap = Object.values(counter).filter(x => x > 1).length
  t.equals(119572, overlap)

  for (const instruction of instructions) {
    if (Object.keys(instruction.matrix).every(pos => counter[pos] === 1)) {
      t.equals(775, instruction.id)
      break
    }
  }

})
