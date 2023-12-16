import { DayHandler } from "../../common"

enum EDirections {
  UP = 0,
  RIGHT = 1,
  DOWN = 2,
  LEFT = 3,
}

const speeds = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
]

type TBeam = {
  position: number[]
  speed: EDirections
}

export class DayHandler16 extends DayHandler {
  protected day = 16

  protected part1(): number {
    const input = this.prepareInput()
    const beam = { position: [0, 0], speed: EDirections.RIGHT }
    return this.walk(beam, input)
  }

  protected part2(): number {
    const input = this.prepareInput()
    let max = 0

    for (let i = 0; i < input.length; i++) {
      let beams = [
        { position: [i, 0], speed: EDirections.DOWN },
        { position: [i, input.length - 1], speed: EDirections.UP },
        { position: [0, i], speed: EDirections.RIGHT },
        { position: [input.length - 1, i], speed: EDirections.LEFT },
      ]
      max = Math.max(max, ...beams.map((beam) => this.walk(beam, input)))
    }

    return max
  }

  private walk(_beam: TBeam, input: string[][]): number {
    const seen: Set<string> = new Set()
    const out: Set<string> = new Set()
    const beams: TBeam[] = [_beam]

    let beam
    while ((beam = beams.pop())) {
      const key = this.getKey(...beam.position, beam.speed)
      if (beam.position.some((item) => item < 0 || item > input.length - 1) || seen.has(key))
        continue

      seen.add(key)
      out.add(this.getKey(...beam.position))
      beams.push(...this.step(beam, input[beam.position[1]][beam.position[0]]))
    }

    return out.size
  }

  private step(beam: TBeam, char: string): TBeam[] {
    const { speed, position } = beam
    let res = [speed]

    switch (char) {
      case "-":
        if ([EDirections.UP, EDirections.DOWN].includes(speed)) {
          res = [EDirections.LEFT, EDirections.RIGHT]
        }
        break
      case "|":
        if ([EDirections.LEFT, EDirections.RIGHT].includes(speed)) {
          res = [EDirections.UP, EDirections.DOWN]
        }
        break
      case "/":
        switch (speed) {
          case EDirections.RIGHT:
            res = [EDirections.UP]
            break
          case EDirections.LEFT:
            res = [EDirections.DOWN]
            break
          case EDirections.UP:
            res = [EDirections.RIGHT]
            break
          default:
            res = [EDirections.LEFT]
            break
        }
        break
      case "\\":
        switch (speed) {
          case EDirections.RIGHT:
            res = [EDirections.DOWN]
            break
          case EDirections.LEFT:
            res = [EDirections.UP]
            break
          case EDirections.UP:
            res = [EDirections.LEFT]
            break
          default:
            res = [EDirections.RIGHT]
            break
        }
        break
    }

    return res.map((item) => ({
      speed: item,
      position: position.map((item, idx) => item + speeds[item][idx]),
    }))
  }

  private prepareInput(): string[][] {
    return this.input.split("\n").map((item) => item.split(""))
  }

  private getKey(...args: number[]): string {
    return args.join("_")
  }
}
