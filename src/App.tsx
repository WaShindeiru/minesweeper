import './App.css'
import Minesweeper from "./features/minesweeper/Minesweeper.tsx";

function App() {
  return (
    <Minesweeper width={14} height={18} numOfBombs={40}>
    </Minesweeper>
  )
}

export default App
