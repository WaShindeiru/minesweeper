import './Cell.css'
import type {CellInfo, CellUIState} from "../Minesweeper.types.ts";

type CellProps = {
  cellInfo: CellInfo
  state: CellUIState
  onClick: (cellInfo: CellInfo, cellState: CellUIState) => void
  onRightClick: (cellInfo: CellInfo, cellState: CellUIState) => void
}

export default function Cell({
  cellInfo,
  state,
  onClick,
  onRightClick,
}: CellProps) {
  const handleLeftClick = (e: React.MouseEvent) => {
    void e
    console.log(`Left click, id: ${cellInfo.id}`);
    onClick(cellInfo, state)
    // onClick()
  };

  void onClick;
  void onRightClick;

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(`Right click, id: ${cellInfo.id}`);
    onRightClick(cellInfo, state)
    // onRightClick()
  };

  let content: string | null = null
  if (state === "clicked") {
    if (cellInfo.isBomb) {
      content = 'B'
    } else {
      content = String(cellInfo.bombsNearby)
    }
  } else if (state === "asleep") {
    content = "[]"
  } else {
    content = "F"
  }

  return (
    <div className={"cell"}
      onClick={handleLeftClick}
      onContextMenu={handleRightClick}
    >
      {content}
    </div>
  )
}
