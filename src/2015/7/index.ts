import { DayHandler } from "../../common"
import { TGatesValidate } from "./types"
import { Validator } from "./validator"

export class DayHandler7 extends DayHandler {
  protected day = 7

  protected part1(): number {
    const state: Record<string, number> = {}
    const input = this.prepareInput()
    const validator = new Validator()

    while (!Object.hasOwn(state, "a")) {
      input.forEach(({ cmd, executed }, idx) => {
        if (executed) return
        const valid = validator.validate(cmd, state)
        if (valid.valid) {
          this.process(valid, state)
          input[idx].executed = true
        }
      })
    }

    return state.a
  }

  protected part2(): number {
    const newB = this.part1()
    const state: Record<string, number> = {
      b: newB,
    }

    const input = this.prepareInput().filter((item) => !item.cmd.endsWith("-> b"))
    const validator = new Validator()

    while (!Object.hasOwn(state, "a")) {
      input.forEach(({ cmd, executed }, idx) => {
        if (executed) return
        const valid = validator.validate(cmd, state)
        if (valid.valid) {
          this.process(valid, state)
          input[idx].executed = true
        }
      })
    }

    return state.a
  }

  private prepareInput(): { cmd: string; executed: boolean }[] {
    return this.input.split("\n").map((cmd) => ({ cmd, executed: false }))
  }

  private process(cmd: TGatesValidate, state: Record<string, number>): void {
    const key = cmd.key!
    const input = cmd.input!
    const command = cmd.command

    if (!command) {
      state[key] = input[0]
      return
    }

    switch (command) {
      case "NOT": {
        state[key] = 65535 - input[0]
        return
      }
      case "AND": {
        state[key] = input[0] & input[1]
        return
      }
      case "OR": {
        state[key] = input[0] | input[1]
        return
      }
      case "LSHIFT": {
        state[key] = input[0] << input[1]
        return
      }
      case "RSHIFT": {
        state[key] = input[0] >> input[1]
        return
      }
    }

    throw new Error(JSON.stringify(input))
  }
}
