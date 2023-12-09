import { DayHandler } from "../../common"

export class DayHandler9 extends DayHandler {
  protected day = 9

  protected part1(): number {
    const inputs = this.prepareInput()
    let res = 0

    for (const input of inputs) {
      res += this.process(input)
    }

    return res
  }

  protected part2(): number {
    const inputs = this.prepareInput()
    let res = 0

    for (const input of inputs) {
      res += this.process2(input)
    }

    return res
  }

  private process(input: number[]): number {
    let isCheck = false
    let res = input.at(-1)!
    let temp = input

    while (!isCheck) {
      const { out, check } = this.shrink(temp)
      res += out.at(-1)!
      temp = out
      isCheck = check
    }

    return res
  }

  private process2(input: number[]): number {
    let isCheck = false
    let res = [input[0]]
    let temp = input

    while (!isCheck) {
      const { out, check } = this.shrink(temp)
      res.unshift(out[0])
      temp = out
      isCheck = check
    }

    return res.reduce((acc, cur) => cur - acc, 0)
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
