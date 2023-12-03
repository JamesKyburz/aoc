import { readFile } from 'node:fs/promises'
export default async function (filePath) {
  const input = await readFile(filePath, 'utf-8')
  const cubes = input.split(/[\r\n]/).filter(Boolean).map(line => {
    const results = game(line)
    return ['red', 'green', 'blue'].map(color => Math.max(...results.sets.map(set => set.get(color) ?? 0))).reduce((a, b) => a * b)
  })
  return cubes.reduce((a, b) => a + b, 0)
}

function game(line) {
  const id = Number(line.split(':')[0].slice('Game '.length))
  const sets = line.split(':')[1].split(';')
  const colors = /(\d+) (\w+)/g
  const color = /(\d+) (\w+)/
  return {
    id,
    sets: sets.map(set => {
      const result = new Map()
      for (const value of set.match(colors)) {
        const match = value.match(color)
        result.set(match[2], Number(match[1]))
      }
      return result
    })
  }
}
