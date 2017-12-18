const registers = {}
const played = {}
const r = (...args) => {
  const [ a, b ] = args
  if (typeof a === 'number') return a
  if (typeof registers[a] === 'undefined') {
    registers[a] = 0
  }
  if (typeof b !== 'undefined') registers[a] = b
  return registers[a]
}

const f = {
  snd (a) {
    played[a] = r(a)
    offset++
  },
  rcv (a) {
    if (r(a)) f.set(a, played[a])
    if (r(a)) {
      console.log('recovered', a, played[a])
      offset = instructions.length
      return
    }
    offset++
  },
  jgz (a, b) {
    if (r(a) > 0) {
      offset += r(b)
    } else {
      offset++
    }
  },
  set (a, b) {
    r(a, r(b))
    offset++
  },
  add (a, b) {
    r(a, r(a) + r(b))
    offset++
  },
  mul (a, b) {
    r(a, r(a) * r(b))
    offset++
  },
  mod (a, b) {
    r(a, r(a) % r(b))
    offset++
  }
}

const instructions = `
set i 31
set a 1
mul p 17
jgz p p
mul a 2
add i -1
jgz i -2
add a -1
set i 127
set p 464
mul p 8505
mod p a
mul p 129749
add p 12345
mod p a
set b p
mod b 10000
snd b
add i -1
jgz i -9
jgz a 3
rcv b
jgz b -1
set f 0
set i 126
rcv a
rcv b
set p a
mul p -1
add p b
jgz p 4
snd a
set a b
jgz 1 3
snd b
set f 1
add i -1
jgz i -11
snd a
jgz f -16
jgz a -19
`
  .split(/\n/)
  .slice(1, -1)

let offset = 0
while (offset < instructions.length) {
  const instruction = instructions[offset].split(/ /)
  f[instruction[0]](
    ...instruction.slice(1).map(x => (/^-?\d+$/.test(x) ? +x : x))
  )
}
