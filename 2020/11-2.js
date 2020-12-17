'use strict'

const rows = [...require('./read')(__filename)].map(x => [...x])
const readline = require('readline')

const { stdout } = process

const cursorTo = (x, y) => readline.cursorTo(stdout, x, y)
const clearScreenDown = () => readline.clearScreenDown(stdout)

const ESC = String.fromCharCode(27)

cursorTo(0, 0)
clearScreenDown()

run().catch(console.error)

async function run () {
  while (true) {
    const changes = []
    clearScreenDown()

    for (const y of [...Array(rows.length).keys()]) {
      cursorTo(0, y)
      for (const x of [...Array(rows[y].length).keys()]) {
        if (rows[y][x] === 'L' && occupied(x, y) === 0) {
          changes.push([x, y, '#'])
        } else if (rows[y][x] === '#' && occupied(x, y) > 4) {
          changes.push([x, y, 'L'])
        }
        const value = rows[y][x]
        const escape =
          ESC +
          {
            '.': '[1m',
            '#': '[1;92m',
            L: '[1;94m'
          }[value]
        stdout.write(`${escape}${value}`)
      }
    }

    stdout.write(`${ESC}[0m\n`)

    if (changes.length) {
      for (const [x, y, value] of changes) {
        rows[y][x] = value
      }
    } else {
      break
    }
    await new Promise(resolve => setTimeout(resolve, 150))
  }

  console.log(
    'occupied',
    rows.reduce(
      (sum, cols) => sum + cols.filter(value => value === '#').length,
      0
    )
  )
}

function occupied (x, y) {
  const seeRowE = (() => {
    let rx = x - 1

    while (rx >= 0) {
      if (rows[y][rx] === 'L') return 0
      if (rows[y][rx] === '#') return 1
      rx--
    }
    return 0
  })()

  const seeRowW = (() => {
    let rx = x + 1

    while (rx < rows[y].length) {
      if (rows[y][rx] === 'L') return 0
      if (rows[y][rx] === '#') return 1
      rx++
    }
    return 0
  })()

  const seeColE = (() => {
    let ry = y - 1

    while (ry >= 0) {
      if (rows[ry][x] === 'L') return 0
      if (rows[ry][x] === '#') return 1
      ry--
    }
    return 0
  })()

  const seeColW = (() => {
    let ry = y + 1

    while (ry < rows.length) {
      if (rows[ry][x] === 'L') return 0
      if (rows[ry][x] === '#') return 1
      ry++
    }
    return 0
  })()

  const seeNw = (() => {
    let rx = x - 1
    let ry = y - 1

    while (rx >= 0 && ry >= 0) {
      if (rows[ry][rx] === 'L') return 0
      if (rows[ry][rx] === '#') return 1
      rx--
      ry--
    }
    return 0
  })()

  const seeNe = (() => {
    let rx = x + 1
    let ry = y - 1

    while (ry >= 0) {
      if (rows[ry][rx] === 'L') return 0
      if (rows[ry][rx] === '#') return 1
      rx++
      ry--
    }
    return 0
  })()

  const seeSw = (() => {
    let rx = x - 1
    let ry = y + 1

    while (rx >= 0 && ry < rows.length) {
      if (rows[ry][rx] === 'L') return 0
      if (rows[ry][rx] === '#') return 1
      rx--
      ry++
    }
    return 0
  })()

  const seeSe = (() => {
    let rx = x + 1
    let ry = y + 1

    while (ry < rows.length) {
      if (rows[ry][rx] === 'L') return 0
      if (rows[ry][rx] === '#') return 1
      rx++
      ry++
    }
    return 0
  })()

  return seeRowE + seeRowW + seeColE + seeColW + seeNe + seeNw + seeSe + seeSw
}
