export type CellUIState = 'asleep' | 'clicked' | 'flagged' | 'exploded'

export type CellInfo = {
  id: number,
  y: number,
  x: number,
  isBomb: boolean,
  bombsNearby: number,
}