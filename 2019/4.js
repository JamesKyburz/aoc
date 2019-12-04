const input = [...range(147981, 691423)]

console.log(input.filter(part1).length)
console.log(input.filter(part2).length)

function part1 (number) {
  const digits = [...number.toString()]
  return (
    [...digits].sort((a, b) => a - b).join() === digits.join() &&
    [...new Set(digits)].length !== 6
  )
}

function part2 (number) {
  const digits = [...number.toString()]
  return (
    [...digits].sort((a, b) => a - b).join() === digits.join() &&
    digits.find(digit => digits.filter(x => x === digit).length === 2)
  )
}

function * range (from, to) {
  for (let i = from; i <= to; i++) yield i
}
