import "./Number.css"

type NumberProps = {
  keyInput: string
}

export default function Number({keyInput}: NumberProps) {
  let path: string
  const prefix: string = "/assets/numbers/"
  const postfix: string = ".png"

  switch (keyInput) {
    case "0":
      path = prefix + "0" + postfix
      break
    case "1":
      path = prefix + "1" + postfix
      break
    case "2":
      path = prefix + "2" + postfix
      break
    case "3":
      path = prefix + "3" + postfix
      break
    case "4":
      path = prefix + "4" + postfix
      break
    case "5":
      path = prefix + "5" + postfix
      break
    case "6":
      path = prefix + "6" + postfix
      break
    case "7":
      path = prefix + "7" + postfix
      break
    case "8":
      path = prefix + "8" + postfix
      break
    case "9":
      path = prefix + "9" + postfix
      break
    case ":":
      path = prefix + ":" + postfix
      break
    case ":none":
      path = prefix + ":none" + postfix
      break
    case "-":
      path = prefix + "-" + postfix
      break
    case "none":
      path = prefix + "none" + postfix
      break
    default:
      path = prefix + "none" + postfix
      break
  }

  return (
    <>
      <img src={path} alt={keyInput}/>
    </>
  )
}