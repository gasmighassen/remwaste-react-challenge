import type React from "react"

import "./App.css"
import { AppThemeProvider } from "./contexts/AppThemeProvider"
import SkipSelection from "./components/SkipSelection"

const App: React.FC = () => {
  return (
    <AppThemeProvider>
      <div className="App">
        <SkipSelection />
      </div>
    </AppThemeProvider>
  )
}

export default App