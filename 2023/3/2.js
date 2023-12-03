import { readFile } from 'node:fs/promises'
export default async function (filePath) {
  const input = await readFile(filePath, 'utf-8')
  const lines = input.split(/[\r\n]/).filter(Boolean)
  const grid = toGrid(lines)
  const numbers = toNumbers(grid)
  const stars = {}
  for (const number of numbers) {
    for (const position of aroundPositions(number)) {
      const value = grid[position.y]?.[position.x]
      if (value && value === '*') {
        stars[`${position.y}.${position.x}`] ||= []
        stars[`${position.y}.${position.x}`].push(number.number)
      }
    }
  }
  const gearRatios = []
  for (const numbers of Object.values(stars)) {
    if (numbers.length === 2) {
      gearRatios.push(numbers.reduce((a, b) => a * b))
    }
  }
  return gearRatios.reduce((a, b) => a + b)
}

function toGrid(lines) {
  const grid = []
  for (const [i, row] of lines.entries()) {
    grid.push([])
    for (const [j, col] of [...row].entries()) {
      grid[i][j] = col
    }
  }
  return grid
}

function aroundPositions({ y, startIndex, endIndex }) {
  const positions = []
  for (const offset of [y -1, y, y + 1]) {
    for (const x of [...Array(2 + (endIndex - startIndex + 1)).keys()].map(n => (n + startIndex) - 1)) {
      positions.push({ x, y: offset })
    }
  }
  return positions
}

function toNumbers(grid) {
  const match = /\d+/g
  const numbers = []
  for (const [y, row] of grid.entries()) {
    const line = row.join('')
    let number
    while((number = match.exec(line)) !== null) {
      numbers.push({
        y,
        number: Number(number[0]),
        startIndex: number.index,
        endIndex: match.lastIndex - 1
      })
    }
  }
  return numbers
}
