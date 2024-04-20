import { ChatLog, InputBar, Sidebar } from './components'

import './App.css'
import { createContext, useState } from 'react'
import menu from "@/assets/menu.svg"
import close from "@/assets/close.svg"

// Me: "Mom, can we have signals in JS natively?"
// Mom: "We have signals home"
// Signals at home:
export const PseudoSignals = createContext<{ [key: string]: () => void }>({})

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const events = {}

  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className='layout-container'>
      <PseudoSignals.Provider value={events}>
        <aside className={sidebarOpen ? 'sidebar-open' : ''}>
          <Sidebar />
          <div className="sidebar-toggle" role="button" onClick={toggleSidebar}>
            {sidebarOpen
              ? (
                <img src={close} alt="Close Sidebar" />
              ) : (
                <img src={menu} alt="Open Sidebar" />
              )
            }
          </div>
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
