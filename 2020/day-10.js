const jolts = require('./read')(__filename)
  .mapNumber()
  .value()
//  .sort((a, b) => a - b)

let rating = 0
jolts.push(Math.max(...jolts) + 3)

const compatibles = {
  1: [],
  2: [],
  3: []
}

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
    rating = match
  }
}

console.log(compatibles[1].length * compatibles[3].length)

//console.log(JSON.stringify(compatibles, null, 2))
