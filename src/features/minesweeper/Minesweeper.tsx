import {useState} from "react";
import {createStateMatrix, generateBoard, revealFlood, explosionReveal} from "./Minesweeper.logic.ts";
import type {CellInfo, CellUIState} from "./Minesweeper.types.ts";
import Board from "./components/board/Board.tsx";
import HUD from "./components/HUD/HUD.tsx";
import "./minesweeper.css"
import Summary from "./components/Summary/Summary.tsx";

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
  const [boardMatrix, setBoardMatrix] = useState(() => generateBoard(width, height, numOfBombs))

  const [cellStateMatrix, setCellStateMatrix] = useState(() => createStateMatrix(width, height))

  const [alive, setAlive] = useState(true)

  function handleLeftClick(cellInfo: CellInfo) {

    if (cellInfo.isBomb) {
      const newCellStateMatrix = explosionReveal(cellInfo, cellStateMatrix)

      setCellStateMatrix(newCellStateMatrix)
      setAlive(false)

    } else {
      const newStateMatrix = revealFlood(cellInfo, boardMatrix, cellStateMatrix)
      setCellStateMatrix(newStateMatrix)

    }
  }

  function handleRightClick(cellInfo: CellInfo) {
    const currentState = cellStateMatrix[cellInfo.y][cellInfo.x]
    let newState: CellUIState | null = null

    if (currentState === "asleep") {
      newState = "flagged"
    } else if (currentState === "flagged") {
      newState = "asleep"
    }

    if (newState !== null) {
      const newStateMatrix = structuredClone(cellStateMatrix)
      newStateMatrix[cellInfo.y][cellInfo.x] = newState
      setCellStateMatrix(newStateMatrix)
    }
  }

  function restartGame() {
    setBoardMatrix(generateBoard(width, height, numOfBombs))
    setCellStateMatrix(createStateMatrix(width, height))
    setAlive(true)
  }

  return (
    <>
      <div className={"gameContainer"}>
        {!alive && <Summary
        onClick={restartGame}
        >
        </Summary>}
        <HUD>
        </HUD>
        <Board
        boardMatrix={boardMatrix}
        cellStateMatrix={cellStateMatrix}
        handleLeftClick={handleLeftClick}
        handleRightClick={handleRightClick}
        >
        </Board>
      </div>
    </>
  )
}