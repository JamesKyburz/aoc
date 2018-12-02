const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')

const session = encodeURIComponent(fs.readFileSync(path.join(__dirname, '.session'), 'utf-8'))

module.exports = async relative => {
  const res = await fetch('https://adventofcode.com/2018/day/' + relative, {
    method: 'GET',
    headers: {
      cookie: `session=${session};`
    }
  })
  return res.text()
}
