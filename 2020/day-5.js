const input = require('./read')(__filename)

console.log(Math.max(...[...input].map(id)))

function id (input) {
  return parseInt(input.replace(/(F|L)/g, '0').replace(/\D/g, '1'), 2)
}
