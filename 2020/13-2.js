'use strict'

const lines = [...require('./read')(__filename)]

const buses = lines[1]
  .split(',')
  .map((id, offset) => {
    id = +id
    if (isNaN(id)) return
    return {
      id,
      offset
    }
  })
  .filter(Boolean)

let [t, step] = [0, 1]

for (const { id, offset } of buses) {
  while ((t + offset) % id !== 0) t += step
  step *= id
}

console.log(t)
