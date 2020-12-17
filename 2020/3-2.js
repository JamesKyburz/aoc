const input = [...require('./read')(__filename)]

const calculate = (right, down) => {
  let trees = 0
  for (let x = right, y=down; y < input.length; y+= down, x+= right) {
    const line = input[y]
    if (line[x % line.length] === '#') trees++
  }
  return trees
}

console.log(
  [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]
    .map(([right, down]) => calculate(right, down))
    .reduce((sum, n) => sum * n, 1)
)
