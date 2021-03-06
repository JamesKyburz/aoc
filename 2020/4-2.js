const input = require('./read')(__filename)

console.log([...records(input)].filter(isValid).length)

function * records (input) {
  let record
  for (const line of input) {
    if (line.length) {
      record = {
        ...record,
        ...line
          .split(' ')
          .map(pair => pair.split(':'))
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
  const between = (min, max) => value =>
    Number(value) >= min && Number(value) <= max
  const checks = {
    byr: between(1920, 2002),
    iyr: between(2010, 2020),
    eyr: between(2020, 2030),
    hgt: value => {
      const [, height, type] = value.match(/^(\d+)(in|cm)$/) || []
      if (!type) return
      return between(
        ...{
          cm: [150, 193],
          in: [59, 76]
        }[type]
      )(height)
    },
    hcl: value => /^#[0-9a-f]{6}$/.test(value),
    ecl: value =>
      ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value),
    pid: value => /^\d{9}$/.test(value),
    cid: () => true
  }
  return ['ecl', 'pid', 'eyr', 'hcl', 'byr', 'iyr', 'hgt'].every(
    field => record[field] && checks[field](record[field])
  )
}
