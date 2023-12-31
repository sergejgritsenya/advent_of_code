import * as fs from "fs"
import * as path from "path"
import { DayHandler } from "./day-handler.abstract"

export class YearHandler {
  private dirname: string

  constructor(dirname: string) {
    this.dirname = dirname
  }

  public execute(): void {
    try {
      const yearArg = process.argv[2]

      const years = yearArg
        ? [yearArg]
        : fs.readdirSync(path.resolve(this.dirname)).filter((item) => !Number.isNaN(Number(item)))

      for (const year of years) {
        console.time("executed")
        this.executeOne(year)
        console.log("\n")
        console.timeEnd("executed")
        console.log("\n")
      }
    } catch (_err) {
      console.error("Invalid args")
    }
  }

  private executeOne(year: string): void {
    const dayArg = process.argv[3] || ""

    console.log(`<<${year}>>\n`)
    const handlers: DayHandler[] = Object.entries(require(path.resolve(this.dirname, year, dayArg)))
      .sort(([a], [b]) => Number(a.replace("DayHandler", "")) - Number(b.replace("DayHandler", "")))
      .map(([, cls]) => new (cls as any)(year))

    for (const handler of handlers) {
      handler.execute()
    }
  }
}
