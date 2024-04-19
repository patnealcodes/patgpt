import { PseudoSignals } from "../../App"
import user from "@/assets/default-user.svg"
import pat from "@/assets/pat.jpg"
import downArrow from "@/assets/down-arrow.svg"
import "./ChatLog.css"
import { useContext, useEffect, useRef, useState } from "react"

interface MessageProps {
  sender: "bot" | "user"
}

function Message({ sender }: MessageProps) {
  return (
    <div className="message">
      <img src={sender === "user" ? user : pat} alt={sender} />
      <div className="message-details">
        <strong>{sender === "bot" ? "PatGPT" : "You"}</strong>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint delectus perferendis suscipit? Laborum dolorem odio esse laudantium animi optio reiciendis harum, accusantium aperiam officiis nisi, architecto porro in ipsum eveniet?</p>
      </div>
    </div>
  )
}

function ChatLog() {
  const [chatScrolled, setChatScrolled] = useState(true)
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
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="chat-log-container">
      <div className="chat-log" ref={chatLogRef} onScroll={checkIfScrolled}>
        <Message sender="user" />
        <Message sender="bot" />
        <Message sender="user" />
        <Message sender="user" />
        <Message sender="bot" />
        <Message sender="user" />
        <Message sender="bot" />
        <Message sender="user" />
        <Message sender="user" />
        <Message sender="bot" />
      </div>
      {
        chatScrolled && (
          <div className="to-bottom">
            <img src={downArrow} alt="Scroll to bottom of chat" onClick={scrollToBottom} />
          </div>

        )
      }
    </div>
  )
}

export default ChatLog
