module.exports = (input) => {
  let bots = {}
  let outputs = {}
  let comparing = []

  input
    .split('\n')
    .filter(Boolean)
    .forEach(processInstruction)

  function processInstruction (instruction) {
    if (/^value/.test(instruction)) {
      let [ value, id ] = instruction.match(/\d+/g)
      bots[id] = bots[id] || bot(id)
      bots[id].assign(value)
    }
    if (/^bot \d+ gives/.test(instruction)) {
      let [ , id, lowType, lowId, highType, highId ] = instruction.match(/bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)/)
      bots[id] = bots[id] || bot(id)
      let [ low, createLow ] = lowType === 'bot' ? [ bots, bot ] : [ outputs, output ]
      let [ high, createhigh ] = highType === 'bot' ? [ bots, bot ] : [ outputs, output ]

      low[lowId] = low[lowId] || createLow(lowId)
      high[highId] = high[highId] || createhigh(highId)

      bots[id].give({ low: low[lowId], high: high[highId] })
    }
  }

  return {
    comparing,
    outputs,
    bots
  }

  function bot (id) {
    let chips = []
    let instructions = {}

    return { assign, give, toString, chips }

    function assign (value) {
      chips.push(value)
      change()
    }

    function give (opt) {
      instructions = opt
      change()
    }

    function change () {
      if (chips.length === 2 && instructions.low) {
        comparing.push(`bot ${id} comparing ${chips}`)
        instructions.low.assign(Math.min(...chips))
        instructions.high.assign(Math.max(...chips))
        chips = []
      }
    }

    function toString () {
      return `bot ${id} has chips ${chips.join(',')}`
    }
  }

  function output (id) {
    let chips = []

    return { assign, toString, chips }

    function assign (value) {
      chips.push(value)
    }

    function toString () {
      return `output ${id} has chips ${chips.join(',')}`
    }
  }
}
