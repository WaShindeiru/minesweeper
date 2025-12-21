import type {CellInfo, CellUIState} from "./Minesweeper.types.ts";

export function generateBoard(width: number, height: number, mines: number) : CellInfo[][] {
  const board: CellInfo[][] = [];

  for (let y=0; y<height; y++) {
    board.push([])

    for (let x=0; x<width; x++) {
      board[y].push({
        id: y*100 + x,
        y: y,
        x: x,
        isBomb: false,
        bombsNearby: 0,
      })
    }
  }

  for (let i = 0; i < mines; i++) {
    let isBomb = true
    let x: number = 0
    let y: number = 0

    while (isBomb) {
      x = Math.floor(Math.random() * width)
      y = Math.floor(Math.random() * height)

      isBomb = board[y][x].isBomb
    }

    board[y][x].isBomb = true
  }

  const moves: [number, number][] = [
    [-1, -1], [0, -1], [1, -1],
    [-1, 0], [1, 0],
    [-1, 1], [0, 1], [1, 1]
  ]

  for (let y=0; y<height; y++) {
    for (let x=0; x<width; x++) {
      let bombCount = 0

      for (const [x_add, y_add] of moves) {
        const new_y = y + y_add
        const new_x = x + x_add

        if (new_x >= 0 && new_x < width) {
          if (new_y >= 0 && new_y < height) {
            if (board[new_y][new_x].isBomb) {
              bombCount += 1
            }
          }
        }
      }

      board[y][x].bombsNearby = bombCount
    }
  }

  return board
}

export function createStateMatrix(width: number, height: number): CellUIState[][] {
  return Array.from({length: height}, () => Array(width).fill("clicked"))
}

export function getStateForCellInfo(cellInfo: CellInfo, stateMatrix: CellUIState[][]) {
  return stateMatrix[cellInfo.y][cellInfo.x]
}

export function getStateForId(id: number, stateMatrix: CellUIState[][]): CellUIState {
  const y = Math.floor(id / 100)
  const x = id % 100
  return stateMatrix[y][x]
}