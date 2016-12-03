const crypto = require('crypto')

module.exports = (input) => {
  let sequence = 0
  let password = ''
  while (true) {
    var hash = md5(input, sequence)
    if (hash.slice(0, 5) === '00000') {
      password += hash[5]
    }
    if (password.length === 8) break
    sequence++
  }
  return password
}

function md5 (input, sequence) {
  return crypto.createHash('md5')
    .update(`${input}${sequence}`)
    .digest('hex')
}
