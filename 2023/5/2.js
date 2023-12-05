import { readFile } from 'node:fs/promises'

export default async function (filePath) {
  const input = await readFile(filePath, 'utf-8')
  const lines = input.split(/[\r\n]/).filter(Boolean)
  const plant = parse(lines)

  let location

  for (const seed of seeds(plant.seeds)) {
    const seedLocation = destination(
      destination(
        destination(
          destination(
            destination(
              destination(
                destination(seed, plant.seedToSoil),
                plant.soilToFertilizer
              ),
              plant.fertilizerToWater
            ),
            plant.waterToLight
          ),
          plant.lightToTemperature
        ),
        plant.temperatureToHumidity
      ),
      plant.humidityToLocation
    )

    if (typeof location === 'undefined' || seedLocation < location) {
      location = seedLocation
    }
  }

  return location
}

function* seeds(numbers) {
  while (numbers.length) {
    let [start, length] = numbers.splice(0, 2)
    for (let n = start; n < start + length; n++) {
      yield n
    }
  }
}

function destination(from, mappings) {
  for (const map of mappings) {
    if (map.range === 0) {
      continue
    }
    if (from <= map.start + map.range && from >= map.start) {
      const offset = from - map.start
      return map.to + offset
    }
  }
  return from
}

function parse(lines) {
  const parsed = {}
  let mappingKey
  for (const line of lines) {
    if (line?.startsWith('seeds:')) {
      parsed.seeds = Array.from(line.match(/\d+/g)).map(Number)
    } else if (line?.endsWith('map:')) {
      mappingKey = line
        .trim()
        .slice(0, -1 * ' map:'.length)
        .replace(/-[a-z]/g, (s) => s.slice(1).toUpperCase())
    } else {
      const [to, start, range] = Array.from(line.match(/\d+/g)).map(Number)
      parsed[mappingKey] ||= []
      if (range !== 0) {
        parsed[mappingKey].push({ to, start, range: range - 1 })
      }
    }
  }
  return parsed
}
