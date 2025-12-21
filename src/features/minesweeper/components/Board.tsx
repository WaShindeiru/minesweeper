import type {CellInfo, CellUIState} from "../Minesweeper.types.ts";
import Cell from "./Cell.tsx";
import {getStateForCellInfo} from "../Minesweeper.logic.ts";
import "./Board.css"

type BoardProps = {
  boardMatrix: CellInfo[][],
  cellStateMatrix: CellUIState[][],
  handleLeftClick: (cellInfo: CellInfo, cellState: CellUIState) => void,
  handleRightClick: (cellInfo: CellInfo, cellState: CellUIState) => void,
}

export default function Board({
  boardMatrix,
  cellStateMatrix,
  handleLeftClick,
  handleRightClick
}: BoardProps) {

  return (
    <div className="board">
      {boardMatrix.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="minesweeperRow">
          {row.map((cell) => (
            <Cell
              key={cell.id}
              cellInfo={cell}
              state={getStateForCellInfo(cell, cellStateMatrix)}
              onClick={handleLeftClick}
              onRightClick={handleRightClick}
            ></Cell>
          ))}
        </div>
      ))}
    </div>
  )
}