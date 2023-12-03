import { readFile } from 'node:fs/promises'
export default async function (filePath) {
  const input = await readFile(filePath, 'utf-8')
  const ids = input.split(/[\r\n]/).filter(Boolean).map(game)
    .filter(game => {
      return game.sets.every(set => {
        const red = set.get('red')
        const green = set.get('green')
        const blue = set.get('blue')
        return (
            (typeof red === 'undefined' || red <= 12) &&
            (typeof green === 'undefined' || green <= 13) &&
            (typeof blue === 'undefined' || blue <= 14)
        )
      })
    }).map(game => game.id)

  return ids.reduce((a, b) => a + b, 0)
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
