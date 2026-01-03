import "./Clock.css"
import Number from "../Number.tsx";

type ClockProps = {
  elapsedTime: number
}

export default function Clock({elapsedTime}: ClockProps) {

  const seconds = Math.floor(elapsedTime / 1000)
  const minutes = Math.floor(seconds / 60)
  const secondsRemaining = seconds - minutes * 60

  const minute_first_digit = Math.floor((minutes % 100) / 10).toString()
  const minute_second_digit = ((minutes % 100) % 10).toString()
  const seconds_first_digit = Math.floor(secondsRemaining / 10).toString()
  const seconds_second_digit = (secondsRemaining % 10).toString()

  return (
    <>
      <div className={"clock-container"}>
        <Number keyInput={minute_first_digit}></Number>
        <Number keyInput={minute_second_digit}></Number>
        <img src="/assets/numbers/:.png" alt={":"}/>
        <Number keyInput={seconds_first_digit}></Number>
        <Number keyInput={seconds_second_digit}></Number>
      </div>
    </>
  )
}