const r = (p, x) => (+x ? x : p[x] || 0)

const f = {
  snd (p, a) {
    p.pipe.queue.push(r(p, a))
    p.sent++
  },
  add (p, a, b) {
    p[a] += r(p, b)
  },
  set (p, a, b) {
    p[a] = r(p, b)
  },
  mul (p, a, b) {
    p[a] *= r(p, b)
  },
  mod (p, a, b) {
    p[a] %= r(p, b)
  },
  rcv (p, a) {
    if (p.queue.length) {
      p[a] = p.queue.shift()
    } else {
      p.wait = true
    }
  },
  jgz (p, a, b) {
    if (r(p, a) > 0) {
      p.offset += r(a, b) - 1
    }
  }
}

const step = p => {
  if (p.offset < input.length) {
    p.wait = false
    const [inst, args] = input[p.offset]
    f[inst](p, ...args)
    if (!p.wait) p.offset++
  } else {
    p.wait = true
  }
}

const input = 'set i 31,set a 1,mul p 17,jgz p p,mul a 2,add i -1,jgz i -2,add a -1,set i 127,set p 464,mul p 8505,mod p a,mul p 129749,add p 12345,mod p a,set b p,mod b 10000,snd b,add i -1,jgz i -9,jgz a 3,rcv b,jgz b -1,set f 0,set i 126,rcv a,rcv b,set p a,mul p -1,add p b,jgz p 4,snd a,set a b,jgz 1 3,snd b,set f 1,add i -1,jgz i -11,snd a,jgz f -16,jgz a -19'
  .split(',')
  .map(x => {
    const inst = x.split(' ')
    return [inst[0], inst.slice(1).map(x => (/^-?\d+$/.test(x) ? +x : x))]
  })

const p0 = { offset: 0, queue: [], wait: false, sent: 0 }
const p1 = { offset: 0, queue: [], wait: false, sent: 0 }

p0.p = 0
p1.p = 0

p0.pipe = p1
p1.pipe = p0

while (!(p0.wait && p1.wait)) {
  step(p0)
  step(p1)
}

console.log(p1.sent / 2)
