const createList = n => [...Array(n)].map((_, i) => i)

for (const { input, size, expected, solution } of [
  { input: [3, 4, 1, 5], size: 5, solution: hash, expected: 12 },
  { input: [102,255,99,252,200,24,219,57,103,2,226,254,1,0,69,216], size: 256, solution: hash, expected: 100 }
]) {
  const actual = solution(input, size)
  if (actual !== expected) console.error(`${actual} !== ${expected}`)
}

function hash (input, size) {
  const list = createList(size)
  let skip = 0
  let current = 0
  for (const n of input) {
    const indices = createList(n).map((_, i) => (current + i) % list.length)
    const sublist = indices.map((n) => list[n]).reverse()
    indices.forEach((i, j) => list[i] = sublist[j])
    current += n + skip
    skip++
  }
  return list[0] * list[1]
}
