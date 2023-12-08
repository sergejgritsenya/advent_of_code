import { DayHandler } from "../../common"

export class DayHandler8 extends DayHandler {
  protected day = 8
  private legend: string = ""
  private map: Record<string, [string, string]> = {}

  protected part1(): number {
    this.prepareInput()

    let step = 0
    let key = "AAA"
    let res = 0

    while (key !== "ZZZ") {
      if (!this.legend[step]) {
        step = 0
      }
      const next = this.map[key]
      key = next[Number(this.legend[step])]
      step++
      res++
    }

    return res
  }

  protected part2(): number {
    this.prepareInput()

    const aKeys = Object.keys(this.map).filter((key) => key.at(-1) === "A")
    const scores: number[] = []
    for (let key of aKeys) {
      scores.push(this.getScore(key))
    }

    scores.sort((a, b) => a - b)

    const min = scores[0]
    let res = min

    scores.forEach((n) => {
      res = this.lcm(res, n)
    })

    return res
  }

  // greatest common divisor
  private gcd(mul: number, num: number): number {
    return !num ? mul : this.gcd(num, mul % num)
  }

  // least common multiple
  private lcm(mul: number, num: number): number {
    return (mul * num) / this.gcd(mul, num)
  }

  private getScore(startKey: string): number {
    let step = 0
    let key = startKey
    let score = 0

    do {
      if (!this.legend[step]) {
        step = 0
      }
      const next = this.map[key]
      key = next[Number(this.legend[step])]
      step++
      score++
    } while (key.at(-1) !== "Z")

    return score
  }

  private prepareInput(): void {
    const [legend, map] = this.input.replaceAll(" = (", "=").replaceAll(/\)/g, "").split("\n\n")

    this.legend = legend.replaceAll("L", "0").replaceAll("R", "1")

    this.map = map.split("\n").reduce((acc, cur) => {
      const [key, valueStr] = cur.split("=")
      acc[key] = valueStr.split(", ") as [string, string]
      return acc
    }, {} as Record<string, [string, string]>)
  }
}
