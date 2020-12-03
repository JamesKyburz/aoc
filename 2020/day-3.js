const input = [...require('./read')(__filename)]

const calculate = (right, down) => {
  let trees = 0
  for (let x = right, y=down; y < input.length; y+= down, x+= right) {
    const line = input[y]
    if (line[x % line.length] === '#') trees++
  }
  return trees
}

console.log(calculate(3, 1))
