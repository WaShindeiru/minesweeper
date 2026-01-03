import "./HUD.css"
import Clock from "./Clock/Clock.tsx";
import BombCount from "./BombCount/BombCount.tsx";
import Face from "./Face/Face.tsx";
import type {FaceState} from "../../Minesweeper.types.ts";

type HUDProps = {
  timeElapsedMs: number,
  NumOfBombs: number,
  faceState: FaceState,
}

export default function HUD({
  timeElapsedMs,
  NumOfBombs,
  faceState
                            }: HUDProps) {

  return (
    <>
      <div className={"hud"}>
        <div className={"left-element"}>
          <Clock elapsedTime={timeElapsedMs}></Clock>
        </div>
        <div className={"middle-element"}>
          <Face faceState={faceState}>
          </Face>
        </div>
        <div className={"right-element"}>
          <BombCount bombsRemaining={NumOfBombs}>
          </BombCount>
        </div>
      </div>
    </>
  )
}