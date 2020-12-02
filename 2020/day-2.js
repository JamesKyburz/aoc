const input = require('./read')(__filename).splitNewline()

let valid = 0

for (const line of input) {
  const parse = /^(\d+)-(\d+) ([a-z]): ([a-z]+)$/
  const match = line.match(parse)
  const low = Number(match[1])
  const high = Number(match[2])
  const letter = match[3]
  const password = [...match[4]]
  const { length: count } = password.filter(x => x === letter)
  if (count >= low && count <= high) {
    valid++
  }
}

console.log(valid)
