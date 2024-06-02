import { ChatLog, InputBar, IntroPanel, Sidebar } from './components'

import './App.css'
import { RefObject, useState, createRef } from 'react'
import menu from "@/assets/menu.svg"
import close from "@/assets/close.svg"
import { create } from 'zustand'

export interface Message {
  sender: "bot" | "user",
  msg: string
}

interface ChatState {
  chatScrolled: boolean,
  messages: Array<Message>,
  chatLogRef: RefObject<HTMLDivElement>,
  textAreaRef: RefObject<HTMLTextAreaElement>,
  scrollToBottom: () => void,
  checkIfScrolled: () => void,
  addMessage: (message: Message) => void,
}
const textAreaRef = createRef<HTMLTextAreaElement>()
const chatLogRef = createRef<HTMLDivElement>()

export const useChatStore = create<ChatState>()((set) => ({
  chatScrolled: false,
  messages: [],
  textAreaRef,
  chatLogRef,
  addMessage: (message) => set(({ messages }) => {
    messages.push(message)
    return { messages }
  }),
  scrollToBottom: () => {
    chatLogRef.current?.scrollTo(0, chatLogRef.current?.scrollHeight)
  },
  checkIfScrolled: () => set(() => {

    const atBottom = chatLogRef.current!.scrollTop + chatLogRef.current!.clientHeight === chatLogRef.current!.scrollHeight;

    return { chatScrolled: !atBottom }
  })
}))

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { messages } = useChatStore()

  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className='layout-container'>
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
    </div>
  )
}

export default App
