import { readFile } from 'node:fs/promises'

export default async function (filePath) {
  const input = await readFile(filePath, 'utf-8')

  const lines = input.split(/[\r\n]/).filter(Boolean)

  const numbers = lines.map((line) => {
    const digits = [...parse(line)]
    return Number(digits.at(0) + digits.at(-1))
  })

  return numbers.reduce((a, b) => a + b)
}

function* parse(line) {
  let stack = ''
  for (const char of [...line]) {
    if (Number(char)) {
      yield char
      stack = ''
    } else {
      stack += char
      for (const [endsWith, value] of Object.entries({
        one: '1',
        two: '2',
        three: '3',
        four: '4',
        five: '5',
        six: '6',
        seven: '7',
        eight: '8',
        nine: '9'
      })) {
        if (stack.endsWith(endsWith)) {
          yield value
        }
      }
    }
  }
}
