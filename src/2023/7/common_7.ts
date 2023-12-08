export const TYPE_SCORE: Record<string, number> = {
  "11111": 1,
  "2111": 2,
  "221": 3,
  "311": 4,
  "32": 5,
  "41": 6,
  "5": 7,
}

export const CARD_SCORE: Record<string, number> = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
}

export const JOKER_CARD_SCORE: Record<string, number> = {
  ...CARD_SCORE,
  J: 1,
}
