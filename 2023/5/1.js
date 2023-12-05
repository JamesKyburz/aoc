import { readFile } from 'node:fs/promises'
export default async function (filePath) {
  const input = await readFile(filePath, 'utf-8')
  const lines = input.split(/[\r\n]/).filter(Boolean)
  const plant = parse(lines)
  return Math.min(...plant.seeds
    .map(createMapper(plant, 'seedToSoil'))
    .map(createMapper(plant, 'soilToFertilizer'))
    .map(createMapper(plant, 'fertilizerToWater'))
    .map(createMapper(plant, 'waterToLight'))
    .map(createMapper(plant, 'lightToTemperature'))
    .map(createMapper(plant, 'temperatureToHumidity'))
    .map(createMapper(plant, 'humidityToLocation'))
  )
}

function createMapper(plant, name) {
  return function (n) {
    return destination(n, plant[name])
  }
}

function destination(from, mappings) {
    for (const map of mappings) {
      if (map.range === 0) {
        continue
      }
      if ((from <= (map.start + map.range)) &&
           from >= map.start
      ) {
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
      mappingKey = line.trim().slice(0, (-1 * ' map:'.length)).replace(/-[a-z]/g, s => s.slice(1).toUpperCase())
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
