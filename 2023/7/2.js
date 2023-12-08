import { readFile } from 'node:fs/promises'
export default async function (filePath) {
  const input = await readFile(filePath, 'utf-8')
  const hands = input
    .split(/[\r\n]/)
    .filter(Boolean)
    .map((line) => {
      const bid = Number(line.slice(6))
      const hand = line.slice(0, 5)
      const kinds = [...joker(hand)].reduce((sum, n) => {
        if (!sum.has(n)) {
          sum.set(n, 0)
        }
        sum.set(n, sum.get(n) + 1)
        return sum
      }, new Map())
      let type
      const values = [...kinds.values()]
      if (values.filter((n) => n === 1).length === 5) {
        type = 1
      } else if (values.filter((n) => n === 5).length === 1) {
        type = 7
      } else if (values.filter((n) => n === 2).length === 2) {
        type = 3
      } else if (values.filter((n) => n === 4).length === 1) {
        type = 6
      } else {
        const pairs = values.filter((n) => n === 2).length
        const threes = values.filter((n) => n === 3).length
        if (pairs === 1 && !threes) {
          type = 2
        } else if (threes === 1 && !pairs) {
          type = 4
        } else if (threes === 1 && pairs === 1) {
          type = 5
        }
      }
      return {
        type,
        hand: [...line.slice(0, 5)]
          .map((x) => {
            return (
              {
                A: 'Z',
                K: 'Y',
                Q: 'X',
                J: '1',
                T: 'V'
              }[x] || x
            )
          })
          .join(''),
        bid
      }
    })

  const ranked = [...rankem(hands)]

  return ranked.reduce((sum, item) => sum + item.rank * item.bid, 0)
}

function* rankem(hands) {
  let rank = 0
  for (const type of [1, 2, 3, 4, 5, 6, 7]) {
    const matches = hands.filter((hand) => hand.type === type)
    if (matches.length) {
      matches.sort((a, b) => a.hand.localeCompare(b.hand))
      for (const match of matches) {
        yield {
          ...match,
          rank: ++rank
        }
      }
    }
  }
}

function joker(hand) {
  const counts = [...hand].reduce((acc, card) => {
    if (card !== 'J') {
      acc[card] = (acc[card] || 0) + 1
    }
    return acc
  }, {})

  const jokerCount = [...hand].filter((card) => card === 'J').length

  if (jokerCount === 0) return hand

  const cards = Object.keys(counts)
  let bestHand = hand
  let bestHandStrength = 0

  for (let i = 0; i < cards.length; i++) {
    for (let j = i; j < cards.length; j++) {
      const newCounts = { ...counts }
      newCounts[cards[i]] = (newCounts[cards[i]] || 0) + jokerCount
      const strength = evaluateHand(newCounts)

      if (strength > bestHandStrength) {
        bestHandStrength = strength
        bestHand = createHand(newCounts)
      }
    }
  }

  return bestHand
}

function evaluateHand(counts) {
  const values = Object.values(counts)
  if (values.includes(5)) return 7
  if (values.includes(4)) return 6
  if (values.includes(3) && values.includes(2)) return 5
  if (values.includes(3)) return 4
  if (values.filter((v) => v === 2).length === 2) return 3
  if (values.includes(2)) return 2
  return 1
}

function createHand(counts) {
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1] || b[0].localeCompare(a[0]))
    .map(([card, count]) => card.repeat(count))
    .join('')
    .slice(0, 5)
}
