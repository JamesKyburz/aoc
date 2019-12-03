const input = require('./read')(__filename)
  .splitComma()
  .mapNumber()
  .value()

const calculate = (x, y) => {
  const numbers = [...input]
  numbers[1] = x
  numbers[2] = y

  for (const [opcode, x, y, z] of next(numbers)) {
    if (opcode === 1) {
      numbers[z] = numbers[x] + numbers[y]
    } else if (opcode === 2) {
      numbers[z] = numbers[x] * numbers[y]
    } else if (opcode === 99) {
      break
    } else {
      throw new Error('invalid opcode')
    }
  }
  return numbers[0]
}

console.log(calculate(12, 2))

for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 100; j++) {
    const output = calculate(i, j)
    if (output === 19690720) {
      console.log(100 * i + j)
    }
  }
}

function * next (numbers) {
  numbers = [...numbers]
  while (numbers.length) {
    yield [...numbers.splice(0, 4)]
  }
}
