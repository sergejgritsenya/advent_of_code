import { DayHandler } from "../../common"
import { processCategory } from "./common_5"

export class DayHandler5 extends DayHandler {
  protected day = 5

  protected part1(): number {
    const [seeds, ...categories] = this.prepareInput()

    // let res = 0
    let source: [number, number][] = seeds
      .split(" ")
      .map(Number)
      .map((item) => [item, 1])

    for (const category of categories) {
      source = processCategory(source, category)
    }

    return source.map((item) => item[0]).sort((a, b) => a - b)[0]
  }

  protected part2(): number {
    const [seeds, ...categories] = this.prepareInput()
    let source = this.prepareSeeds(seeds)

    for (const category of categories) {
      source = processCategory(source, category)
    }

    return source.map((item) => item[0]).sort((a, b) => a - b)[0]
  }

  private prepareSeeds(seeds: string): [number, number][] {
    const res: [number, number][] = []
    const source = seeds.split(" ").map(Number)
    for (let i = 0; i < source.length; i += 2) {
      res.push([source[i], source[i + 1]])
    }

    return res
  }

  private prepareInput(): string[] {
    return this.input
      .replaceAll(/([a-z]|:|-)/gi, "")
      .split("\n\n")
      .map((item) => item.trim())
  }
}
