module.exports = (inputs, cb) => {
  let registers = [ 'a', 'b', 'c', 'd' ]
  .reduce((sum, name) => {
    sum[name] = register(name)
    return sum
  }, {})
  let instructions = inputs.split('\n')
  .filter(Boolean)

  next(0)

  function next (i) {
    if (i === instructions.length) {
      return cb({ registers })
    }
    let instruction = instructions[i]
    let command = instruction.slice(0, 3)
    if (command === 'cpy') {
      let source = registers[instruction.slice(4, 5)]
      let register = registers[instruction.match(/[a-d]$/)[0]]
      let value = source ? source.value() : Number(instruction.match(/\d+/))
      register.cpy(value)
    }
    if (command === 'dec') {
      let register = registers[instruction.match(/[a-d]$/)[0]]
      register.dec()
    }
    if (command === 'inc') {
      let register = registers[instruction.match(/[a-d]$/)[0]]
      register.inc()
    }
    if (command === 'jnz') {
      let register = registers[instruction.slice(4, 5)]
      let numbers = instruction.match(/-?\d+/g).map(Number)
      let move = numbers.slice(-1)[0] - 1
      let value = register ? register.value() : numbers[0]
      if (value !== 0) i += move
    }
    process.nextTick(next.bind(null, i + 1))
  }

}

function register (name) {
  let current = 0
  return { cpy, inc, dec, value }
  function value() { return current }
  function inc () { current++ }
  function dec () { current-- }
  function cpy (value) { current = value }
}
