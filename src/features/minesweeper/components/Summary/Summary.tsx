import "./Summary.css"
import type {GameState} from "../../Minesweeper.types.ts";

type SummaryProps = {
  gameState: GameState
  onClick: () => void
}

export default function Summary({
  gameState,
  onClick,
}: SummaryProps) {

  const description = (gameState === 'IWon') ? "You Won!" : "You Lost!"

  return (
    <>
      <div className={"minesweeper-panel"}>
        <div className={"description-div"}>
          {description}
        </div>
        <div className={"button-div"}>
          <button className={"minesweeper-btn"} onClick={onClick}>Restart</button>
        </div>
      </div>
    </>
  )
}
