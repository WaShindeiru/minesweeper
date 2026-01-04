import {useEffect, useRef, useState} from "react";
import {
  createStateMatrix,
  generateBoard,
  revealFlood,
  explosionReveal,
  getStateForCellInfo
} from "./Minesweeper.logic.ts";
import type {CellInfo, CellUIState, FaceState, GameState} from "./Minesweeper.types.ts";
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
  const [numOfBombsRemaining, setNumOfBombsRemaining] = useState(numOfBombs)

  const faceTimeoutRef = useRef<number | null>(null);

  const [gameState, setGameState] = useState<GameState>("before")
  const [hiddenTiles, setHiddenTiles] = useState<number>(width * height - numOfBombs)

  const [faceState, setFaceState] = useState<FaceState>("happy")

  const timerRef = useRef<number | null>(null); // Store timer ID in ref
  const [currentTime, setCurrentTime] = useState(new Date())
  const [startTime, setStartTime] = useState(new Date())

  useEffect(() => {
    if (gameState === 'started') {
      timerRef.current = setInterval(() => {
        setCurrentTime(new Date())
      }, 1000)

    } else if (gameState === 'ILost' || gameState === 'IWon') {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [gameState])

  function handleMouseDown(event: React.MouseEvent<HTMLDivElement>, state: CellUIState) {
    if (gameState === 'before' || gameState === "started") {
      if (state === 'asleep' || state === "flagged") {
        if (event.button === 0) {
          setFaceState("confused")
        }
      }
    }
  }

  function cancelFaceTimeout() {
    if (faceTimeoutRef.current) {
      clearTimeout(faceTimeoutRef.current)
      faceTimeoutRef.current = null;
    }
  }

  function handleLeftClick(cellInfo: CellInfo) {
    if (gameState === 'before') {
      setGameState('started')
      setStartTime(new Date())
      setCurrentTime(new Date())
    }

    if (gameState === 'before' || gameState === "started") {

      if (cellInfo.isBomb) {
        const newCellStateMatrix = explosionReveal(cellInfo, cellStateMatrix)

        setCellStateMatrix(newCellStateMatrix)
        setGameState('ILost')
        setFaceState("dead")

      } else {
        const state = getStateForCellInfo(cellInfo, cellStateMatrix)
        if (state === 'asleep' || state === 'flagged') {
          const [newStateMatrix, revealedCount] = revealFlood(cellInfo, boardMatrix, cellStateMatrix)
          setCellStateMatrix(newStateMatrix)
          setHiddenTiles(hiddenTiles - revealedCount)

          setFaceState("cool")

          cancelFaceTimeout()

          faceTimeoutRef.current = setTimeout(() => {
            setFaceState("happy")
          }, 4000)
        }

      }
    }
  }

  function handleRightClick(cellInfo: CellInfo) {
    if (gameState === "before" || gameState === "started") {

      const currentState = cellStateMatrix[cellInfo.y][cellInfo.x]
      let newState: CellUIState | null = null

      if (currentState === "asleep") {
        newState = "flagged"
        setNumOfBombsRemaining(numOfBombsRemaining - 1)
      } else if (currentState === "flagged") {
        newState = "asleep"
        setNumOfBombsRemaining(numOfBombsRemaining + 1)
      }

      if (newState !== null) {
        const newStateMatrix = structuredClone(cellStateMatrix)
        newStateMatrix[cellInfo.y][cellInfo.x] = newState
        setCellStateMatrix(newStateMatrix)
      }
    }
  }

  function restartGame() {
    setBoardMatrix(generateBoard(width, height, numOfBombs))
    setCellStateMatrix(createStateMatrix(width, height))
    setNumOfBombsRemaining(numOfBombs)
    setGameState('before')
    setFaceState("happy")
  }

  if (gameState === "started") {
    if (numOfBombsRemaining === 0) {
      if (hiddenTiles === 0) {
        setGameState("IWon") // Is that the sundays reference???
      }
    }
  }

  let elapsedTime: number
  if (gameState === "before") {
    elapsedTime = 0
  } else {
    elapsedTime = currentTime.getTime() - startTime.getTime()
  }

  return (
    <>
      <div className={"gameContainer"}>
          {(gameState === "ILost" || gameState === "IWon") && <Summary
          onClick={restartGame}
          gameState={gameState}
        >
        </Summary>}
        <HUD
          onFaceClick={() => restartGame()}
          timeElapsedMs={elapsedTime}
          NumOfBombs={numOfBombsRemaining}
          faceState={faceState}
        >
        </HUD>
        <Board
          boardMatrix={boardMatrix}
          cellStateMatrix={cellStateMatrix}
          handleLeftClick={handleLeftClick}
          handleRightClick={handleRightClick}
          handleMouseDown={handleMouseDown}
        >
        </Board>
      </div>
    </>
  )
}