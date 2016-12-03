module.exports = decrypter

function decrypter (inputs, match) {
  return inputs.split('\n')
  .filter(Boolean)
  .reduce((sum, line) => {
    const letters = line.match(/([a-z]+)/g).slice(0, -1).join('-')
    const [ id ] = line.match(/(\d+)\[([a-z]+)]/).slice(1)
    if (match === decode(letters, +id, match)) sum += (+id)
    return sum
  }, 0)
}

function decode (letters, id, match) {
  return letters.match(/./g)
  .map((x) => {
    if (x === '-') return ' '
    let code = x.charCodeAt(0)
    return String.fromCharCode(97 + ((code - 97 + id) % 26))
  }).join('')
}
