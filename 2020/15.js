'use strict'

const numbers = require('./read')(__filename)
  .splitComma()
  .mapNumber()
  .value()

const [turn, number] = [...memory(numbers)].slice(-1)[0]
console.log('turn %s: %s', turn, number)

function * memory (numbers) {
  let turn = 0
  let spoken = []

  const speak = function * (number) {
    spoken.push(number)
    yield [++turn, number]
  }

  for (const number of numbers) {
    yield * speak(number)
  }

  while (turn < 2020) {
    const last = spoken[spoken.length - 1]
    if (spoken.filter(x => x === last).length === 1) {
      yield * speak(0)
    } else {
      const lastIndex = spoken.lastIndexOf(last)
      const prevIndex = spoken.slice(0, lastIndex).lastIndexOf(last)
      yield * speak(lastIndex - prevIndex)
    }
  }
}
