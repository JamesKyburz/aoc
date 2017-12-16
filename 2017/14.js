const { knot } = require('./10.js')

for (const { input, expected, solution } of [
  { input: 'flqrgnkx', expected: 8108, solution: bitCount },
  { input: 'ffayrhll', expected: 8190, solution: bitCount },
  { input: 'flqrgnkx', expected: 1242, solution: groupCount },
  { input: 'ffayrhll', expected: 1134, solution: groupCount }
]) {
  const actual = solution(input)
  if (actual !== expected) console.error(`${actual} !== ${expected}`)
}

function bitCount (input) {
  let onbitCount = 0

  for (const i of [...Array(128).keys()]) {
    onbitCount += [...knot(input + '-' + i, 256)].reduce(
      (sum, chr) =>
        sum + [...parseInt(chr, 16).toString(2)].filter(x => x === '1').length,
      0
    )
  }
  return onbitCount
}

function groupCount (input) {
  const matrix = {}
  const size = [...Array(128).keys()]
  for (const y of size) {
    const pad4 = i => '0'.repeat(4 - i.length) + i
    const bits = [...knot(input + '-' + y, 256)].reduce(
      (sum, chr) => sum + pad4(parseInt(chr, 16).toString(2)),
      ''
    )
    for (const x of size) matrix[[x, y]] = [+bits[x]]
  }
  let currentGroup = 0
  for (const y of size) {
    for (const x of size) {
      const cells = [...connected()(matrix, x, y)]
      if (cells.length) {
        const groups = cells.map((x) => x[1]).filter(Boolean)
        if (!groups.length) groups.push(++currentGroup)
        for (const cell of cells) cell[1] = Math.min(...groups)
      }
    }
  }
  const groups = {}
  for (const y of size) {
    for (const x of size) {
      if (matrix[[x, y]][0]) groups[matrix[[x, y]][1]] = 1
    }
  }
  return Object.keys(groups).length
}

function connected () {
  const visited = {}
  return function * steps (matrix, x, y) {
    if (!matrix[[x, y]][0]) return
    if (visited[[x, y]]) return
    visited[[x, y]] = 1
    yield matrix[[x, y]]
    if (matrix[[x + 1, y]] && matrix[[x + 1, y]][0]) yield * steps(matrix, x + 1, y)
    if (matrix[[x - 1, y]] && matrix[[x - 1, y]][0]) yield * steps(matrix, x - 1, y)
    if (matrix[[x, y + 1]] && matrix[[x, y + 1]][0]) yield * steps(matrix, x, y + 1)
    if (matrix[[x, y - 1]] && matrix[[x, y - 1]][0]) yield * steps(matrix, x, y - 1)
  }
}
