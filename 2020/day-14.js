'use strict'

let memory = {}
let mask

for (const line of require('./read')(__filename)) {
  const [, newMask] = /^mask = (.+)$/.exec(line) || []
  const [, mem, value] = /^mem\[(\d+)\] = (\d+)$/.exec(line) || []
  if (newMask) {
    mask = newMask
  } else if (mem) {
    const bits = [...(+value).toString(2)]
    const applyMask = [...mask]
    const maskedBits = []
    for (const bit of bits.reverse()) {
      const bitMask = applyMask.pop()
      if (bitMask === 'X') {
        maskedBits.unshift(bit)
      } else {
        maskedBits.unshift(bitMask)
      }
    }

    if (applyMask.some(x => x === '1')) {
      maskedBits.unshift(
        ...applyMask
          .slice(applyMask.findIndex(x => x === '1'))
          .map(x => (x === 'X' ? 0 : x))
      )
    }

    memory[mem] = parseInt(maskedBits.join(''), 2)
  }
}

console.log(Object.values(memory).reduce((a, b) => a + b))
