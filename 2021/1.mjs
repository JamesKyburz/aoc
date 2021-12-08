import fs from 'node:fs/promises'

const input = await fs.readFile('input.txt', 'utf-8')

const numbers = input
  .split(/\n/)
  .filter(Boolean)
  .map(Number)

{
  // part1
  console.log(
    `1228? ${numbers.reduce(
      (sum, _, i, a) => (a[i + 1] > a[i] ? sum + 1 : sum),
      0
    )}`
  )
}

{
  // part 2
  console.log(
    `1257? ${numbers
      .map((n, i) => numbers.slice(i, i + 3).reduce((a, b) => a + b))
      .reduce((sum, _, i, a) => (a[i + 1] > a[i] ? sum + 1 : sum), 0)}`
  )
}
