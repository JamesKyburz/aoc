const input = require('./read')(__filename)

let trees = 0
let x = 0
let y = 0

for (const [...line] of input) {
  if (!line.length) continue
  if (y++ === 0) {
    x += 3
  } else {
    const pattern = [...line]
    while (x + 3 > line.length) {
      line.push(...pattern)
    }
    if (line[x] === '#') {
      trees++
      line[x] = 'X'
    } else {
      line[x] = 'O'
    }
    x += 3
  }
  if (process.env.DEBUG) {
    console.log(line.join(''))
  }
}

console.log(trees)
