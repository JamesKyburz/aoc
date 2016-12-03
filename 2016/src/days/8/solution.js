module.exports = (inputs, { print }) => {
  let data = []
  while (data.length < 6) data.push(Array(50))

  inputs
  .split('\n')
  .filter(Boolean)
  .map(parseInstruction)
  .filter(Boolean)
  .forEach((fn) => fn())

  if (print) {
    let message = ''
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 50; j++) {
        message += (data[i][j] || '.')
      }
      if (i !== 5) message += '\n'
    }
    return message
  } else {
    return pixelCount()
  }

  function rect (a, b) {
    for (let i = 0; i < a; i++) {
      for (let j = 0; j < b; j++) {
        data[j][i] = '#'
      }
    }
  }

  function rotateRow (y, by) {
    by = by % data[y].length
    for (let i = 0; i < by; i++) data[y].unshift(data[y].pop())
  }

  function rotateColumn (x, by) {
    by = by % data[0].length
    let array = []
    for (let i = 0; i < data.length; i++) array.push(data[i][x])
    for (let i = 0; i < by; i++) array.unshift(array.pop())
    for (let i = 0; i < data.length; i++) {
      data[i][x] = array.shift()
    }
  }

  function parseInstruction (instruction) {
    let match = instruction.match(/(rect|rotate row|rotate col)\D*(\d+)\D*(\d+)/)
    if (match) {
      let fn = {
        'rotate row': rotateRow,
        'rotate col': rotateColumn,
        'rect': rect
      }[match[1]]
      return fn.bind(null, +match[2], +match[3])
    }
  }

  function pixelCount () {
    let count = 0
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[0].length; j++) if (data[i][j]) count++
    }
    return count
  }
}
