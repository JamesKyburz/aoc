'use strict'

const input = require('./read')(__filename)
const ranges = getRanges(input)
const invalid = []

for (const ticket of getNearbyTickets(input)) {
  if (
    !Object.entries(ranges).some(([type, value]) =>
      value.some(fn => fn(ticket))
    )
  ) {
    invalid.push(ticket)
  }
}

console.log(invalid.reduce((a, b) => a + b, 0))

function getRanges ([...input]) {
  const group = {}
  for (const line of input) {
    const matches = line.match(/\d+-\d+/g)
    if (matches) {
      const [type] = line.split(':')
      group[type] = matches.flatMap(x => {
        const [min, max] = x.split('-').map(Number)
        return n => {
          return n >= min && n <= max
        }
      })
    } else {
      break
    }
  }
  return group
}

function getNearbyTickets ([...input]) {
  const index = input.findIndex(x => x.startsWith('nearby tickets:'))
  return input
    .slice(index + 1)
    .flatMap(x => x.split(',').map(Number))
    .filter(x => !isNaN(x))
}
