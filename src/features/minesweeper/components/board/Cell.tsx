import './Cell.css'
import type {CellInfo, CellUIState} from "../../Minesweeper.types.ts";
import type {JSX} from "react";

type CellProps = {
  cellInfo: CellInfo,
  state: CellUIState,
  onClick: (cellInfo: CellInfo) => void,
  onRightClick: (cellInfo: CellInfo) => void,
}

export default function Cell({
  cellInfo,
  state,
  onClick,
  onRightClick,
}: CellProps) {
  const handleLeftClick = (e: React.MouseEvent) => {
    console.log(`Left click, id: ${cellInfo.id}`);
    onClick(cellInfo)
  };

  void onClick;
  void onRightClick;

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(`Right click, id: ${cellInfo.id}`);
    onRightClick(cellInfo)
  };

  let content: JSX.Element | null = null

  if (state === "clicked") {
    if (cellInfo.isBomb) {
      content = <img src="/assets/TileMine.png" alt={"Mine"}/>
    } else {
      switch (cellInfo.bombsNearby) {
        case 0:
          content = <img src="/assets/TileEmpty.png" alt={"Empty"}/>
          break
        case 1:
          content = <img src="/assets/Tile1.png" alt={"1"}/>
          break
        case 2:
          content = <img src="/assets/Tile2.png" alt={"2"}/>
          break
        case 3:
          content = <img src="/assets/Tile3.png" alt={"3"}/>
          break
        case 4:
          content = <img src="/assets/Tile4.png" alt={"4"}/>
          break
        case 5:
          content = <img src="/assets/Tile5.png" alt={"5"}/>
          break
        case 6:
          content = <img src="/assets/Tile6.png" alt={"6"}/>
          break
        case 7:
          content = <img src="/assets/Tile7.png" alt={"7"}/>
          break
        case 8:
          content = <img src="/assets/Tile8.png" alt={"8"}/>
          break
        default:
          content = <img src="/aha.jpg" alt={"Error!!"}/>
          break
      }
    }
  } else if (state === "exploded") {
    content = <img src="/assets/TileExploded.png" alt={"Exploded"}/>
  } else if (state === "asleep") {
    content = <img src="/assets/TileUnknown.png" alt={"Unknown"}/>
  } else if (state === "flagged") {
    content = <img src="/assets/TileFlag.png" alt={"Flag"}/>
  } else {
    content = <img src="/aha.jpg" alt={"Error!!"}/>
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
