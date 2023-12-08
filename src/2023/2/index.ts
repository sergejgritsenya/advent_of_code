import { DayHandler } from "../../common"

const maxCubes: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
}

export class DayHandler2 extends DayHandler {
  protected day = 2

  protected part1(): number {
    return this.input
      .replaceAll("Game ", "")
      .split("\n")
      .map((item) => {
        const [game, record] = item.split(": ")
        return {
          game: Number(game),
          record,
        }
      })
      .filter(({ record }) =>
        record.split("; ").every((round) =>
          round.split(", ").every((item) => {
            const [num, color] = item.split(" ")
            return maxCubes[color] >= Number(num)
          })
        )
      )
      .reduce((acc, cur) => (acc += cur.game), 0)
  }

  protected part2(): number {
    const res = this.input
      .split("\n")
      .map((item) => item.split(": ").at(-1))
      .map((game) => {
        const roundData: Record<string, number> = {}
        game!.split("; ").map((round) => {
          round.split(", ").forEach((item) => {
            const [num, color] = item.split(" ")
            if (!roundData[color] || roundData[color] < Number(num)) {
              roundData[color] = Number(num)
            }
          })
        })
        return roundData
      })
      .map((item) => Object.values(item).reduce((acc, cur) => (acc *= cur), 1))
      .reduce((acc, cur) => (acc += cur), 0)

    return res
  }
}
