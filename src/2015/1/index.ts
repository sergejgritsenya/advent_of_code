import { DayHandler } from "../../common"

export class DayHandler1 extends DayHandler {
  protected day = 1

  protected part1(): number {
    const up = this.input.replaceAll(")", "").length
    const down = this.input.replaceAll("(", "").length
    return up - down
  }

  protected part2(): number {
    let res = 0

    for (let i = 0; i < this.input.length; i++) {
      if (this.input[i] === "(") res++
      if (this.input[i] === ")") res--

      if (res === -1) return i + 1
    }

    return res
  }
}
