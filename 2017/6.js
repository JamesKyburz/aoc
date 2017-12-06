for (const { input, expected, solution } of [
  { input: [0, 2, 7, 0], expected: 5, solution: realloc1 },
  { input: realloc1([0, 2, 7, 0]).input, expected: 5, solution: realloc1 },
  { input: [11, 11, 13, 7, 0, 15, 5, 5, 4, 4, 1, 1, 7, 1, 15, 11], expected: 4074, solution: realloc1 },
  { input: realloc1([11, 11, 13, 7, 0, 15, 5, 5, 4, 4, 1, 1, 7, 1, 15, 11]).input, expected: 2794, solution: realloc1 }
]) {
  const actual = solution(input).count
  if (actual !== expected) throw new Error(`${actual} !== ${expected} for ${input}`)
}

function realloc1 (input) {
  input = [...input]
  const seen = {}
  let count = 0
  while (true) {
    const i = identify()
    const blocks = input[i]
    reallocBlocks(i, blocks)
    count++
    if (seen[input]) return { count, input }
    seen[input] = true
  }
  function identify () {
    const max = Math.max(...input)
    return input.findIndex(x => x === max)
  }
  function reallocBlocks (i, blocks) {
    input[i] = 0
    for (let j = 0; j < blocks; j++) {
      input[(j + i + 1) % input.length]++
    }
  }
}
