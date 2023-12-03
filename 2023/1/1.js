import { readFile } from 'node:fs/promises'
export default async function (filePath) {
  const input = await readFile(filePath, 'utf-8')

  const lines = input.split(/[\r\n]/).filter(Boolean)

  const numbers = lines.map((line) => {
    const digits = [...line].map(Number).filter(Boolean).map(String)
    if (digits.length) {
      return Number(digits[0] + digits.at(-1))
    }
  })

  return numbers.filter(Boolean).reduce((a, b) => a + b)
}
