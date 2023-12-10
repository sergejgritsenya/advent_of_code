import { DayHandler } from "../../common"
import { MapGenerator } from "./map-generator"

export class DayHandler10 extends DayHandler {
  protected day = 10

  protected part1(): number {
    return this.prepareInput().join("").replaceAll(".", "").length / 2
  }

  protected part2(): number {
    const input = this.prepareInput()
    let res = 0

    for (let line = 1; line < input.length - 1; line++) {
      const str = input[line]
      for (let position = 1; position < str.length - 1; position++) {
        const char = str[position]
        if (char !== ".") continue

        const sub = str
          .substring(0, position)
          .replaceAll(".", "")
          .replaceAll("-", "")
          .replaceAll("FJ", "|")
          .replaceAll("L7", "|")

        const checkLeft = sub.length % 2 === 1

        if (checkLeft) res++
      }
    }

    return res
  }

  private prepareInput(): string[] {
    return new MapGenerator(this.input).execute()
  }
}
