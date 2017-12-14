const example = `
0: 3
1: 2
4: 4
6: 4
`

for (const { input, expected, solution } of [
  { input: example, expected: 24, solution: severityTotal },
  { input: puzzleInput(), expected: 648, solution: severityTotal },
  { input: example, expected: 10, solution: delayCheck },
  { input: puzzleInput(), expected: 3933124, solution: delayCheck },
]) {
  const actual = solution(input)
  if (actual !== expected) console.error(`${actual} !== ${expected}`)
}

function parse (input) {
  return input
    .split(/\n/g)
    .slice(1, -1)
    .map(line => {
      const [id, depth] = line.split(': ').map(Number)
      return { id, depth, scanY: 0, direction: 1 }
    })
    .reduce((sum, item) => {
      sum[item.id] = item
      return sum
    }, [])
}

function delayCheck (input) {
  let delay = 0
  const layers = parse(input)
  let from = JSON.stringify(layers)
  while (true) {
    const layers = JSON.parse(from)
    let caught = 0
    const count = layers.length
    let packet = -1
    let i = 0
    let severity = 0
    scan(layers)
    delay++
    from = JSON.stringify(layers)
    while (i < count) {
      packet++
      if (layers[packet] && layers[packet].scanY === 0) {
        caught = 1
        break
      }
      scan(layers)
      i++
    }
    if (!caught) return delay
  }
}

function severityTotal (input) {
  const layers = parse(input)
  const count = layers.length
  let packet = -1
  let i = 0
  let severity = 0
  while (i < count) {
    packet++
    if (layers[packet] && layers[packet].scanY === 0) {
      const { id, depth } = layers[packet]
      severity += id * depth
    }
    scan(layers)
    i++
  }
  return severity
}

function scan (layers) {
  for (const layer of layers) {
    if (!layer || !layer.depth) continue
    layer.scanY += (1 * layer.direction)
    if (layer.scanY === layer.depth) {
      layer.direction = -1
      layer.scanY -= 2
    }
    if (layer.scanY === 0 && layer.direction === -1) layer.direction = 1
  }
}

function puzzleInput () {
  return `
0: 4
1: 2
2: 3
4: 4
6: 8
8: 5
10: 8
12: 6
14: 6
16: 8
18: 6
20: 6
22: 12
24: 12
26: 10
28: 8
30: 12
32: 8
34: 12
36: 9
38: 12
40: 8
42: 12
44: 17
46: 14
48: 12
50: 10
52: 20
54: 12
56: 14
58: 14
60: 14
62: 12
64: 14
66: 14
68: 14
70: 14
72: 12
74: 14
76: 14
80: 14
84: 18
88: 14
`
}
