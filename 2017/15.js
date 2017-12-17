function judge (startA, startB, count, multipleA, multipleB) {
  const a = gen(startA, 16807, multipleA)
  const b = gen(startB, 48271, multipleB)
  let sameCount = 0
  while (--count) {
    if (a.next().value === b.next().value) sameCount++
  }
  return sameCount
}

function * gen (previous, factor, multiple) {
  while (true) {
    const n = previous * factor
    const r = n % 2147483647
    previous = r
    if (r % multiple !== 0) continue
    yield r.toString(2).slice(-16)
  }
}

if (judge(65, 8921, 5, 1, 1) !== 1) console.log('error judge count')
if (judge(289, 629, 40000000, 1, 1) !== 638) console.log('error judge count')
if (judge(289, 629, 5000000, 4, 8) !== 343) console.log('error judge count')
