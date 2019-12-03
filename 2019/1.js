const input = require('./read')(__filename)
  .splitNewline()
  .mapNumber()
  .value()

const calcFuel = x => Math.floor(x / 3) - 2
const sum = (x, y) => x + y

const fuel = input.map(calcFuel).map(total => {
  let left = calcFuel(total)
  while (left > 0) {
    total += left
    left = calcFuel(left)
  }
  return total
})

console.log(input.map(calcFuel).reduce(sum))
console.log(fuel.reduce(sum))
