import { DayHandler } from "../../common"

export class DayHandler9 extends DayHandler {
  protected day = 9

  protected part1(): number {
    const inputs = this.prepareInput()
    let res = 0

    for (const input of inputs) {
      const out = this.process(input, -1)
      res += out.reduce((acc, cur) => cur + acc, 0)
    }

    return res
  }

  protected part2(): number {
    const inputs = this.prepareInput()
    let res = 0

    for (const input of inputs) {
      const out = this.process(input, 0)
      res += out.reduce((acc, cur) => cur - acc, 0)
    }

    return res
  }

  private process(input: number[], idx: number): number[] {
    let isCheck = false
    let res = [input.at(idx)!]
    let temp = input

    while (!isCheck) {
      const { out, check } = this.shrink(temp)
      res.unshift(out.at(idx)!)
      temp = out
      isCheck = check
    }

    return res
  }

  private shrink(input: number[]): { out: number[]; check: boolean } {
    let check = true

    const out = input.reduce<number[]>((acc, cur, idx) => {
      if (idx + 1 < input.length) {
        const num = input[idx + 1] - cur
        if (num !== 0 && check) check = false
        acc.push(num)
      }
      return acc
    }, [])

    return { out, check }
  }

  private prepareInput(): number[][] {
    const arr = this.input.split("\n").map((item) => item.split(" ").map((i) => Number(i)))

    return arr
  }
}
