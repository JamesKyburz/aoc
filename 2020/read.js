const fs = require('fs')
const path = require('path')

module.exports = parent => {
  let input = fs.readFileSync(txtName(parent), 'utf-8')
  const helpers = {
    * [Symbol.iterator] () {
      if (!Array.isArray(input)) {
        helpers.splitNewline()
      }
      for (const value of input) {
        yield value
      }
    },
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
      if (!Array.isArray(input)) {
        helpers.splitNewline()
      }
      input = input.map(Number)
      return helpers
    }
  }
  return helpers
}

function txtName (parent) {
  const name = path.join(
    __dirname,
    '/input',
    process.env.TEST
      ? path.basename(parent).replace(/\..*$/, '.test')
      : path.basename(parent).replace(/\..*$/, '.txt')
  )
  try {
    if (fs.statSync(name)) {
      return name
    }
  } catch (_) {
    return name.replace(/-2/, '')
  }
}
