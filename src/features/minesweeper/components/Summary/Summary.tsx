import "./Summary.css"

type SummaryProps = {
  onClick: () => void
}

export default function Summary({
  onClick
}: SummaryProps) {

  return (
    <>
      <div className={"summary"}>
        <button onClick={onClick}>Restart</button>
      </div>
    </>
  )
}
