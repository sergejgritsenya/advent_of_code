import { DayHandler } from "../../common"
import { Expander } from "./expander"
import { TCoordinates } from "./types"

export class DayHandler11 extends DayHandler {
  protected day = 11

  protected part1(): number {
    const input = this.prepareInput()

    const { xWeights, yWeights } = new Expander(input).execute()
    const coordinates = this.getCoordinates(input)
    return this.calculate(coordinates, xWeights, yWeights, 2)
  }

  protected part2(): number {
    const input = this.prepareInput()

    const { xWeights, yWeights } = new Expander(input).execute()
    const coordinates = this.getCoordinates(input)
    return this.calculate(coordinates, xWeights, yWeights, 1_000_000)
  }

  private prepareInput(): string[] {
    return this.input.split("\n")
  }

  private getCoordinates(input: string[]): Record<string, TCoordinates> {
    const res: Record<string, TCoordinates> = {}
    let count = 1
    for (let y = 0; y < input.length; y++) {
      const line = input[y]
      for (let x = 0; x < line.length; x++) {
        const char = line[x]
        if (char !== "#") continue

        res[count] = { x, y }
        count++
      }
    }

    return res
  }

  private calculate(
    input: Record<string, TCoordinates>,
    xWeights: number[],
    yWeights: number[],
    weight: number
  ): number {
    let res = 0
    const keys = Object.keys(input)

    for (let i = 0; i < keys.length - 1; i++) {
      const key1 = keys[i]
      for (let j = i + 1; j < keys.length; j++) {
        const key2 = keys[j]

        const [startX, endX] = [input[key1].x, input[key2].x].sort((a, b) => a - b)
        const [startY, endY] = [input[key1].y, input[key2].y].sort((a, b) => a - b)

        const xFilter = yWeights.filter((item) => item > startX && item < endX)
        const yFilter = xWeights.filter((item) => item > startY && item < endY)

        const x = Math.abs(input[key2].x - input[key1].x) + xFilter.length * (weight - 1)
        const y = Math.abs(input[key2].y - input[key1].y) + yFilter.length * (weight - 1)

        res += x
        res += y
      }
    }

    return res
  }
}
