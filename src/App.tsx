import { ChatLog, InputBar, MenuBar } from './components'

import './App.css'

function App() {

  return (
    <main>
      <MenuBar />
      <div className="chat-log-container">
        <ChatLog />
      </div>
      <InputBar />
    </main>
  )
}

export default App
