type TKeys = "up" | "down" | "right" | "left"

export const SIDE_MAP: Record<string, Record<TKeys, boolean>> = {
  "|": { up: true, down: true, right: false, left: false },
  "-": { up: false, down: false, right: true, left: true },
  L: { up: true, down: false, right: true, left: false },
  J: { up: true, down: false, right: false, left: true },
  "7": { up: false, down: true, right: false, left: true },
  F: { up: false, down: true, right: true, left: false },
  S: { up: true, down: true, left: true, right: true },
  ".": { up: false, down: false, left: false, right: false },
}
