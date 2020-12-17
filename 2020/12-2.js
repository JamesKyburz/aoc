'use strict'

const moves = [...require('./read')(__filename)]
  .map(([...chars]) => [chars[0], +chars.slice(1).join('')])
  .filter(([op, n]) => op && typeof n !== 'undefined')

const { abs, PI, sin, cos, floor } = Math

let waypoint = {
  x: 10,
  y: 1
}

const ship = {
  x: 0,
  y: 0
}

let degrees = 0

const move = {
  '0' (n) {
    waypoint.y += n
  },
  '180' (n) {
    waypoint.y -= n
  },
  '90' (n) {
    waypoint.x += n
  },
  '270' (n) {
    waypoint.x -= n
  },
  L (n) {
    waypoint = rotate(waypoint, radius(n))
  },
  R (n) {
    waypoint = rotate(waypoint, radius(-n))
  },
  F (n) {
    ship.x += n * waypoint.x
    ship.y += n * waypoint.y
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

const radius = degrees => (degrees * PI) / 180

const rotate = ({ x, y }, n) => ({
  x: cos(n) * x - sin(n) * y,
  y: sin(n) * x + cos(n) * y
})

for (const [op, n] of moves) move[op](n)

console.log(floor(abs(0 - ship.x) + abs(0 - ship.y)))
