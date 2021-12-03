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
