import { readFileSync } from "fs"

export abstract class DayHandler {
  protected abstract day: number
  private readonly year: string
  protected input: string = ""

  constructor(year: string) {
    this.year = year
  }

  protected abstract part1(): any

  protected abstract part2(): any

  public execute(): void {
    this.getInput()
    try {
      const res1 = this.part1()
      const res2 = this.part2()
      console.log(`Day ${this.day}:`, res1, res2)
    } catch (err) {
      console.error(`Day ${this.day} error: `, (err as Error).message)
    }
  }

  protected getInput(): void {
    this.input = readFileSync(`inputs/${this.year}/${this.day}.txt`).toString()
  }
}
