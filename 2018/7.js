const { test } = require('tap')
const { input, lines } = require('./helpers')

test('day 7', async t => {
  t.plan(1)
  const functions = lines(`Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.
`)
    .map(line => line.match(/[A-Z]/g).slice(1))
    .reduce((sum, [parent, child]) => {
      if (!sum[parent]) sum[parent] = { children: [], name: parent, after: [] }
      if (!sum[parent].children.includes(child)) {
        sum[parent].children.push(child)
        sum[parent].children.sort()
      }
      if (!sum[child]) sum[child] = { name: child, children: [], after: [] }
      sum[child].after.push(parent)
      return sum
    }, {})
  const steps = new Set()
  const canRun = name => {
    if (!steps.has(name) && functions[name].after.every(x => steps.has(x))) {
      return true
    }
  }
  const next = () => {
    for (const i of Object.keys(functions)) {
      if (canRun(i)) return functions[i]
      for (const j of functions[i].children) {
        if (canRun(j)) return functions[j]
        for (const k of functions[j].children) {
          if (canRun(k)) return functions[k]
          for (const l of functions[k].children) {
            if (canRun(l)) return functions[l]
            for (const m of functions[l].children) {
              if (canRun(m)) return functions[m]
              for (const n of functions[m].children) {
                if (canRun(n)) return functions[n]
                for (const o of functions[n].children) {
                  if (canRun(o)) return functions[o]
                  for (const p of functions[o].children) {
                    if (canRun(p)) return functions[p]
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  while (true) {
    const fn = next()
    if (!fn) break
    steps.add(fn.name)
  }

  t.equals('CABDFE', [...steps].join(''))
})
