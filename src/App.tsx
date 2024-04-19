import { ChatLog, InputBar, Sidebar } from './components'

import './App.css'
import { createContext } from 'react'

// Me: "Mom, can we have signals in JS natively?"
// Mom: "We have signals home"
// Signals at home:
export const PseudoSignals = createContext<{ [key: string]: () => void }>({})

function App() {

  const events = {}

  return (
    <div className='layout-container'>
      <PseudoSignals.Provider value={events}>
        <aside>
          <Sidebar />
        </aside>
        <main>
          <InputBar />
          <ChatLog />
        </main>
      </PseudoSignals.Provider>
    </div>
  )
}

export default App
