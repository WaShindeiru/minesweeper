import type {CellInfo, CellUIState} from "../../Minesweeper.types.ts";
import Cell from "./Cell.tsx";
import {getStateForCellInfo} from "../../Minesweeper.logic.ts";
import "./Board.css"

type BoardProps = {
  boardMatrix: CellInfo[][],
  cellStateMatrix: CellUIState[][],
  handleLeftClick: (cellInfo: CellInfo) => void,
  handleRightClick: (cellInfo: CellInfo) => void,
  handleMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void,
}

export default function Board({
  boardMatrix,
  cellStateMatrix,
  handleLeftClick,
  handleRightClick,
  handleMouseDown,
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
              onMouseDown_={handleMouseDown}
            ></Cell>
          ))}
        </div>
      ))}
    </div>
  )
}