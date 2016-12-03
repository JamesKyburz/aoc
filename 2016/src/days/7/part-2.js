module.exports = (inputs) => {
  return inputs
  .split('\n')
  .filter(Boolean)
  .reduce((sum, line) => {
    let sequences = line
      .match(/\[*[a-z]*]*/g)
      .filter(Boolean)

    let subnets = sequences.filter(isBracket)
    let supernets = sequences.filter(notBracket)

    let allBabs = supernets
      .map(babs)
      .reduce((sum, value) => {
        sum.push.apply(sum, value)
        return sum
      }, [])

    let bab

    console.log('going to check for', allBabs)

    while ((bab = allBabs.pop()) != null) {
      if (subnets.filter((x) => x.match(new RegExp(bab))).length) {
        console.log('found %s in subnets %s', bab, subnets)
        return sum + 1
      }
    }
    return sum
  }, 0)
}

function isBracket (x) {
  return x[0] === '['
}

function notBracket (x) {
  return x[0] !== '['
}

function babs (x) {
  x = x.match(/[a-z]+/)[0]
  let i = 0
  let result = []
  while (i <= x.length - 3) {
    let word = x.slice(i).slice(0, 3)
    if (word[0] === word[2] &&
        word[0] !== word[1]) {
      result.push(word[1] + word[0] + word[1])
    }
    ++i
  }
  return result
}
