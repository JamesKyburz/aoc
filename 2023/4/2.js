import { readFile } from 'node:fs/promises'
export default async function (filePath) {
  const input = await readFile(filePath, 'utf-8')
  const lines = input.split(/[\r\n]/).filter(Boolean)
  const cards = lines.map(copyCount)
  const copies = play(cards)
  return copies
}

function play(cards) {
  const cardCopies = Array(cards.length).fill(1)
  for (const [i, { id, count }] of cards.entries()) {
    for (const j of [...Array(count).keys()]) {
      const nextCardIndex = id + j
      if (nextCardIndex < cardCopies.length) {
        cardCopies[nextCardIndex] += cardCopies[i]
      }
    }
  }

  return cardCopies.reduce((a, b) => a + b, 0)
}

function copyCount(line) {
  const id = Number(line.split(':')[0].slice('Card '.length))
  const numbers = line.split(': ')[1]?.split('|')
  const [winners, got] = numbers.map((x) =>
    Array.from(x.match(/\d+/g).map(Number))
  )
  let count = 0
  for (const n of got) {
    if (winners.includes(n)) {
      count++
    }
  }
  return { id, count }
}
