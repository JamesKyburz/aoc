module.exports = (input) => {
  let marker = ''
  let characters = input.match(/./g)
  let sum = 0

  while (characters.length) {
    let chr = characters.shift()
    if (chr === ' ') continue
    if (chr === '(') {
      marker = chr
    } else if (chr === ')') {
      marker += chr
      let [ range, repeat ] = marker.match(/\d+/g).map(Number)
      let sequence = characters.splice(0, range).join('')

      if (sequence.match(/\(/)) {
        sum += (repeat * module.exports(sequence, true))
      } else {
        let result = Array(repeat + 1).join(sequence)
        sum += result.length
      }

      marker = ''
    } else if (marker) {
      marker += chr
    } else {
      sum++
    }
  }

  return sum
}
