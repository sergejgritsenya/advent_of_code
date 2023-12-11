export class Expander {
  private input: string[]

  constructor(input: string[]) {
    this.input = [...input]
  }

  public execute(): { xWeights: number[]; yWeights: number[] } {
    const xWeights = this.getWeights()
    this.swap()
    const yWeights = this.getWeights()

    return { xWeights, yWeights }
  }

  private swap(): this {
    const out: string[] = []

    for (let lineIdx = 0; lineIdx < this.input.length; lineIdx++) {
      const line = this.input[lineIdx]
      for (let charIdx = 0; charIdx < line.length; charIdx++) {
        let char = line[charIdx]
        if (!out[charIdx]) out[charIdx] = ""
        out[charIdx] += char
      }
    }

    this.input = out

    return this
  }

  private getWeights(): number[] {
    const res: number[] = []

    this.input.forEach((item, idx) => {
      if (!item.includes("#")) {
        res.push(idx)
      }
    })

    return res
  }
}
