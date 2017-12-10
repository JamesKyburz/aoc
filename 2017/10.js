const createList = n => [...Array(n)].map((_, i) => i)

for (const { input, size, expected, solution } of [
  { input: [3, 4, 1, 5], size: 5, solution: sum, expected: 12 },
  {
    input: [
      102,
      255,
      99,
      252,
      200,
      24,
      219,
      57,
      103,
      2,
      226,
      254,
      1,
      0,
      69,
      216
    ],
    size: 256,
    solution: sum,
    expected: 5577
  },
  {
    input: '1,2,3',
    size: 256,
    solution: hash,
    expected: '3efbe78a8d82f29979031a4aa0b16a9d'
  },
  {
    input: `102,255,99,252,200,24,219,57,103,2,226,254,1,0,69,216`,
    size: 256,
    solution: hash,
    expected: '3efbe78a8d82f29979031a4aa0b16a9d'
  }
]) {
  const actual = solution(input, size)
  if (actual !== expected) console.error(`${actual} !== ${expected}`)
}

function sum (input, size) {
  const list = createList(size)
  let skip = 0
  let current = 0
  for (const n of input) {
    const indices = createList(n).map((_, i) => (current + i) % list.length)
    const sublist = indices.map(n => list[n]).reverse()
    indices.forEach((i, j) => (list[i] = sublist[j]))
    current += n + skip
    skip++
  }
  return list[0] * list[1]
}

function hash (input, size) {
  const hex = n => {
    const h = n.toString(16)
    return h.length === 1 ? '0' + h : h
  }
  input = [...input.trim()]
    .map(x => x.charCodeAt(0))
    .concat([17, 31, 73, 47, 23])
  const list = createList(size)
  let skip = 0
  let current = 0
  for (let rounds = 0; rounds < 64; rounds++) {
    for (const n of input) {
      const indices = createList(n).map((_, i) => (current + i) % list.length)
      const sublist = indices.map(n => list[n]).reverse()
      indices.forEach((i, j) => (list[i] = sublist[j]))
      current += n + skip
      current = current % list.length
      skip++
    }
  }
  const xorList = []
  for (let i = 0; i < 16; i++) {
    const xor = list.slice(16 * i, (16 * i) + 16).reduce((a, b) => a ^ b)
    xorList.push(xor)
  }
  return xorList.map(hex).join('')
}
