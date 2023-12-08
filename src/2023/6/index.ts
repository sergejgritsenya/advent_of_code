import { DayHandler } from "../../common"

export class DayHandler6 extends DayHandler {
  protected day = 6

  protected part1(): number {
    const [times, distances] = this.prepareInput()
    return times.reduce((acc, cur, idx) => (acc *= this.process(cur, distances[idx])), 1)
  }

  protected part2(): number {
    const [time, distance] = this.prepareInput().map((item) => Number(item.join("")))
    return this.process(time, distance)
  }

  private process(time: number, distance: number): number {
    const disc = Math.sqrt(time ** 2 - 4 * distance)
    return Math.ceil((time + disc) / 2) - Math.floor((time - disc) / 2) - 1
  }

  private prepareInput(): [number[], number[]] {
    return this.input
      .replaceAll(/[a-z|\:]/gi, "")
      .split("\n")
      .map((item) => item.trim().split(" ").filter(Boolean).map(Number)) as [number[], number[]]
  }
}
