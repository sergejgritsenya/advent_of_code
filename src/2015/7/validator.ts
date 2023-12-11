import { TGatesValidate } from "./types"

export class Validator {
  public validate(input: string, state: Record<string, number>): TGatesValidate {
    const [commandStr, key] = input.split(" -> ")
    const arr = commandStr.split(" ")
    if (arr.length === 1) return { ...this.validateProvide(arr[0], state), key }
    if (arr.length === 2) return { ...this.validateNot(arr, state), key }

    return { ...this.validateRemaining(arr, state), key }
  }

  private validateProvide(key: string, state: Record<string, number>): TGatesValidate {
    if (!Number.isNaN(Number(key))) {
      return { valid: true, input: [Number(key)] }
    }

    if (Object.hasOwn(state, key)) {
      return { valid: true, input: [state[key]] }
    }

    return { valid: false }
  }

  private validateNot(arr: string[], state: Record<string, number>): TGatesValidate {
    const [command, key] = arr
    if (!Number.isNaN(Number(key))) {
      return { valid: true, command, input: [Number(key)] }
    }

    if (Object.hasOwn(state, key)) {
      return { valid: true, command, input: [state[key]] }
    }

    return { valid: false }
  }

  private validateRemaining(arr: string[], state: Record<string, number>): TGatesValidate {
    const [key1Str, command, key2Str] = arr

    const key1 = !Number.isNaN(Number(key1Str))
      ? Number(key1Str)
      : Object.hasOwn(state, key1Str)
      ? state[key1Str]
      : null

    const key2 = !Number.isNaN(Number(key2Str))
      ? Number(key2Str)
      : Object.hasOwn(state, key2Str)
      ? state[key2Str]
      : null

    if (key1 === null || key2 === null) return { valid: false }

    return { valid: true, command, input: [key1, key2] }
  }
}
