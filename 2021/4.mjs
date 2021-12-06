import fs from 'node:fs/promises'

const input = await fs.readFile('input.txt', 'utf-8')
const lines = input.split('\n')

const called = lines[0].split(',').map(Number)

const numbers = lines
  .slice(1)
  .filter(Boolean)
  .flatMap(x =>
    x
      .trim()
      .split(/[ ]+/)
      .map(Number)
  )

const boards = []

for (let i = 0; i < numbers.length / 25; i++) {
  const board = {
    id: boards.length,
    grid: [],
    score: [],
    bingo: null,
    order: null
  }
  boards.push(board)
  const offset = board.id * 25
  const boardNumbers = numbers.slice(offset, offset + 25)
  for (let j = 0; j < 5; j++) {
    board.grid.push(boardNumbers.slice(j * 5, j * 5 + 5))
    board.score.push([...Array(5).keys()].map(() => null))
  }
}

function score (board, number) {
  const range = [...Array(5).keys()]
  const unmarked = () => {
    const numbers = []
    for (const y of range) {
      for (const x of range) {
        if (board.score[x][y] === null) {
          numbers.push(board.grid[x][y])
        }
      }
    }
    return numbers
  }
  const isNumber = n => n !== null
  for (const y of range) {
    for (const x of range) {
      if (board.grid[y][x] === number) {
        board.score[y][x] = number
        if (board.score[y].every(isNumber)) {
          return number * unmarked().reduce((a, b) => a + b, 0)
        } else if (range.map(n => board.score[n][x]).every(isNumber)) {
          return number * unmarked().reduce((a, b) => a + b, 0)
        }
      }
    }
  }
}

let bingos = 0

for (let i = 0; i < called.length; i += 5) {
  const round = called.slice(i, i + 5)
  for (const number of round) {
    for (const board of boards) {
      const bingo = score(board, number)
      if (bingo && !board.bingo) {
        board.bingo = bingo
        board.order = ++bingos
      }
    }
  }
}

console.log(
  `part 1 72770? ${boards.sort((a, b) => a.order - b.order)[0].bingo}`
)
console.log(
  `part 2 13912? ${boards.sort((a, b) => b.order - a.order)[0].bingo}`
)
