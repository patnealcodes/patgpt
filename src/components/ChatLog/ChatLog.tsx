import { PseudoSignals, Message } from "../../App"
import user from "@/assets/default-user.svg"
import pat from "@/assets/pat.jpg"
import downArrow from "@/assets/down-arrow.svg"
import "./ChatLog.css"
import { useContext, useEffect, useRef, useState } from "react"

function ChatLog({ messages }: { messages: Message[] }) {
  const [chatScrolled, setChatScrolled] = useState(false)
  const chatLogRef = useRef<HTMLDivElement>(null)
  const pseudoSignals = useContext(PseudoSignals)

  function checkIfScrolled() {
    const atBottom = chatLogRef.current!.scrollTop + chatLogRef.current!.clientHeight === chatLogRef.current!.scrollHeight;

    setChatScrolled(!atBottom)
  }

  function scrollToBottom() {
    chatLogRef.current!.scrollTo(0, chatLogRef.current!.scrollHeight)
  }

  useEffect(() => {
    // Set up signals
    pseudoSignals.checkIfScrolled = checkIfScrolled
    pseudoSignals.scrollToBottom = scrollToBottom

    // Scroll to bottom on first load
    scrollToBottom()

    window.addEventListener('resize', checkIfScrolled)

    return () => {
      window.removeEventListener('resize', checkIfScrolled)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps


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
