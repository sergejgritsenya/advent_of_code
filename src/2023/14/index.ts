import { DayHandler } from "../../common"

export class DayHandler14 extends DayHandler {
  protected day = 14

  protected part1(): number {
    return this.getScore(this.bendUp(this.prepareInput()))
  }

  protected part2(): number {
    let input = this.prepareInput()
    const results = []

    for (let i = 0; i < 256; i++) {
      input = this.circle(input)
      results.push(this.getScore(input))
    }

    let check = `${results[0]}`
    let checkStr = results.slice(1).join(" ")
    let checkCount = 0

    for (let i = 0; i < results.length; i++) {
      if (!i) continue // skip 0 idx

      const res = results[i]
      if (checkStr.includes(`${check} ${res}`)) {
        if (checkCount > 3) {
          check += ` ${res}`
          break
        } else {
          check += ` ${res}`
          checkStr = results.slice(i + 1).join(" ")
          checkCount++
        }
      } else {
        check = `${res}`
        checkStr = results.slice(i + 1).join(" ")
        checkCount = 0
      }
    }

    const arr = results.join(" ").split(check)
    const sliceLength = arr[0].split(" ").filter(Boolean).length
    const answers = (check + " " + arr[1]).split(" ").filter(Boolean)
    const idx = ((1_000_000_000 - sliceLength) % answers.length) - 1

    return Number(answers[idx])
  }

  private getScore(input: string[]): number {
    const length = input.length
    return input.reduce(
      (acc, cur, idx) =>
        (acc += cur.replaceAll(".", "").replaceAll("#", "").length * (length - idx)),
      0
    )
  }

  private prepareInput(): string[] {
    return this.input.split("\n")
  }

  private bendUp(input: string[]): string[] {
    return this.swapOver(this.bendRight(this.swap(input)))
  }

  private bendDown(input: string[]): string[] {
    return this.swap(this.bendRight(this.swapOver(input)))
  }

  private bendLeft(input: string[]): string[] {
    return input.map((line) =>
      line
        .split("#")
        .map((sub) => {
          if (!sub) return sub
          const subLength = sub.length
          return sub.replaceAll(".", "").padEnd(subLength, ".")
        })
        .join("#")
        .padStart(line.length, "#")
    )
  }

  private bendRight(input: string[]): string[] {
    return input.map((line) =>
      line
        .split("#")
        .map((sub) => {
          if (!sub) return sub
          const subLength = sub.length
          return sub.replaceAll(".", "").padStart(subLength, ".")
        })
        .join("#")
        .padEnd(line.length, "#")
    )
  }

  private swap(input: string[]): string[] {
    const out: string[] = []

    for (let lineIdx = 0; lineIdx < input.length; lineIdx++) {
      const line = input[lineIdx]
      for (let charIdx = 0; charIdx < line.length; charIdx++) {
        let char = line[charIdx]
        if (!out[charIdx]) out[charIdx] = ""
        out[charIdx] = char + out[charIdx]
      }
    }

    return out
  }

  private swapOver(input: string[]): string[] {
    const length = input.length
    const lineLength = input[0].length
    const out: string[] = new Array(lineLength).fill("")

    for (let charIdx = lineLength - 1; charIdx >= 0; charIdx--) {
      for (let lineIdx = 0; lineIdx < length; lineIdx++) {
        let char = input[lineIdx][charIdx]
        out[lineLength - charIdx - 1] += char
      }
    }

    return out
  }

  private circle(input: string[]): string[] {
    let out = this.bendUp(input)
    out = this.bendLeft(out)
    out = this.bendDown(out)
    return this.bendRight(out)
  }
}
