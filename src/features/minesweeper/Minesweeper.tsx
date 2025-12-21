import {useMemo, useState} from "react";
import {createStateMatrix, generateBoard} from "./Minesweeper.logic.ts";
import type {CellInfo, CellUIState} from "./Minesweeper.types.ts";
import Board from "./components/Board.tsx";

type MinesweeperProps = {
  width: number,
  height: number,
  numOfBombs: number
}

export default function Minesweeper({
  width,
  height,
  numOfBombs
}: MinesweeperProps) {
  const boardMatrix = useMemo(() => {
    return generateBoard(width, height, numOfBombs)
  }, [width, height, numOfBombs])

  const [cellStateMatrix, setCellStateMatrix] = useState(() => createStateMatrix(width, height))
  void setCellStateMatrix

  function handleLeftClick(cellInfo: CellInfo, cellState: CellUIState) {
    void cellState
    const newStateMatrix = structuredClone(cellStateMatrix)
    newStateMatrix[cellInfo.y][cellInfo.x] = 'asleep'
    setCellStateMatrix(newStateMatrix)
  }

  function handleRightClick(cellInfo: CellInfo, cellState: CellUIState) {
    void cellState
    const newStateMatrix = structuredClone(cellStateMatrix)
    newStateMatrix[cellInfo.y][cellInfo.x] = 'clicked'
    setCellStateMatrix(newStateMatrix)
  }

  return (
    <Board
    boardMatrix={boardMatrix}
    cellStateMatrix={cellStateMatrix}
    handleLeftClick={handleLeftClick}
    handleRightClick={handleRightClick}
    >
    </Board>
  )
}