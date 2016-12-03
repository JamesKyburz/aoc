module.exports = (inputs) => {
  var triangles = inputs.split('\n')
  .filter(Boolean)
  .map((line) => line.match(/\d+/g).map(Number))

  return triangles.reduce((sum, [a, b, c]) => {
    if ((a + b) > c &&
        (b + c) > a &&
        (a + c) > b) return sum + 1
    return sum
  }, 0)
}

