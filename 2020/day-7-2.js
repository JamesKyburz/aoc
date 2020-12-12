const input = require('./read')(__filename)

console.log(
  [...input].reduce((bags, line, index, lines) => {
    const [, name] = line.match(/([\w ]+) bags contain /)
    bags[name] = [
      ...(function * matches () {
        const match = /(\d+) ([\w ]+) bags?/g
        let result
        while ((result = match.exec(line))) yield [result[2], +result[1]]
      })()
    ]
    if (index === lines.length - 1) {
      const countAll = bag =>
        bags[bag]
          .map(([a, b]) => b + b * countAll(a))
          .reduce((a, b) => a + b, 0)
      return countAll('shiny gold')
    }
    return bags
  }, {})
)
