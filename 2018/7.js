const { test } = require('tap')
const { input, lines } = require('./helpers')

test('day 7', async t => {
  t.plan(1)
  const steps = lines(await input('7/input'))
    .map(line => line.match(/[A-Z]/g).slice(1))
    .sort((a, b) => (a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0))

  const xsteps = lines(`Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.
`)
    .map(line => line.match(/[A-Z]/g).slice(1))
    .sort((a, b) => (a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0))

  const completed = new Set()
  const waiting = new Set()
  const toNode = x => x.split(/,/)
  const xfree = () =>
    [...waiting]
      .map(toNode)
      .concat(steps)
      .find(([l, r]) => !steps.find(([_, x]) => x === l)) ||
    steps.find(([l, r]) => !steps.find(([_, x]) => x === l))
  const canRun = name => !steps.find(x => x[1] === name) && !completed.has(name)
  const free = (last = []) =>
    [...waiting]
      .map(toNode)
      .concat(steps)
      .sort((a, b) => (a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0))
      .find(x => x[0] !== last[0] && x[1] !== last[1] && x.some(canRun))

  const walk = node => {
    if (!node) return
    if (typeof node === 'string') node = toNode(node)
    const stepIndex = steps.findIndex(x => x[0] === node[0] && x[1] === node[1])
    if (stepIndex !== -1) steps.splice(stepIndex, 1)
    if (node.every(node => canRun(node) || completed.has(node))) {
      waiting.delete(node + '')
    } else {
      waiting.add(node + '')
    }
    for (const name of node) {
      if (canRun(name)) {
        completed.add(name)
        const pending = steps
          .filter(x => x[0] === node[1])
          .sort((a, b) => (a[1] > b[1] ? 1 : a[1] < b[1] ? -1 : 0))
        for (const node of pending) walk(node)
      }
    }
  }

  let node
  while (steps.length + waiting.size) {
    walk((node = free(node)))
    walk(free())
    console.log([...completed])
  }

  t.equals([...completed].join(''), 'CABDFGE')
})
