const { test } = require('tap')
const { input, lines, sequence } = require('./helpers')

test('day 6', async t => {
  t.plan(2)
  const manhattan = ([x, y], [x1, y1]) => Math.abs(x - x1) + Math.abs(y - y1)

  const isFinite = region => {
    for (const y of [0, maxY - 1]) {
      for (const x of [0, maxX - 1]) {
        const cell = matrix[y][x]
        if (cell.region === region || cell.partOf === region) return false
      }
    }
    return true
  }

  const coord = lines(await input('6/input')).map(x =>
    x.split(/, /).map(Number)
  )

  const [maxX, maxY] = coord.reduce(([maxX, maxY], [x, y]) => [
    Math.max(x + 1, maxX),
    Math.max(y + 1, maxY)
  ])

  const regions = coord.map(([x, y], region) => ({
    region,
    xy: [x, y],
    distances: {}
  }))

  const matrix = sequence(maxY).map(y => [...Array(maxX)].map(() => ({})))

  for (const { xy, region, distances } of regions) {
    const [ix, iy] = xy
    matrix[iy][ix] = { region }
    for (const y of sequence(maxY)) {
      for (const x of sequence(maxX)) {
        if (y === iy && x === ix) continue
        const distance = manhattan([x, y], [ix, iy])
        distances[(x, y)] = distance
        const cell = matrix[y][x]
        if (typeof cell.distance === 'undefined' && !cell.noDistance) {
          cell.distance = distance
          cell.partOf = region
        } else if (distance < cell.distance) {
          cell.distance = distance
          cell.partOf = region
          delete cell.noDistance
        } else if (distance === cell.distance) {
          delete cell.partOf
          cell.noDistance = true
        }
      }
    }
  }

  const maxFiniteArea = regions
    .filter(({ region }) => isFinite(region))
    .reduce((sum, { region }) => {
      let count = 0
      for (const y of sequence(maxY)) {
        for (const x of sequence(maxX)) {
          const cell = matrix[y][x]
          if (cell.region > -1) {
            if (cell.region === region) count++
          } else if (cell.partOf > -1) {
            if (cell.partOf === region) count++
          }
        }
      }
      return Math.max(count, sum)
    }, 0)

  t.equals(5187, maxFiniteArea)

  let closestArea = 0

  for (const y of sequence(maxY)) {
    for (const x of sequence(maxX)) {
      let distanceTotal = 0
      for (const [x1, y1] of regions.map(({ xy }) => xy)) {
        distanceTotal += manhattan([x, y], [x1, y1])
      }
      if (distanceTotal < 10000) closestArea++
    }
  }

  t.equals(34829, closestArea)
})
