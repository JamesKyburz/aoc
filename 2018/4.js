const { test } = require('tap')
const { input, lines } = require('./helpers')

test('day 4, part 1', async t => {
  let guard
  const times = lines(await input('4/input')).sort((a, b) => {
    const time = x => x.slice(1, 17)
    if (time(a) < time(b)) return -1
    if (time(a) > time(b)) return 1
    return 0
  })

  const sleeps = times.reduce((sum, line, i) => {
    const matchGuard = line.match(/Guard #(\d+)/)
    const timestamp = '20' + line.slice(3, 17)
    const minute = +timestamp.slice(-2)
    if (matchGuard) guard = +matchGuard[1]
    const record = { guard, timestamp, minute }
    if (/falls asleep/.test(line)) {
      record.slept = +new Date(Date.parse(timestamp))
      record.minutes = []
    }
    if (/wakes up/.test(line)) {
      record.woke = +new Date(Date.parse(timestamp))
      sum[i - 1].duration = (record.woke - sum[i - 1].slept) / 60000
      let start = +sum[i - 1].slept
      let end = +record.woke
      while (start < end) {
        const min = new Date(start).getMinutes()
        sum[i - 1].minutes.push(min)
        start += 60000
      }
    }
    sum.push(record)
    return sum
  }, [])

  const sleepTotals = sleeps.filter(x => x.duration).reduce((sum, item) => {
    sum[item.guard] = sum[item.guard] || { duration: 0 }
    sum[item.guard].duration += item.duration
    return sum
  }, {})

  const sleepiestGuard = +Object.keys(sleepTotals).sort(
    (a, b) => sleepTotals[b].duration - sleepTotals[a].duration
  )[0]

  const minuteTotals = sleeps
    .filter(x => x.guard === sleepiestGuard && x.minutes)
    .reduce((sum, item) => {
      for (const minute of item.minutes) {
        sum[minute] = sum[minute] || 0
        sum[minute]++
      }
      return sum
    }, {})

  const sleepiestMinute = Object.keys(minuteTotals).sort(
    (a, b) => minuteTotals[b] - minuteTotals[a]
  )[0]

  t.equals(sleepiestGuard * sleepiestMinute, 39422)

  const guardMinuteCounter = {}

  for (const item of sleeps.filter(x => x.minutes)) {
    guardMinuteCounter[item.guard] = guardMinuteCounter[item.guard] || {}
    for (const min of item.minutes) {
      guardMinuteCounter[item.guard][min] =
        guardMinuteCounter[item.guard][min] || 0
      guardMinuteCounter[item.guard][min]++
    }
  }

  let sleepiestGuard2 = 0
  let sleepiestCount2 = 0
  let sleepiestMinute2 = 0

  for (const guard of Object.keys(guardMinuteCounter)) {
    const min = min => guardMinuteCounter[guard][min]
    const max = Object.keys(guardMinuteCounter[guard]).sort(
      (a, b) => min(b) - min(a)
    )[0]
    guardMinuteCounter[guard].max = max
    guardMinuteCounter[guard].count = guardMinuteCounter[guard][max]
    if (guardMinuteCounter[guard].count > sleepiestCount2) {
      sleepiestCount2 = guardMinuteCounter[guard].count
      sleepiestGuard2 = guard
      sleepiestMinute2 = max
    }
  }

  t.equals(sleepiestGuard2 * sleepiestMinute2, 65474)
})
