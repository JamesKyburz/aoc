const input = [...require('./read')(__filename)]

const calculate = (right, down) => {
  let trees = 0
  let x = 0
  let y = 0

  while (true) {
    const data = input[y]
    if (!data) break
    const line = [...data]
    if (!line.length) break
    if (y === 0) {
      x += right
    } else {
      const pattern = [...line]
      while (x + right > line.length) {
        line.push(...pattern)
      }
      if (line[x] === '#') {
        trees++
        line[x] = 'X'
      } else {
        line[x] = 'O'
      }
      x += right
    }
    y += down
    if (process.env.DEBUG) {
      console.log(line.join(''))
    }
  }
  return trees
}

console.log(
  [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]
    .map(([right, down]) => calculate(right, down))
    .reduce((sum, n) => sum * n, 1)
)
