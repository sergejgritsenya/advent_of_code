import { DayHandler } from "../../common"

type TPosition = {
  x: number
  y: number
}

export class DayHandler3 extends DayHandler {
  protected day = 3

  protected part1(): number {
    const res: Record<string, number> = {
      "0_0": 1,
    }
    const pos: TPosition = {
      x: 0,
      y: 0,
    }

    for (let i = 0; i < this.input.length; i++) {
      const char = this.input[i]

      this.update(char, pos)
      const key = this.convert(pos)
      if (!res[key]) res[key] = 0

      res[key]++
    }

    return Object.keys(res).length
  }

  protected part2(): number {
    const res: Record<string, number> = {
      "0_0": 2,
    }
    const pos: TPosition = {
      x: 0,
      y: 0,
    }
    const roboPos: TPosition = {
      x: 0,
      y: 0,
    }

    for (let i = 0; i < this.input.length; i += 2) {
      const char = this.input[i]

      this.update(char, pos)
      const key = this.convert(pos)
      if (!res[key]) res[key] = 0

      res[key]++
    }

    for (let i = 1; i < this.input.length; i += 2) {
      const char = this.input[i]

      this.update(char, roboPos)
      const key = this.convert(roboPos)
      if (!res[key]) res[key] = 0

      res[key]++
    }

    return Object.keys(res).length
  }

  private update(char: string, pos: TPosition): void {
    switch (char) {
      case ">": {
        pos.x++
        return
      }
      case "<": {
        pos.x--
        return
      }
      case "^": {
        pos.y++
        return
      }
      case "v": {
        pos.y--
        return
      }
    }
  }

  private convert(pos: TPosition): string {
    return `${pos.x}_${pos.y}`
  }
}
