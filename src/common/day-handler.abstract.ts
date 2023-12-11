import { readFileSync } from "fs"

export abstract class DayHandler {
  protected abstract day: number
  private readonly year: string
  protected input: string = ""

  constructor(year: string) {
    this.year = year
  }

  protected abstract part1(): number

  protected abstract part2(): number

  public execute(): void {
    const partArg = process.argv[4]

    this.getInput()
    try {
      const responses: number[] = []

      if (partArg && typeof (this as any)[`part${partArg}`] === "function") {
        const res = (this as any)[`part${partArg}`]()
        responses.push(res)
      } else {
        const res1 = this.part1()
        const res2 = this.part2()
        responses.push(res1, res2)
      }

      console.log(`Day ${this.day}:`, ...responses)
    } catch (err) {
      console.error(`Day ${this.day} error: `, (err as Error).message)
    }
  }

  protected getInput(): void {
    this.input = readFileSync(`inputs/${this.year}/${this.day}.txt`).toString()
  }
}
