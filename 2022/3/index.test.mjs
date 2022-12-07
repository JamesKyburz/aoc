import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import eachSlice from './each-slice.mjs'

const input = await readFile('./input.txt', 'utf-8')
const lines = input.split(/\n/)

test('rucksack sum', async t => {
  const duplicates = []
  const chars = []
  for (const line of lines) {
    const part1 = [...line.slice(0, line.length / 2)]
    const part2 = [...line.slice(line.length / 2)]
    for (const c of part1) {
      if (part2.includes(c)) {
        duplicates.push(
          /[a-z]/.test(c) ? c.charCodeAt(0) - 97 + 1 : c.charCodeAt(0) - 65 + 27
        )
        break
      }
    }
  }
  const sum = duplicates.reduce((a, b) => a + b, 0)
  await assert.snapshot(sum, 'rucksack sum')
})

test('rucksack group sum', async t => {
  const duplicates = []
  for (const batch of eachSlice({ items: lines, size: 3 })) {
    const parts = batch.map(line => [...line])
    for (const c of parts[0]) {
      if (parts[1].includes(c) && parts[2].includes(c)) {
        duplicates.push(
          /[a-z]/.test(c) ? c.charCodeAt(0) - 97 + 1 : c.charCodeAt(0) - 65 + 27
        )
        break
      }
    }
  }
  const sum = duplicates.reduce((a, b) => a + b, 0)
  await assert.snapshot(sum, 'rucksack group sum')
})
