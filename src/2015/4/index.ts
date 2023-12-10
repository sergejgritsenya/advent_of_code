import { createHash } from "crypto"
import { DayHandler } from "../../common"

export class DayHandler4 extends DayHandler {
  protected day = 4

  protected part1(): number {
    return this.mine("00000")
  }

  protected part2(): number {
    return this.mine("000000")
  }

  private mine(start: string): number {
    let num = 0

    while (true) {
      const str = this.input + num
      const hash = this.hash(str)

      if (hash.startsWith(start)) {
        return num
      }

      num++
    }
  }

  private hash(str: string): string {
    return createHash("md5").update(str).digest("hex")
  }
}
