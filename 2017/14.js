const { knot } = require('./10.js')

for (const { input, expected, solution } of [
  { input: 'flqrgnkx', expected: 8108, solution: count },
  { input: 'ffayrhll', expected: 8190, solution: count }
]) {
  const actual = solution(input)
  if (actual !== expected) console.error(`${actual} !== ${expected}`)
}

function count (input) {
  let onCount = 0

  for (const i of [...Array(128).keys()]) {
    onCount += [...knot(input + '-' + i, 256)]
      .reduce((sum, chr) => sum + [...parseInt(chr, 16).toString(2)].filter(x => x === '1').length
        , 0)
  }
  return onCount
}
