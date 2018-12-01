const fetch = require('node-fetch')
const fs = require('fs')
const session = fs.readFileSync('./session', 'utf-8')

module.exports = async relative => {
  const res = await fetch('https://adventofcode.com/2018/day/' + relative)
  return res.text()
}


