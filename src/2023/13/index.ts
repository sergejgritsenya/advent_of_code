import { DayHandler } from "../../common"

export class DayHandler13 extends DayHandler {
  protected day = 13

  protected part1(): number {
    const input = this.prepareInput()
    let a = 0
    let b = 0
    input.forEach((item) => {
      let res = this.check(item)
      if (res > 0) {
        a += res
        return
      }

      res = this.check(this.swap(item))
      b += res
    })

    return b * 100 + a
  }

  protected part2(): number {
    const input = this.prepareInput()
    let a = 0
    let b = 0

    // let res = this.check(input[0], 1)

    // return res

    input.forEach((item, idx) => {
      const checkA = this.check(item)
      let checkB = -1
      if (checkA < 0) {
        checkB = this.check(this.swap(item))
      }

      for (let i = 0; i < item.length; i++) {
        let char = item[i]
        if (char === "\n") continue
        char = char === "." ? "#" : "."
        const mirror = item.substring(0, i) + char + item.substring(i + 1)

        let res = this.check(mirror, checkA)
        if (res > 0) {
          a += res
          return
        }

        res = this.check(this.swap(mirror), checkB)
        if (res > 0) {
          b += res
          return
        }
      }
    })

    return b * 100 + a
  }

  private prepareInput(): string[] {
    return this.input.split("\n\n")
  }

  private check(str: string, excludeIdx = 0): number {
    if (excludeIdx < 0) excludeIdx = 0
    const input = str.split("\n")
    const length = input[0].length

    loop: for (let i = 1; i < length; i++) {
      for (let j = 0; j < input.length; j++) {
        const line = input[j]
        const [sub1, sub2] = [
          line.substring(0, i).split("").reverse().join(""),
          line.substring(i),
        ].sort((a, b) => b.length - a.length)

        if (!sub1.startsWith(sub2) || i === excludeIdx) continue loop
      }

      return i
    }

    return -1
  }

  private swap(str: string): string {
    const input = str.split("\n")
    const out: string[] = []

    for (let lineIdx = 0; lineIdx < input.length; lineIdx++) {
      const line = input[lineIdx]
      for (let charIdx = 0; charIdx < line.length; charIdx++) {
        let char = line[charIdx]
        if (!out[charIdx]) out[charIdx] = ""
        out[charIdx] += char
      }
    }

    return out.join("\n")
  }
}
