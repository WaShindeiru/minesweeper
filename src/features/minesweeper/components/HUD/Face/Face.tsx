import type {FaceState} from "../../../Minesweeper.types.ts";
import "./Face.css"
import {type JSX, useState} from "react";

type FaceProps = {
  faceState: FaceState
}

export default function Face(
  {
    faceState
  }: FaceProps
) {
  const [isPressed, setIsPressed] = useState<boolean>(false)

  const prefix = "/assets/faces/"
  let faceImage: JSX.Element

  switch (faceState) {
    case "cool":
      if (isPressed) {
        faceImage = <img src={prefix + "cool_pressed.png"} alt={"cool_pressed"}/>
      } else {
        faceImage = <img src={prefix + "cool.png"} alt={"cool"}/>
      }
      break

    case "confused":
      if (isPressed) {
        faceImage = <img src={prefix + "confused_pressed.png"} alt={"confused_pressed"}/>
      } else {
        faceImage = <img src={prefix + "confused.png"} alt={"confused"}/>
      }
      break

    case "dead":
      if (isPressed) {
        faceImage = <img src={prefix + "dead_pressed.png"} alt={"dead_pressed"}/>
      } else {
        faceImage = <img src={prefix + "dead.png"} alt={"dead"}/>
      }
      break

    case "happy":
      if (isPressed) {
        faceImage = <img src={prefix + "happy_pressed.png"} alt={"happy_pressed"}/>
      } else {
        faceImage = <img src={prefix + "happy.png"} alt={"happy"}/>
      }
      break

    default:
      faceImage = <img src={"ok"} alt={"incorrect face state!!!"}/>
  }

  return (
    <>
      <div
        className={"face-div"}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
      >
        {faceImage}
      </div>
    </>
  )
}