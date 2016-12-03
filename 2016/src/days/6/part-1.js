module.exports = (inputs) => {
  return inputs
    .split('\n')
    .filter(Boolean)
    .reduce((cols, line) => {
      line
        .match(/./g)
        .forEach((ch, i) => {
          cols[i] = cols[i] || {}
          cols[i][ch] = cols[i][ch] || 0
          ++cols[i][ch]
        })
      return cols
    }, [])
    .reduce((word, col) => {
      let keys = Object.keys(col)
      keys.sort((a, b) => col[b] - col[a])
      return word + keys[0]
    }, '')
}
