import "./Summary.css"

type SummaryProps = {
  onClick: () => void
}

export default function Summary({
  onClick
}: SummaryProps) {

  return (
    <>
      <div className={"minesweeper-panel"}>
        <button className={"minesweeper-btn"} onClick={onClick}>Restart</button>
      </div>
    </>
  )
}
