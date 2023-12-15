import { DayHandler } from "../../common"

export class DayHandler15 extends DayHandler {
  protected day = 15

  protected part1(): number {
    return this.prepareInput().reduce((acc, cur) => (acc += this.getHash(cur)), 0)
  }

  protected part2(): number {
    const input = this.prepareInput()
    const boxes: Record<number, Record<string, string | number>[]> = {}

    input.forEach((str) => {
      if (str.includes("-")) {
        const [label] = str.split("-")
        const boxIdx = this.getHash(label)
        if (!boxes[boxIdx]) return

        const labelIdx = boxes[boxIdx].findIndex((item) => item.label === label)
        if (labelIdx === -1) return

        boxes[boxIdx].splice(labelIdx, 1)
      } else {
        let [label, focus] = str.split("=")
        const boxIdx = this.getHash(label)

        if (!boxes[boxIdx]) boxes[boxIdx] = []

        const labelIdx = boxes[boxIdx].findIndex((item) => item.label === label)
        if (labelIdx === -1) {
          return boxes[boxIdx].push({ label, focus: Number(focus) })
        }

        boxes[boxIdx][labelIdx].focus = Number(focus)
      }
    })

    let res = 0
    for (const key in boxes) {
      const items = boxes[key]
      if (!items.length) continue

      for (let i = 0; i < items.length; i++) {
        const temp = (Number(key) + 1) * (i + 1) * (items[i] as any).focus
        res += temp
      }
    }

    return res
  }

  private prepareInput(): string[] {
    return this.input.split(",")
  }

  private getHash(char: string): number {
    let res = 0
    for (let i = 0; i < char.length; i++) {
      res += char.charCodeAt(i)
      res *= 17
      res %= 256
    }
    return res
  }
}
