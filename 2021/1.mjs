import fs from 'node:fs/promises'

const input = await fs.readFile('input.txt', 'utf-8')

const numbers = input
  .split(/\n/)
  .filter(Boolean)
  .map(Number)

{
  // part1

  let l = 0
  let i = 0

  for (const x of numbers) {
    if (x > l && l) i++
    l = x
  }

  console.log(`1228? ${i}`)
}

{
  // part 2

  let l = 0
  let i = 0

  for (const x of numbers.map((n, i) =>
    numbers.slice(i, i + 3).reduce((a, b) => a + b)
  )) {
    if (x > l && l) i++
    l = x
  }

  console.log(`1257? ${i}`)
}
