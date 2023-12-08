import { DayHandler } from "../../common"

export class DayHandler1 extends DayHandler {
  protected day = 1

  protected part1(): number {
    return this.input
      .split("\n")
      .map((item) => item.replace(/[A-Za-z]/gi, ""))
      .map((item) => Number(item.at(0)! + item.at(-1)!))
      .reduce((acc, cur) => (acc += cur), 0)
  }

  protected part2(): number {
    return this.input
      .split("\n")
      .map((item) =>
        Number(`${this.getNumber(item, "startsWith")}${this.getNumber(item, "endsWith")}`)
      )
      .reduce((acc, cur) => (acc += cur), 0)
  }

  private getNumber(str: string, callback: "startsWith" | "endsWith"): number {
    let temp = str
    switch (true) {
      case temp[callback]("1"):
      case temp[callback]("one"): {
        return 1
      }
      case temp[callback]("2"):
      case temp[callback]("two"): {
        return 2
      }
      case temp[callback]("3"):
      case temp[callback]("three"): {
        return 3
      }
      case temp[callback]("4"):
      case temp[callback]("four"): {
        return 4
      }
      case temp[callback]("5"):
      case temp[callback]("five"): {
        return 5
      }
      case temp[callback]("6"):
      case temp[callback]("six"): {
        return 6
      }
      case temp[callback]("7"):
      case temp[callback]("seven"): {
        return 7
      }
      case temp[callback]("8"):
      case temp[callback]("eight"): {
        return 8
      }
      case temp[callback]("9"):
      case temp[callback]("nine"): {
        return 9
      }
      default: {
        temp = callback === "startsWith" ? temp.substring(1) : temp.substring(0, temp.length - 1)
        return this.getNumber(temp, callback)
      }
    }
  }
}
