for (const { n, expected, solution } of [
  { n: 1, expected: 0 },
  { n: 12, expected: 3 },
  { n: 23, expected: 2 },
  { n: 1024, expected: 31 },
  { n: 265149, expected: 438 },
  { n: 265149, expected: 266330, solution: sum }
]) {
  const actual = (solution || distanceTo1)(n)
  if (actual !== expected) {
    throw new Error(`incorrect distance for ${n}, ${actual} !== ${expected}`)
  }
}

function sum (n) {
  spiral(n)
  const sums = new WeakMap()
  for (const key of Object.keys(spiral.matrix)) {
    const [x, y] = spiral.matrix[key]
    sums[[x, y]] = sums[[x, y]] || neighbors(sums, x, y)
    if (sums[[x, y]] > n) return sums[[x, y]]
  }
}

function neighbors (sums, x, y) {
  return (
    [
      [x + 1, y],
      [x + 1, y - 1],
      [x, y - 1],
      [x - 1, y - 1],
      [x - 1, y],
      [x - 1, y + 1],
      [x, y + 1],
      [x + 1, y + 1]
    ]
      .map(x => sums[x])
      .filter(Boolean)
      .reduce((a, b) => a + b, 0) || 1
  )
}

function distanceTo1 (n) {
  return spiral(n)
    .map(Math.abs)
    .reduce((a, b) => a + b)
}

function spiral (n) {
  spiral.matrix = { 1: [0, 0] }
  let x = 0
  let r = 1
  while (r < n) {
    r = walk(x++, r, spiral.matrix)
  }
  return spiral.matrix[n] || [0, 0]
}

function walk (x, n, matrix) {
  let y = x
  const iteration = x + 1
  const save = () => (matrix[++n] = [x, y])
  x++
  matrix[++n] = [x, y]
  for (let i = 0; i < 2 * iteration - 1; i++) {
    y--
    save()
  }
  for (let i = 0; i < 2 * iteration; i++) {
    x--
    save()
  }
  for (let i = 0; i < 2 * iteration; i++) {
    y++
    save()
  }
  for (let i = 0; i < 2 * iteration; i++) {
    x++
    save()
  }
  return n
}
