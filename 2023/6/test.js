import assert from 'node:assert/strict'
import test from 'node:test'
import part1 from './1.js'
// import part2 from './2.js'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

test(`day ${path.basename(__dirname)}`, async (t) => {
  await t.test('part 1', async t => {
    await t.test('sample', async () => {
      assert.equal(await part1(path.join(__dirname, 'sample-1.txt')), 288)
    })
    // await t.test('input', async () => {
    //   assert.equal(await part1(path.join(__dirname, 'input.txt')), 2269432)
    // })
  })
  // await t.test('part 2', async t => {
  //   await t.test('sample', async () => {
  //     assert.equal(await part2(path.join(__dirname, 'sample-1.txt')), 46)
  //   })
  //   // await t.test('input', async () => {
  //   //   assert.equal(await part2(path.join(__dirname, 'input.txt')), 15290096)
  //   // })
  // })
})
