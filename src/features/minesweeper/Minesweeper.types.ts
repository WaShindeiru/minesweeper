export type CellUIState = 'asleep' | 'clicked' | 'flagged' | 'exploded'

export type GameState = 'before' | 'started' | 'ILost' | 'IWon' // Is that the Sundays reference???

export type FaceState = "confused" | "cool" | "dead" | "happy"

export type CellInfo = {
  id: number,
  y: number,
  x: number,
  isBomb: boolean,
  bombsNearby: number,
}