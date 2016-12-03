module.exports = sum

function sum (inputs) {
  return inputs.split('\n')
  .filter(Boolean)
  .reduce((sum, line) => {
    const letters = line.match(/([a-z]+)/g)
    const [ id, checksum ] = line.match(/(\d+)\[([a-z]+)]/).slice(1)
    if (valid(letters, checksum)) return sum + (+id)
    return sum
  }, 0)
}

function valid (letterArray, checksum) {
  let counter = {}
  letterArray.forEach((item) => {
    item.match(/./g)
    .forEach((letter) => {
      counter[letter] = counter[letter] || 0
      counter[letter]++
    })
  })

  let exclude = []
  let actual = ''

  let grouped = Object.keys(counter)
  .sort((a, b) => counter[b] - counter[a])
  .reduce((sum, key) => {
    let value = counter[key]
    let matches = Object.keys(counter).filter((x) => counter[x] === value)
    .filter((x) => exclude.indexOf(x) === -1)
    .sort()
    exclude.push.apply(exclude, matches)
    sum.push(matches)
    return sum
  }, [])

  grouped.forEach((group) => {
    actual += group.join('')
  })

  actual = actual.slice(0, 5)

  return actual === checksum
}
