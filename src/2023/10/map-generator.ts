import { SIDE_MAP } from "./side-map"

type TPosition = {
  line: number
  position: number
}

export class MapGenerator {
  private readonly map: string[]
  private readonly validIdx: string[] = []
  private readonly startLine: number
  private readonly startPosition: number

  constructor(str: string) {
    this.map = str.split("\n")
    this.startLine = this.map.findIndex((str) => str.includes("S"))
    this.startPosition = this.map[this.startLine].indexOf("S")
    this.validIdx.push(this.convert({ line: this.startLine, position: this.startPosition }))
  }

  public execute(): string[] {
    this.validate()

    return this.map.map((str, line) =>
      str
        .split("")
        .map((char, position) =>
          this.validIdx.includes(this.convert({ line, position })) ? char : "."
        )
        .join("")
    )
  }

  private validate(): void {
    let char = this.map[this.startLine][this.startPosition]
    let prev: TPosition = {
      line: this.startLine,
      position: this.startPosition,
    }
    let pos: TPosition = {
      line: this.startLine,
      position: this.startPosition,
    }

    do {
      const next = this.getNext(prev, pos)
      char = this.map[next.line][next.position]
      this.validIdx.push(this.convert(next))
      prev = pos
      pos = next
    } while (char !== "S")
  }

  private getNext(prev: TPosition, pos: TPosition): TPosition {
    const arr = this.map
    const { line, position } = pos
    const char = SIDE_MAP[arr[pos.line][pos.position]]
    const mapSize = this.map.length

    // up
    if (
      char.up &&
      pos.line > 0 &&
      prev.line !== pos.line - 1 &&
      SIDE_MAP[arr[line - 1][position]].down
    ) {
      return {
        line: line - 1,
        position,
      }
    }

    // down
    if (
      char.down &&
      line < mapSize - 1 &&
      prev.line !== line + 1 &&
      SIDE_MAP[arr[line + 1][position]].up
    ) {
      return {
        line: line + 1,
        position,
      }
    }

    // left
    if (
      char.left &&
      position > 0 &&
      prev.position !== position - 1 &&
      SIDE_MAP[arr[line][position - 1]].right
    ) {
      return {
        line,
        position: position - 1,
      }
    }

    // right
    return {
      line,
      position: position + 1,
    }
  }

  private convert(pos: TPosition): string {
    return `${pos.line}_${pos.position}`
  }
}
