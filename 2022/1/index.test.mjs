import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const input = await readFile('./input.txt', 'utf-8')
const lines = input.split(/\n/)

test('most calories', async t => {
  await assert.snapshot(topCalories()[0], 'top elf')
})

test('top 3 calories', async t => {
  await assert.snapshot(
    topCalories()
      .slice(0, 3)
      .reduce((a, b) => a + b, 0),
    'top 3 elves'
  )
})

function topCalories () {
  const calories = []
  let elf = 0
  for (const line of lines) {
    if (!line.length) {
      elf++
      continue
    }
    calories[elf] = calories[elf] ?? []
    calories[elf].push(Number(line))
  }
  const count = calories.map(calories => calories.reduce((a, b) => a + b, 0))
  const top = [...count].sort((a, b) => b - a)
  return top
}
