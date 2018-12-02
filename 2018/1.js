;(async () => {
  const input = (await require('./input')('1/input'))
    .split(/\n/)
    .slice(0, -1)
    .map(Number)

  const seen = {}
  let n = 0
  let sameFrequency
  let rounds = 0

  while (!sameFrequency) {
    for (const value of input) {
      n += value
      if (seen[n]) {
        sameFrequency = true
        console.log('answer 2', n)
        break
      }
      seen[n] = 1
    }
    rounds++
    if (rounds === 1) {
      console.log('answer 1', n)
    }
  }
})()
