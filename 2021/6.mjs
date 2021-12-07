import fs from 'node:fs/promises'

const input = await fs.readFile('input.txt', 'utf-8')

const weird = input.split(',').map(Number)

function tick () {
  let babies = 0
  for (let i = 0; i < weird.length; i++) {
    const fish = weird[i]
    if (fish === 0) {
      weird[i] = 6
      babies++
    } else {
      weird[i] = fish - 1
    }
  }
  for (let i = 0; i < babies; i++) {
    weird.push(8)
  }
}

let day = 0

{
  // part 1

  while (day < 80) {
    day++
    tick()
  }

  console.log(`380758? ${weird.length}`)
}
