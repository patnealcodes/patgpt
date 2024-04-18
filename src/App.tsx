import { ChatLog, InputBar, MenuBar } from './components'

import './App.css'
import { createContext } from 'react'

// Me: "Mom, can we have signals in JS natively?"
// Mom: "We have signals home"
// Signals at home:
export const PseudoSignals = createContext<{ [key: string]: () => void }>({})

function App() {

  const events = {}

  return (
    <main>
      <PseudoSignals.Provider value={events}>
        <InputBar />
        <ChatLog />
        <MenuBar />
      </PseudoSignals.Provider>
    </main>
  )
}

export default App
