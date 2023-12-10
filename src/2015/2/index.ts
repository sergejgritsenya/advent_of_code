import { DayHandler } from "../../common"

export class DayHandler2 extends DayHandler {
  protected day = 2

  protected part1(): number {
    return this.input.split("\n").reduce((acc, cur) => {
      const [l, w, h] = cur.split("x").map((item) => Number(item))
      const a = l * w
      const b = w * h
      const c = h * l

      const min = Math.min(a, b, c)

      return (acc += 2 * a + 2 * b + 2 * c + min)
    }, 0)
  }

  protected part2(): number {
    return this.input.split("\n").reduce((acc, cur) => {
      const [a, b, c] = cur
        .split("x")
        .map((item) => Number(item))
        .sort((a, b) => a - b)

      return (acc += 2 * a + 2 * b + a * b * c)
    }, 0)
  }
}
