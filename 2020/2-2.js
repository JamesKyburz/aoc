const input = require('./read')(__filename)

let valid = 0

for (const line of input) {
  const parse = /^(\d+)-(\d+) ([a-z]): ([a-z]+)$/
  const match = line.match(parse)
  const [x, y] = [match[1], match[2]].map(Number).map(x => --x)
  const letter = match[3]
  const password = [...match[4]]
  if ([password[x], password[y]].filter(x => x === letter).length === 1) {
    valid++
  }
}

console.log(valid)
