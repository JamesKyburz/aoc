import fs from 'node:fs/promises'

const input = await fs.readFile('input.txt', 'utf-8')

const numbers = input.split(/\n/).filter(Boolean)

{
  // part1

  const gamma = numbers
    .reduce((sum, number) => {
      for (const [i, diget] of Object.entries([...number]).map(args =>
        args.map(Number)
      )) {
        sum[i] = sum[i] || [0, 0]
        sum[i][diget === 0 ? 0 : 1]++
      }
      return sum
    }, [])
    .reduce((sum, item) => sum + (item[0] > item[1] ? '0' : '1'), '')

  const epsilon = [...gamma].map(n => (n === '0' ? '1' : '0')).join('')

  console.log(
    `4118544? ${[gamma, epsilon]
      .map(s => parseInt(s, 2))
      .reduce((a, b) => a * b, 1)}`
  )
}

{
  // part2

  const getCount = numbers => {
    return numbers.reduce((sum, number) => {
      for (const [i, diget] of Object.entries([...number]).map(args =>
        args.map(Number)
      )) {
        sum[i] = sum[i] || [0, 0]
        sum[i][diget === 0 ? 0 : 1]++
      }
      return sum
    }, [])
  }

  const oxygenGeneratorRating = (() => {
    let bitPosition = 0
    let copy = [...numbers]
    while (copy.length > 1) {
      const [zeros, ones] = getCount(copy)[bitPosition]
      const mostCommon = ones == zeros ? 1 : ones > zeros ? 1 : 0
      copy = copy.filter(n => {
        const bits = [...n].map(Number)
        return bits[bitPosition] === mostCommon
      })
      if (copy.length > 1) bitPosition++
    }
    return copy[0]
  })()

  const co2ScrubberRating = (() => {
    let bitPosition = 0
    let copy = [...numbers]
    while (copy.length > 1) {
      const [zeros, ones] = getCount(copy)[bitPosition]
      const leastCommon = zeros == ones ? 0 : ones > zeros ? 0 : 1
      copy = copy.filter(n => {
        const bits = [...n].map(Number)
        return bits[bitPosition] === leastCommon
      })
      if (copy.length > 1) bitPosition++
    }
    return copy[0]
  })()
  console.log(
    `3832770? ${[oxygenGeneratorRating, co2ScrubberRating]
      .map(s => parseInt(s, 2))
      .reduce((a, b) => a * b, 1)}`
  )
}
