import { useLayoutEffect, useRef, useState } from "react"
import "./InputBar.css"
import upArrow from '@/assets/up-arrow.svg'

function InputBar() {
  const [message, setMessage] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function submitMessage() {
    // TODO: actually do the thing
    setMessage('')
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submitMessage()
    }
  }

  function handleOnChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (e.currentTarget.value.length >= 300) return
    setMessage(e.target.value);
  }

  useLayoutEffect(() => {
    textareaRef.current!.style.height = 'auto'
    textareaRef.current!.style.height = `${textareaRef.current!.scrollHeight}px`
  }, [message])

  return (
    <div className="input-bar">
      <textarea
        className="message"
        placeholder="Message PatGPT..."
        value={message}
        rows={1}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        ref={textareaRef}
      />
      <button className="submit-button" onClick={submitMessage} disabled={!message.length}>
        <img src={upArrow} alt="Submit Message" />
      </button>
    </div>
  )
}

export default InputBar
