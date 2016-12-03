const crypto = require('crypto')

module.exports = (input) => {
  let sequence = 0
  let hits = 0
  let characters = []
  while (true) {
    var hash = md5(input, sequence)
    if (hash.slice(0, 5) === '00000') {
      let position = +hash[5]
      if (position >= 0 && position <= 7 && typeof characters[position] === 'undefined') {
        hits++
        characters[position] = hash[6]
      }
    }
    if (hits === 8) break
    sequence++
  }
  return characters.join('')
}

function md5 (input, sequence) {
  return crypto.createHash('md5')
    .update(`${input}${sequence}`)
    .digest('hex')
}
