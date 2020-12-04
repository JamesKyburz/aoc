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
  const checks = {
    byr: value => Number(value) >= 1920 && Number(value) <= 2002,
    iyr: value => Number(value) >= 2010 && Number(value) <= 2020,
    eyr: value => Number(value) >= 2020 && Number(value) <= 2030,
    hgt: value => {
      const type = value.split(/\d+/)[1]
      const height = parseInt(value, 10)
      if (type === 'cm') {
        return height >= 150 && height <= 193
      } else if (type === 'in') {
        return height >= 59 && height <= 76
      }
    },
    hcl: value => /^#[0-9a-f]{6}$/.test(value),
    ecl: value => /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(value),
    pid: value => /^\d{9}$/.test(value),
    cid: () => true
  }
  return ['ecl', 'pid', 'eyr', 'hcl', 'byr', 'iyr', 'hgt'].every(
    field => record[field] && checks[field](record[field])
  )
}
