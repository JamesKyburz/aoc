const input = require('./read')(__filename)

console.log(
  JSON.stringify(
    Object.entries(
      [...input].reduce((colors, rules) => {
        const [color, contains] = rules.split(/ bags contain /)
        colors[color] = colors[color] || []
        colors[color] = [
          ...colors[color],
          ...contains
            .split(', ')
            .map(x => (x.match(/\d+ ([\w ]+) bags?/) || [])[1])
            .map(color => {
              if (!color) return null
              return color
            })
        ]
          .filter(Boolean)
          .flat()
        return colors
      }, {})
    )
      .reduce((colors, [color, contains], index, all) => {
        for (const [matchColor, matchContains] of all.filter(
          (a, b) => b !== index
        )) {
          if (matchContains.includes(color)) {
            for (const contain of contains) {
              if (!matchContains.includes(contain)) {
                matchContains.push(contain)
              }
            }
          }
        }
        colors.push([color, contains])
        return colors
      }, [])
      .filter(([color, contains]) => contains.includes('shiny gold'))
      .map(([color, contains]) => color).length,
    null,
    2
  )
)
