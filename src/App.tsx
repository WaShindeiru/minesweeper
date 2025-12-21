import './App.css'
import Minesweeper from "./features/minesweeper/Minesweeper.tsx";

function App() {
  return (
    <Minesweeper width={10} height={20} numOfBombs={40}>
    </Minesweeper>
  )
}

export default App
