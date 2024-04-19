import { useContext, useLayoutEffect, useRef, useState } from "react"
import "./InputBar.css"
import upArrow from '@/assets/up-arrow.svg'
import { PseudoSignals } from "../../App"

function InputBar() {
  const [question, setQuestion] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const pseudoSignals = useContext(PseudoSignals)

  function submitQuestion() {
    if (!question.length) return
    // TODO: actually do the thing
    if (pseudoSignals.scrollToBottom) {
      pseudoSignals.scrollToBottom()
    }
    setQuestion('')
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submitQuestion()
    }
  }

  function handleOnChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (e.currentTarget.value.length >= 300) return
    setQuestion(e.target.value);
  }

  useLayoutEffect(() => {
    textareaRef.current!.style.height = 'auto'
    textareaRef.current!.style.height = `${textareaRef.current!.scrollHeight}px`
    if (pseudoSignals.scrollToBottom) {
      pseudoSignals.scrollToBottom()
    }
  }, [question]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="input-bar-container">
      <div className="input-bar">
        <textarea
          className="question-box"
          placeholder="Message PatGPT..."
          value={question}
          rows={1}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
          ref={textareaRef}
        />
        <button className="submit-button" onClick={submitQuestion} disabled={!question.length}>
          <img src={upArrow} alt="Submit Message" />
        </button>
      </div>
    </div>
  )
}

export default InputBar
