'use strict'

const numbers = require('./read')(__filename)
  .splitComma()
  .mapNumber()
  .value()

memory(numbers)

function memory (numbers) {
  let turn = 0
  let last
  const remember = {}

  const speak = number => {
    last = number
    if (!remember[number]) {
      remember[number] = new Array(2)
      remember[number][0] = turn
      remember[number][1] = turn
    } else {
      remember[number][0] = remember[number][1]
      remember[number][1] = turn
    }
  }

  for (const number of numbers) {
    speak(number)
    ++turn
  }

  while (turn < 30000000) {
    const [prevIndex, lastIndex] = remember[last]
    speak(lastIndex - prevIndex)
    ++turn
    if (turn % 1000000 === 0) console.log('zzzzz', turn)
  }
  console.log('turn %s: %s', turn, last)
}
