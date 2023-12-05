import assert from 'node:assert/strict'
import test from 'node:test'
import part1 from './1.js'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

test('day 5', async (t) => {
  await t.test('part 1', async t => {
    await t.test('sample', async () => {
      assert.equal(await part1(path.join(__dirname, 'sample-1.txt')), 35)
    })
    await t.test('input', async () => {
      assert.equal(await part1(path.join(__dirname, 'input.txt')), 424490994)
    })
  })
})
