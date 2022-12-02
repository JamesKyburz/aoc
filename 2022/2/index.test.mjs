import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const input = await readFile('./input.txt', 'utf-8')
const lines = input.split(/\n/)

test('top score', async t => {
  let score = 0
  const outcome = []
  for (const choices of lines) {
    const [x, y] = choices.split(' ')
    const win =
      (x === 'A' && y === 'Y') ||
      (x === 'B' && y === 'Z') ||
      (x === 'C' && y === 'X')
    const draw =
      (x === 'A' && y === 'X') ||
      (x === 'B' && y === 'Y') ||
      (x === 'C' && y === 'Z')
    const loss = !win && !draw
    const shapeValue = {
      X: 1,
      Y: 2,
      Z: 3
    }[y]
    const roundValue = win ? 6 : draw ? 3 : 0
    outcome.push({ x, y, roundValue, win, draw, shapeValue })
  }
  await assert.snapshot(
    outcome.map(x => x.roundValue + x.shapeValue).reduce((a, b) => a + b, 0),
    'top score'
  )
})

test('top score with choice', async t => {
  let score = 0
  const outcome = []
  for (const choices of lines) {
    let [x, y] = choices.split(' ')
    if (y === 'X') {
      if (x === 'A') {
        y = 'Z'
      } else if (x === 'B') {
        y = 'X'
      } else if (x === 'C') {
        y = 'Y'
      }
    } else if (y === 'Y') {
      if (x === 'A') {
        y = 'X'
      } else if (x === 'B') {
        y = 'Y'
      } else if (x === 'C') {
        y = 'Z'
      }
    } else if (y === 'Z') {
      if (x === 'A') {
        y = 'Y'
      } else if (x === 'B') {
        y = 'Z'
      } else if (x === 'C') {
        y = 'X'
      }
    }
    const win =
      (x === 'A' && y === 'Y') ||
      (x === 'B' && y === 'Z') ||
      (x === 'C' && y === 'X')
    const draw =
      (x === 'A' && y === 'X') ||
      (x === 'B' && y === 'Y') ||
      (x === 'C' && y === 'Z')
    const loss = !win && !draw
    const shapeValue = {
      X: 1,
      Y: 2,
      Z: 3
    }[y]
    const roundValue = win ? 6 : draw ? 3 : 0
    outcome.push({ x, y, roundValue, win, draw, shapeValue })
  }
  await assert.snapshot(
    outcome.map(x => x.roundValue + x.shapeValue).reduce((a, b) => a + b, 0),
    'top score with choice'
  )
})
