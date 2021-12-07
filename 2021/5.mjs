import fs from 'node:fs/promises'

const input = await fs.readFile('input.txt', 'utf-8')
const lines = input.split('\n').map(line => line.match(/\d+/g).map(Number))

function * range (a, b) {
  if (b === undefined) {
    yield * [...Array(a).keys()]
  } else if (a > b) {
    while (a >= b) {
      yield a--
    }
  } else {
    while (a <= b) {
      yield a++
    }
  }
}

function count (grid, x, y) {
  if (grid[y] === undefined) {
    grid[y] = []
  }
  if (grid[y][x] === undefined) {
    grid[y][x] = 0
  }
  grid[y][x]++
}

{
  // part 1

  const grid = []
  for (const [x1, y1, x2, y2] of lines) {
    if (x1 === x2) {
      for (const n of range(y1, y2)) {
        count(grid, x1, n)
      }
    } else if (y1 === y2) {
      for (const n of range(x1, x2)) {
        count(grid, n, y1)
      }
    }
  }

  console.log(
    `6572? ${grid.reduce((sum, line) => {
      for (const x of line) {
        if (x > 1) sum++
      }
      return sum
    }, 0)}`
  )
}

{
  // part 2

  const grid = []
  const { abs } = Math
  for (const [x1, y1, x2, y2] of lines) {
    if (x1 === x2) {
      for (const n of range(y1, y2)) {
        count(grid, x1, n)
      }
    } else if (y1 === y2) {
      for (const n of range(x1, x2)) {
        count(grid, n, y1)
      }
    } else {
      const dx = x2 - x1
      const dy = y2 - y1
      for (const n of range(abs(dx) + 1)) {
        count(grid, x1 + n * (dx > 0 ? 1 : -1), y1 + (dy > 0 ? 1 : -1) * n)
      }
    }
  }

  console.log(
    `21466? ${grid.reduce((sum, line) => {
      for (const x of line) {
        if (x > 1) sum++
      }
      return sum
    }, 0)}`
  )
}
