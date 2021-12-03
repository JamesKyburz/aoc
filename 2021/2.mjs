import fs from 'node:fs/promises'

const input = await fs.readFile('input.txt', 'utf-8')

const commands = input.split(/\n/).map(l => l.split(' '))

{
  // part1

  let x = 0
  let y = 0

  commands.map(([op, n]) =>
    ({
      forward (n) {
        x += n
      },
      down (n) {
        y += n
      },
      up (n) {
        y -= n
      }
    }[op](Number(n)))
  )

  console.log(`1690020? ${x * y}`)
}

{
  // part 2

  let x = 0
  let y = 0
  let aim = 0

  commands.map(([op, n]) =>
    ({
      forward (n) {
        x += n
        y += aim * n
      },
      down (n) {
        aim += n
      },
      up (n) {
        aim -= n
      }
    }[op](Number(n)))
  )

  console.log(`1408487760? ${x * y}`)
}
