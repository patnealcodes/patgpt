import { ChatLog, InputBar, IntroPanel, Sidebar } from './components'

import './App.css'
import { createContext, useState } from 'react'
import menu from "@/assets/menu.svg"
import close from "@/assets/close.svg"

export const PseudoSignals = createContext<Signals>({})
export interface Message {
  sender: "bot" | "user",
  msg: string
}

// Me: "Mom, can we have signals in JS natively?"
// Mom: "We have signals home"
// Signals at home:
interface Signals {
  scrollToBottom?: () => void,
  checkIfScrolled?: () => void,
  addMessage?: (msg: Message) => void,
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen)
  }

  function addMessage(msg: Message) {
    setMessages((prev) => [...prev, msg])
  }

  const events = {
    addMessage,
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
          {
            messages.length
              ? <ChatLog messages={messages} />
              : <IntroPanel />
          }
          <div className="chat-log-header">
            <strong>PatGPT</strong> <span>1.0</span>
          </div>
        </main>
      </PseudoSignals.Provider>
    </div>
  )
}

export default App
