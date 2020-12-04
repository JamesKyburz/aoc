const input = require('./read')(__filename)

console.log([...records(input)].filter(isValid).length)

function * records (input) {
  let record
  for (const line of input) {
    if (line.length) {
      record = {
        ...record,
        ...line
          .split(/\s+/)
          .map(pair => pair.split(/\s*:\s*/))
          .reduce(
            (sum, [key, value]) => ({ ...sum, [key.trim()]: value.trim() }),
            {}
          )
      }
    } else if (record) {
      yield { ...record }
      record = null
    }
  }
  if (record) yield record
}

function isValid (record) {
  return ['ecl', 'pid', 'eyr', 'hcl', 'byr', 'iyr', 'hgt'].every(
    field => record[field]
  )
}
