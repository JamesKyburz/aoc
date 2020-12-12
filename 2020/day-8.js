const instructions = [...require('./read')(__filename)]

let accumulator = 0
let at = 0
const seen = {}

const ops = {
  nop (n) {
    if (seen[`${at}:nop${n}`]) return false
    seen[`${at}:nop${n}`] = 1
    at++
    return true
  },
  acc (n) {
    if (seen[`${at}:acc{n}`]) return false
    seen[`${at}:acc{n}`] = 1
    accumulator += n
    at++
    return true
  },
  jmp (n) {
    if (seen[`${at}:jmp{n}`]) return false
    seen[`${at}:jmp{n}`] = 1
    at = at + n
    at = at % instructions.length
    return true
  }
}

while (true) {
  const [, op, n] = instructions[at].match(/(\w+) ([+-]\d+)/)
  const valid = ops[op](Number(n))
  if (!valid) {
    console.log(accumulator)
    break
  }
}
