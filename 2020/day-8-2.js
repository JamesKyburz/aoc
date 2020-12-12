let instructions = [...require('./read')(__filename)]
const originalInstructions = [...instructions]

let accumulator = 0
let at = 0
let seen = {}
let swapIndex = 0

while (at < instructions.length) {
  const [, op, n] = instructions[at].match(/(\w+) ([+-]\d+)/)
  const duplicate = seen[`${at}:${op}${n}`]
  if (duplicate) {
    swapIndex += originalInstructions
      .slice(swapIndex)
      .findIndex(x => /^(jmp|nop)/.test(x) && !/nop [+-]0/.test(x))
    instructions = [...originalInstructions]
    const instruction = instructions[swapIndex]
    if (instruction.startsWith('nop')) {
      instructions[swapIndex] = instruction.replace('nop', 'jmp')
    } else {
      instructions[swapIndex] = instruction.replace('jmp', 'nop')
    }
    swapIndex++
    accumulator = 0
    at = 0
    seen = {}
  } else {
    if (op === 'acc') {
      accumulator += Number(n)
    }
    if (duplicate) {
      console.log(accumulator)
      break
    } else {
      seen[`${at}:${op}${n}`] = 1
    }
    if (op === 'jmp') {
      at += Number(n)
    } else {
      at++
    }
  }
}

console.log(accumulator)
