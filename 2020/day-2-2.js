const input = require('./read')(__filename).splitNewline()

let valid = 0

for (const line of input) {
  const parse = /^(\d+)-(\d+) ([a-z]): ([a-z]+)$/
  const match = line.match(parse)
  const [x, y] = [match[1], match[2]].map(Number).map(x => --x)
  const letter = match[3]
  const password = [...match[4]]
  if (password[x] === letter && password[y] !== letter) {
    valid++
  } else if (password[y] === letter && password[x] !== letter) {
    valid++
  }
}

console.log(valid)
