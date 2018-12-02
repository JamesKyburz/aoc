;(async () => {
  const input = (await require('./input')('1/input'))
    .split(/\n/)
    .slice(0, -1)
    .map(Number)

  const sum = input.reduce((a, b) => a + b, 0)
  console.log('answer 1', sum)
  const seen = {}
  let n = 0

  while (true) {
    for (const value of input) {
      n += value
      if (seen[n]) {
        console.log('answer 2', n)
        process.exit(0)
      }
      seen[n] = 1
    }
  }
})()
