import { readFile } from 'node:fs/promises'
export default async function (filePath) {
  const input = await readFile(filePath, 'utf-8')
  const [times, distances] = input.split(/[\r\n]/).filter(Boolean).map(line => line.match(/\d+/g).map(Number))
  return [...Array(times.length).keys()].map(offset => {
    return [...Array(times[offset]).keys()].map(n => {
      const left = times[offset] - n
      return n  * left > distances[offset]
    }).filter(Boolean)
  }).map(x => x.length).reduce((a, b) => a * b, 1)

}
