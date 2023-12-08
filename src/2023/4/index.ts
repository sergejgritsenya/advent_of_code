import { DayHandler } from "../../common"

export class DayHandler4 extends DayHandler {
  protected day = 4

  protected part1(): number {
    return this.input
      .replaceAll("Card ", "")
      .split("\n")
      .map((line) => {
        const [_num, card] = line.split(":")
        const [win, have] = card.trim().split("|")
        return {
          win: win.trim().split(" ").filter(Boolean).map(Number),
          have: have.trim().split(" ").filter(Boolean).map(Number),
        }
      })
      .map((card) => {
        const { win, have } = card
        return have.filter((item) => win.includes(item)).length
      })
      .filter(Boolean)
      .map((item) => 2 ** (item - 1))
      .reduce((acc, cur) => (acc += cur))
  }

  protected part2(): number {
    const cards = this.input
      .replaceAll("Card ", "")
      .split("\n")
      .map((line) => {
        const [num, card] = line.split(":")
        const [win, have] = card.trim().split("|")
        return {
          num: Number(num),
          win: win.trim().split(" ").filter(Boolean).map(Number),
          have: have.trim().split(" ").filter(Boolean).map(Number),
        }
      })
      .map(({ num, win, have }) => ({
        num,
        score: have.filter((item) => win.includes(item)).length,
      }))

    const copies: Record<number, number> = {}
    cards.forEach(({ num }) => (copies[num] = 1))

    for (const { num, score } of cards) {
      const factor = copies[num]
      for (let i = score; i > 0; i--) {
        const key = num + i
        copies[key] += factor
      }
    }

    return Object.values(copies).reduce((acc, cur) => (acc += cur))
  }
}
