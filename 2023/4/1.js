import { readFile } from 'node:fs/promises'
export default async function (filePath) {
  const input = await readFile(filePath, 'utf-8')
  const lines = input.split(/[\r\n]/).filter(Boolean)
  const scores = lines.map(score)
  return scores.reduce((a, b) => a + b)
}

function score(line) {
  const numbers = line.split(': ')[1]?.split('|')
  const [winners, got] = numbers.map(x => Array.from(x.match(/\d+/g).map(Number)))
  let count = 0
  for (const n of got) {
    if (winners.includes(n)) {
      count++
    }
  }
  if (count === 0) {
    return 0
  } else if(count === 1) {
    return 1
  } else {
    return 2**(count - 1)
  }
}
