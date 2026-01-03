import "./BombCount.css"
import Number from "../Number.tsx";

type BombCountProps = {
  bombsRemaining: number
}

export default function BombCount({bombsRemaining}: BombCountProps) {

  if (bombsRemaining > 999) {
    console.error(`Bomb count of ${bombsRemaining} is too high!!!`)
  }

  const bombCount_firstDigit = Math.floor((bombsRemaining % 1000) / 100)
  const bombCount_secondDigit = Math.floor((bombsRemaining % 100) / 10)
  const bombCount_thirdDigit = bombsRemaining % 10

  return (
    <>
      <div className={"count-container"}>
        <Number keyInput={bombCount_firstDigit.toString()}></Number>
        <Number keyInput={bombCount_secondDigit.toString()}></Number>
        <Number keyInput={bombCount_thirdDigit.toString()}></Number>
      </div>
    </>
  )
}