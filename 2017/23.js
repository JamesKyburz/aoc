const instructions = `
set b 67
set c b
jnz a 2
jnz 1 5
mul b 100
sub b -100000
set c b
sub c -17000
set f 1
set d 2
set e 2
set g d
mul g e
sub g b
jnz g 2
set f 0
sub e -1
set g e
sub g b
jnz g -8
sub d -1
set g d
sub g b
jnz g -13
jnz f 2
sub h -1
set g b
sub g c
jnz g 2
jnz 1 3
sub b -17
jnz 1 -23
`
  .split(/\n/)
  .slice(1, -1)


const xinstructions = `
set b 84
set c b
jnz a 2
jnz 1 5
mul b 100
sub b -100000
set c b
sub c -17000
set f 1
set d 2
set e 2
set g d
mul g e
sub g b
jnz g 2
set f 0
sub e -1
set g e
sub g b
jnz g -8
sub d -1
set g d
sub g b
jnz g -13
jnz f 2
sub h -1
set g b
sub g c
jnz g 2
jnz 1 3
sub b -17
jnz 1 -23
`
  .split(/\n/)
  .slice(1, -1)

let registers = {}
let mulified = 0
const r = (...args) => {
  const [a, b] = args
  if (typeof a === 'number') return a
  if (typeof registers[a] === 'undefined') {
    registers[a] = 0
  }
  if (typeof b !== 'undefined') registers[a] = b
  return registers[a]
}

const f = {
  skip () {
    offset++
  },
  jnz (a, b) {
    if (r(a) !== 0) {
      offset += r(b)
    } else {
      offset++
    }
  },
  set (a, b) {
    r(a, r(b))
    offset++
  },
  sub (a, b) {
    r(a, r(a) - r(b))
    offset++
  },
  mul (a, b) {
    r(a, r(a) * r(b))
    offset++
    mulified++
  }
}

let offset = 0
registers.a = 0
const debug = a => (typeof a === 'number' ? a : registers[a] || 0)

let loops = 0

registers.a = 0

while (offset < instructions.length) {
  const instruction = instructions[offset].split(/ /)
  const args = instruction.slice(1).map(x => (/^-?\d+$/.test(x) ? +x : x))
  const method = instruction[0]
  f[method](...args)
}

console.log('mulified', mulified)

let primes = 0

const isPrime = num => {
  for( let i = 2, s = Math.sqrt(num); i <= s; i++ )
      if( num % i === 0 ) return false
  return num !== 1
}

for (let i = 106700; i <= 123700; i += 17) {
  if (!isPrime(i)) primes++
}

console.log('h', primes)
