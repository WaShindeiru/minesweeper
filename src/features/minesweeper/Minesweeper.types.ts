export type CellUIState = 'asleep' | 'clicked' | 'flagged'

export type CellInfo = {
  id: number,
  y: number,
  x: number,
  isBomb: boolean,
  bombsNearby: number,
}