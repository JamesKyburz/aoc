const initial = `
..##.##.######...#.######
##...#...###....##.#.#.##
###.#.#.#..#.##.####.#.#.
..##.##...#..#.##.....##.
##.##...#.....#.#..#.####
.###...#.........###.####
#..##....###...#######..#
###..#.####.###.#.#......
.#....##..##...###..###.#
###.#..#.##.###.#..###...
####.#..##.#.#.#.#.#...##
##.#####.#......#.#.#.#.#
..##..####...#..#.#.####.
.####.####.####...##.#.##
#####....#...#.####.#..#.
.#..###..........#..#.#..
.#.##.#.#.##.##.#..#.#...
..##...#..#.....##.####..
..#.#...######..##..##.#.
.####.###....##...####.#.
.#####..#####....####.#..
###..#..##.#......##.###.
.########...#.#...###....
...##.#.##.#####.###.####
.....##.#.#....#..#....#.
`
  .split(/\n/)
  .slice(1, -1)
  .map(x => [...x])

let d = 'up'
let [x, y] = [(initial[0].length - 1) / 2, (initial.length - 1) / 2]
let grid = JSON.parse(JSON.stringify(initial))

let infected = 0

for (let i = 0; i < 10000; i++) {
  ;[d, y, x, grid, infected] = burst(d, y, x, grid, infected, false)
}

console.log('part 1 after 10000', infected)

d = 'up'
grid = JSON.parse(JSON.stringify(initial))
;[x, y] = [(initial[0].length - 1) / 2, (initial.length - 1) / 2]
infected = 0

for (let i = 0; i < 10000000; i++) {
  ;[d, y, x, grid, infected] = burst(d, y, x, grid, infected, true)
}

console.log('part 2 after 10000000', infected)

function burst (d, y, x, grid, infected, weakState) {
  if (!grid[y]) grid[y] = []
  if (!grid[y][x]) grid[y][x] = '.'
  const cell = grid[y][x]
  if (cell === '#' || cell === 'F') {
    if (weakState) {
      if (cell === '#') {
        grid[y][x] = 'F'
        ;[d, y, x] = move(d, y, x)('right')
      } else if (cell === 'F') {
        grid[y][x] = '.'
        ;[d, y, x] = move(d, y, x)('reverse')
      }
    } else {
      grid[y][x] = '.'
      ;[d, y, x] = move(d, y, x)('right')
    }
  } else {
    if (weakState) {
      if (cell === '.') {
        grid[y][x] = 'W'
        ;[d, y, x] = move(d, y, x)('left')
      } else if (cell === 'W') {
        grid[y][x] = '#'
        ;[d, y, x] = move(d, y, x)('forward')
        infected++
      }
    } else {
      grid[y][x] = '#'
      ;[d, y, x] = move(d, y, x)('left')
      infected++
    }
  }
  return [d, y, x, grid, infected]
}

function move (d, y, x) {
  const up = () => {
    y--
    d = 'up'
  }
  const down = () => {
    y++
    d = 'down'
  }
  const left = () => {
    x--
    d = 'left'
  }
  const right = () => {
    x++
    d = 'right'
  }
  return op => {
    if (op === 'right') {
      if (d === 'up') {
        right()
      } else if (d === 'right') {
        down()
      } else if (d === 'down') {
        left()
      } else if (d === 'left') {
        up()
      }
    } else if (op === 'left') {
      if (d === 'up') {
        left()
      } else if (d === 'right') {
        up()
      } else if (d === 'down') {
        right()
      } else if (d === 'left') {
        down()
      }
    } else {
      if (op === 'reverse') {
        if (d === 'up') {
          d = 'down'
        } else if (d === 'left') {
          d = 'right'
        } else if (d === 'right') {
          d = 'left'
        } else if (d === 'down') {
          d = 'up'
        }
      }
      if (d === 'up') {
        up()
      } else if (d === 'right') {
        right()
      } else if (d === 'down') {
        down()
      } else if (d === 'left') {
        left()
      }
    }
    return [d, y, x]
  }
}

function print (grid) {
  for (const i of Object.keys(grid).sort((a, b) => a + b)) {
    for (const j of Object.keys(grid[i]).sort((a, b) => a + b)) {
      process.stdout.write(grid[i][j])
    }
    console.log()
  }
}
