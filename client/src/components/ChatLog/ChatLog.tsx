import { Message, useChatStore } from "@/App"
import user from "@/assets/default-user.svg"
import pat from "@/assets/pat.jpg"
import downArrow from "@/assets/down-arrow.svg"
import "./ChatLog.css"
import { useEffect } from "react"

function ChatLog({ messages }: { messages: Message[] }) {
  const { chatLogRef, scrollToBottom, checkIfScrolled, chatScrolled } = useChatStore()

  useEffect(() => {
    // Scroll to bottom on first load
    scrollToBottom()

    window.addEventListener('resize', checkIfScrolled)

    return () => {
      window.removeEventListener('resize', checkIfScrolled)
    }
  }, [])


  return (
    <div className="chat-log-container">
      <div className="chat-log" ref={chatLogRef} onScroll={checkIfScrolled}>
        <div className="messages">
          {
            messages.map(({ msg, sender }, i) => (
              <div className="message" key={`${sender}-${i}`}>
                <img src={sender === "user" ? user : pat} alt={sender} />
                <div className="message-details">
                  <strong>{sender === "bot" ? "PatGPT" : "You"}</strong>
                  <p>{msg}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      {
        chatScrolled && (
          <div className="to-bottom">
            <img src={downArrow} alt="Scroll to bottom of chat" onClick={scrollToBottom} />
          </div>

        )
      }
    </div >
  )
}

export default ChatLog
