import { readFile } from 'node:fs/promises'
export default async function (filePath) {
  const input = await readFile(filePath, 'utf-8')
  const [time, distance] = input.split(/[\r\n]/).filter(Boolean).map(line => Number(line.match(/\d+/g).join('')))
  let wins = 0
  for(let n=0; n < time; n++) {
    const left = time - n
    if (n * left > distance) {
      wins++
    }
  }
  return wins
}
