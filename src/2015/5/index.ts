import { DayHandler } from "../../common"

const badStr = ["ab", "cd", "pq", "xy"]
export class DayHandler5 extends DayHandler {
  protected day = 5

  protected part1(): number {
    return this.input.split("\n").filter(this.check1).length
  }

  protected part2(): number {
    return this.input.split("\n").filter(this.check2).length
  }

  private check1(str: string): boolean {
    const vowel = str.replaceAll(/[^aeiou]/gi, "").length > 2

    if (!vowel) return false

    let double = false
    for (let i = str.length - 1; i > 0; i--) {
      if (str[i] === str[i - 1]) {
        double = true
        break
      }
    }
    if (!double) return false

    return badStr.every((bs) => !str.includes(bs))
  }

  private check2(str: string): boolean {
    let double = false

    for (let i = str.length - 1; i > 2; i--) {
      const pair = `${str[i - 1]}${str[i]}`
      const checkIdx = str.indexOf(pair)
      if (i - 1 !== checkIdx && checkIdx + 1 !== i - 1) {
        double = true
        break
      }
    }

    if (!double) return false

    let between = false
    for (let i = str.length - 1; i > 1; i--) {
      if (str[i] === str[i - 2]) {
        between = true
        break
      }
    }

    return between
  }
}
