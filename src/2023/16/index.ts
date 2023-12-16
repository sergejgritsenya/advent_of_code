import { DayHandler } from "../../common"

const speedMap = {
  UP: [0, -1],
  RIGHT: [1, 0],
  DOWN: [0, 1],
  LEFT: [-1, 0],
}

type TBeam = {
  position: number[]
  speed: number[]
}

export class DayHandler16 extends DayHandler {
  protected day = 16

  protected part1(): number {
    const input = this.prepareInput()
    const beam = { position: [0, 0], speed: [1, 0] }
    return this.walk(beam, input)
  }

  protected part2(): number {
    const input = this.prepareInput()
    let max = 0

    for (let i = 0; i < input.length; i++) {
      let beams = [
        { position: [i, 0], speed: speedMap.DOWN },
        { position: [i, input.length - 1], speed: speedMap.UP },
        { position: [0, i], speed: speedMap.RIGHT },
        { position: [input.length - 1, i], speed: speedMap.LEFT },
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
      const key = this.getKey(...beam.position, ...beam.speed)
      if (beam.position.some((item) => item < 0 || item > input.length - 1) || seen.has(key))
        continue

      seen.add(key)
      out.add(this.getKey(...beam.position))
      beams.push(...this.move(beam, input[beam.position[1]][beam.position[0]]))
    }

    return out.size
  }

  private move(beam: TBeam, char: string): TBeam[] {
    const { speed, position } = beam
    let res = [speed]

    switch (char) {
      case "-":
        if (speed[0] === 0) res = [speedMap.LEFT, speedMap.RIGHT]
        break
      case "|":
        if (speed[1] === 0) res = [speedMap.UP, speedMap.DOWN]
        break
      case "/":
        res = [[-speed[1], -speed[0]]]
        break
      case "\\":
        res = [[speed[1], speed[0]]]
        break
    }

    return res.map((spd) => ({
      speed: spd,
      position: position.map((pos, idx) => pos + spd[idx]),
    }))
  }

  private prepareInput(): string[][] {
    return this.input.split("\n").map((item) => item.split(""))
  }

  private getKey(...args: number[]): string {
    return args.join("_")
  }
}
