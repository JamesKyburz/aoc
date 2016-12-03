const path = require('path')
const fs = require('fs')

module.exports = ({ day, example, part }) => {
  const filename = `${day}${(part ? '-part' + part : '')}${(example ? '-example' : '')}.txt`
  const fixture = path.join(__dirname, `../fixtures/${filename}`)
  return new Promise((resolve, reject) => {
    fs.readFile(fixture, 'utf-8', (err, data) => {
      if (err) return reject(err)
      return resolve(data)
    })
  })
}
