const rows = [...require('./read')(__filename)].map(x => [...x])
const readline = require('readline')

const { stdout } = process

const cursorTo = (x, y) => readline.cursorTo(stdout, x, y)
const clearScreenDown = () => readline.clearScreenDown(stdout)

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
        } else if (rows[y][x] === '#' && occupied(x, y) > 3) {
          changes.push([x, y, 'L'])
        }
        const value = rows[y][x]
        const escape = '\033' + {
          '.': '[1m',
          '#': '[1;92m',
          'L': '[1;94m'
        }[value]
        stdout.write(`${escape}${value}`)
      }
    }

    stdout.write('\033[0m\n')

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
  return [
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
    [x - 1, y],
    [x + 1, y],
    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1]
  ].filter(([x, y]) => rows[y] && rows[y][x] === '#').length
}
