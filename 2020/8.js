const instructions = [...require('./read')(__filename)]

let accumulator = 0
let at = 0
const seen = {}

while (true) {
  const [, op, n] = instructions[at].match(/(\w+) ([+-]\d+)/)
  const duplicate = seen[`${at}:${op}${n}`]
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
