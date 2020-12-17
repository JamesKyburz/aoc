'use strict'

const moves = [...require('./read')(__filename)]
  .map(([...chars]) => [chars[0], +chars.slice(1).join('')])
  .filter(([op, n]) => op && typeof n !== 'undefined')

const { abs } = Math
let x = 0
let y = 0
let degrees = 90

const move = {
  '0' (n) {
    y += n
  },
  '180' (n) {
    y -= n
  },
  '90' (n) {
    x += n
  },
  '270' (n) {
    x -= n
  },
  L (n) {
    degrees -= n
    if (degrees < 0) degrees = 360 - abs(degrees)
  },
  R (n) {
    degrees += n
    if (degrees >= 360) degrees -= 360
  },
  F (n) {
    move[degrees](n)
  },
  N (n) {
    move['0'](n)
  },
  W (n) {
    move['270'](n)
  },
  E (n) {
    move['90'](n)
  },
  S (n) {
    move['180'](n)
  }
}

for (const [op, n] of moves) move[op](n)

console.log(abs(0 - x) + abs(0 - y))
