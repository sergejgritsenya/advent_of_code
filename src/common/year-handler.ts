import * as fs from "fs"
import * as path from "path"
import { DayHandler } from "./day-handler.abstract"

export class YearHandler {
  private dirname: string

  constructor(dirname: string) {
    this.dirname = dirname
  }

  public execute(): void {
    const years = fs.readdirSync(this.dirname).filter((item) => !Number.isNaN(Number(item)))
    for (const year of years) {
      console.time("executed")
      this.executeOne(year)
      console.log("\n")
      console.timeEnd("executed")
      console.log("\n")
    }
  }

  private executeOne(year: string): void {
    console.log(`<<${year}>>\n`)

    const handlers: DayHandler[] = Object.values(require(path.resolve(this.dirname, year))).map(
      (cls: any) => new cls(year)
    )

    for (const handler of handlers) {
      handler.execute()
    }
  }
}
