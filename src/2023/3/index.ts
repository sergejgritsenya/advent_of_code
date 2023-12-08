import { DayHandler } from "../../common"

type TOutput = {
  num: number
  lineIdx: number
  startIdx: number
  endIdx: number
}

export class DayHandler3 extends DayHandler {
  protected day = 3

  protected part1(): number {
    return this.getNumbers()
      .filter((item) => {
        const { lineIdx, startIdx, endIdx } = item
        for (let i = endIdx; i >= startIdx; i--) {
          for (const lineShift of [-1, 0, 1]) {
            for (const idxShift of [-1, 0, 1]) {
              const gear = this.getGear(lineIdx + lineShift, i + idxShift)
              if (this.isSymbol(gear)) {
                return true
              }
            }
          }
        }

        return false
      })
      .reduce((acc, cur) => (acc += cur.num), 0)
  }

  protected part2(): number {
    const out = this.getNumbers()
    const geared: Record<string, number[]> = {}
    connected: for (const item of out) {
      const { num, lineIdx, startIdx, endIdx } = item
      for (let i = endIdx; i >= startIdx; i--) {
        for (const lineShift of [-1, 0, 1]) {
          for (const idxShift of [-1, 0, 1]) {
            const gear = this.getGear(lineIdx + lineShift, i + idxShift)
            if (this.isGear(gear)) {
              const key = `${lineIdx + lineShift}_${i + idxShift}`
              if (!geared[key]) {
                geared[key] = []
              }
              geared[key].push(num)
              continue connected
            }
          }
        }
      }
    }

    let res = 0
    for (const key in geared) {
      if (geared[key].length > 1) {
        res += geared[key].reduce((acc, cur) => (acc *= cur), 1)
      }
    }

    return res
  }

  private getNumbers(): TOutput[] {
    const output: TOutput[] = []
    this.input.split("\n").forEach((line, lineIdx) => {
      let temp = ""
      let startIdx = 0
      line.split("").forEach((char, idx) => {
        if (/\d/.test(char)) {
          if (!temp) {
            startIdx = idx
          }
          temp += char
        } else if (temp) {
          output.push({
            num: Number(temp),
            lineIdx,
            startIdx,
            endIdx: idx - 1,
          })
          temp = ""
          startIdx = 0
        }

        if (temp && idx + 1 === line.length) {
          output.push({
            num: Number(temp),
            lineIdx,
            startIdx,
            endIdx: idx - 1,
          })
        }
      })
    })

    return output
  }

  private getGear(lineIdx: number, idx: number): string {
    return this.input.split("\n")[lineIdx]?.[idx]
  }

  private isSymbol(char: string): boolean {
    return !!char && char !== "." && /\D/.test(char)
  }

  private isGear(char: string): boolean {
    return !!char && char === "*"
  }
}
