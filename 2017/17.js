function spinlock (times) {
  const steps = 329
  const buffer = [0]
  let i = 0
  let n = 0
  while (times--) {
    i += steps
    const at = i % buffer.length
    const pre = buffer.splice(0, at + 1)
    buffer.unshift(...pre, ++n)
    i = pre.length
  }
  return buffer
}

function spinlock2 (times) {
  const steps = 329
  let i = 0
  let n = 0
  let last
  let length = 1
  while (times--) {
    i = (i + steps) % length
    ++n
    if (i === 0) last = n
    ++length
    ++i
  }
  return last
}

const result = spinlock(2017)
console.log(result[result.indexOf(2017) + 1])

console.log(spinlock2(50000000))
