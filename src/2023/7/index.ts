import { DayHandler } from "../../common"
import { CARD_SCORE, JOKER_CARD_SCORE, TYPE_SCORE } from "./common_7"

export class DayHandler7 extends DayHandler {
  protected day = 7

  protected part1(): number {
    const input = this.prepareInput().map<[string, number, number]>(([str, bid]) => [
      str,
      this.getType(str),
      bid,
    ])
    return this.sort(input, CARD_SCORE).reduce((acc, cur, idx) => (acc += cur[2] * (idx + 1)), 0)
  }

  protected part2(): number {
    const input = this.prepareInput().map<[string, number, number]>(([str, bid]) => [
      str,
      this.getJokerType(str),
      bid,
    ])

    return this.sort(input, JOKER_CARD_SCORE).reduce(
      (acc, cur, idx) => (acc += cur[2] * (idx + 1)),
      0
    )
  }

  private getType(str: string): number {
    const res = str.split("").reduce((acc, char) => {
      if (!acc[char]) acc[char] = 0
      acc[char]++
      return acc
    }, {} as Record<string, number>)

    const key = Object.values(res)
      .sort((a, b) => b - a)
      .join("")

    return TYPE_SCORE[key]
  }

  private getJokerType(str: string): number {
    const res = str.split("").reduce((acc, char) => {
      if (!acc[char]) acc[char] = 0
      acc[char]++
      return acc
    }, {} as Record<string, number>)

    if (!res.J) {
      const key = Object.values(res)
        .sort((a, b) => b - a)
        .join("")

      return TYPE_SCORE[key]
    }
    const { J, ...rest } = res
    const temp = Object.values(rest).sort((a, b) => b - a)
    if (!temp[0]) temp[0] = 0
    temp[0] += J

    return TYPE_SCORE[temp.join("")]
  }

  private sort(
    input: [string, number, number][],
    cardScore: Record<string, number>
  ): [string, number, number][] {
    return input.sort((a, b) => {
      if (b[1] !== a[1]) return a[1] - b[1]

      const [score1, score2] = this.compare(a[0], b[0], cardScore)
      return score1 - score2
    })
  }

  private compare(str1: string, str2: string, cardScore: Record<string, number>): [number, number] {
    for (let i = 0; i < str1.length; i++) {
      if (str1[i] !== str2[i]) {
        return [cardScore[str1[i]], cardScore[str2[i]]]
      }
    }

    return [0, 0]
  }

  private prepareInput(): [string, number][] {
    return this.input.split("\n").map((item) => {
      const [str, bid] = item.split(" ")
      return [str, Number(bid)]
    })
  }
}
