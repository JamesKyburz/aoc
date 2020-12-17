const jolts = require('./read')(__filename)
  .mapNumber()
  .value()

let rating = 0
jolts.push(Math.max(...jolts) + 3)

const compatibles = {
  1: [],
  2: [],
  3: []
}

const diffs = []

for (const _ of jolts) {
  const matches = []
  for (const other of jolts) {
    const diff = other - rating
    if (diff >= 1 && diff <= 3) {
      matches.push(other)
    }
  }
  if (matches.length) {
    const match = matches.sort((a, b) => a - b)[0]
    const diff = match - rating
    compatibles[diff].push(match)
    diffs.push(diff)
    rating = match
  }
}

console.log(compatibles[1].length * compatibles[3].length)

console.log(
  diffs
    .join('')
    .match(/[1]+/g)
    .reduce(
      (sum, { length: n }) =>
        sum *
        ({
          3: 4,
          4: 7,
          5: 13
        }[n] || n),
      1
    )
)
