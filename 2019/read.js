const fs = require('fs')

module.exports = parent => {
  let input = fs.readFileSync(txtName(parent), 'utf-8')
  const helpers = {
    value () {
      return input
    },
    splitComma () {
      input = input.split(/,/)
      return helpers
    },
    splitNewline () {
      input = input.split(/\n/)
      return helpers
    },
    mapNumber () {
      input = input.map(Number)
      return helpers
    }
  }
  return helpers
}

function txtName (parent) {
  if (process.env.TEST) return parent.replace(/\..*$/, '.test')
  return parent.replace(/\..*$/, '.txt')
}
