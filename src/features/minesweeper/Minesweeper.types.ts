export type CellUIState = 'asleep' | 'clicked' | 'flagged' | 'exploded'

export type GameState = 'before' | 'started' | 'ended'

export type FaceState = "confused" | "cool" | "dead" | "happy"

export type CellInfo = {
  id: number,
  y: number,
  x: number,
  isBomb: boolean,
  bombsNearby: number,
}