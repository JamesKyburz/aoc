'use strict'

const memory = {}
let mask

for (const line of require('./read')(__filename)) {
  const [, newMask] = /^mask = (.+)$/.exec(line) || []
  const [, mem, value] = /^mem\[(\d+)\] = (\d+)$/.exec(line) || []
  if (newMask) {
    mask = newMask
  } else if (mem) {
    const address = [...(+mem).toString(2)]
    const applyMask = [...mask]
    const applied = []
    for (const bit of [...address].reverse()) {
      const applyMaskBit = applyMask.pop()
      applied.unshift(applyMaskBit === 'X' ? 'X' : bit | applyMaskBit)
    }
    for (const address of permutations([...applyMask, ...applied].join(''))) {
      memory[parseInt(address, 2)] = +value
    }
  }
}

function permutations ([...mask]) {
  return [...iterator(mask)]
  function * iterator ([...mask]) {
    if (mask.includes('X')) {
      const x = mask.lastIndexOf('X')
      mask[x] = 0
      yield * iterator(mask)
      mask[x] = 1
      yield * iterator(mask)
    } else {
      yield mask.join('')
    }
  }
}

console.log(Object.values(memory).reduce((a, b) => a + b))
