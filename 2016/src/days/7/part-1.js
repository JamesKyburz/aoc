module.exports = (inputs) => {
  return inputs
  .split('\n')
  .filter(Boolean)
  .reduce((sum, line) => {
    let sequences = line
      .match(/\[*[a-z]*]*/g)
      .filter(Boolean)

    let brackets = sequences.filter(isBracket)

    if (brackets.filter(abba).length) return sum

    let nonBrackets = sequences.filter(notBracket)
    if (nonBrackets.filter(abba).length) return sum + 1
    return sum
  }, 0)
}

function isBracket (x) {
  return x[0] === '['
}

function notBracket (x) {
  return x[0] !== '['
}

function abba (x) {
  x = x.match(/[a-z]+/)[0]
  let i = 0
  while (i <= x.length - 4) {
    let word = x.slice(i).slice(0, 4)
    if (word[0] === word[3] &&
            word[1] === word[2] &&
            word[0] !== word[1]) {
      return true
    }
    ++i
  }
}

