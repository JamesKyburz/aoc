module.exports = (inputs) => {
  const cols = inputs.split('\n')
  .filter(Boolean)
  .reduce((sum, val) => {
    val.match(/\d+/g)
    .map(Number)
    .forEach((number, i) => sum[i].push(number))
    return sum
  }, [[], [], []])

  let triangles = [[]]

  cols.forEach((col) => {
    col.forEach((val) => {
      let triangle = triangles.slice(-1)[0]
      if (triangle.length === 3) {
        triangles.push([])
        triangle = triangles.slice(-1)[0]
      }
      triangle.push(val)
    })
  })

  return triangles.reduce((sum, [a, b, c]) => {
    if ((a + b) > c &&
        (b + c) > a &&
        (a + c) > b) return sum + 1
    return sum
  }, 0)
}

