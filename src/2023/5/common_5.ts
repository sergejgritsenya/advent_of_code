export const processCategory = (source: [number, number][], str: string): [number, number][] => {
  const dest: [number, number][] = []
  const category = str.split("\n").map((item) => item.split(" ").map(Number))

  for (const subcategory of category) {
    processSubcategory(source, subcategory, dest)
    source = source.filter(([a, b]) => !!a && !!b)
  }

  return [...dest, ...source]
}

function processSubcategory(
  source: [number, number][],
  subcategory: number[],
  dest: [number, number][]
): void {
  const length = source.length
  for (let i = 0; i < length; i++) {
    const [start, range] = source[i]
    const end = start + range

    const [catDest, catStart, catRange] = subcategory
    const catEnd = catStart + catRange

    if (end < catStart || start > catEnd) continue

    if (start < catStart && end >= catStart && end <= catEnd) {
      source[i] = [start, catStart - start]
      dest.push([catDest, end - catStart])
      continue
    }

    if (end > catEnd && start <= catEnd && start >= catStart) {
      source[i] = [catEnd, end - catEnd]
      const destRange = catEnd - start
      const newStart = catDest + catRange - destRange
      dest.push([newStart, destRange])
      continue
    }

    if (start >= catStart && end <= catEnd) {
      source[i] = [0, 0]
      const shift = start - catStart
      dest.push([catDest + shift, range])
      continue
    }

    const temp: [number, number][] = []
    dest.push([catDest, catRange])
    temp.push([start, catStart - start])
    temp.push([catEnd, end - catEnd])
    source[i] = [0, 0]
    source.push(...temp)
  }
}
