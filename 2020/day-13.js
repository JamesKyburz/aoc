'use strict'

const lines = [...require('./read')(__filename)]

const [minTime, buses] = [
  +lines[0],
  lines[1]
    .split(',')
    .map(Number)
    .filter(Boolean)
]

for (const offset of [...Array(Math.max(...buses)).keys()]) {
  const time = minTime + offset
  const bus = buses.find(id => time % id === 0)
  if (bus) {
    console.log(bus * offset)
    break
  }
}
