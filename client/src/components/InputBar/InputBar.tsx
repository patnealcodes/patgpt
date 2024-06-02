import { useLayoutEffect, useState } from "react"
import "./InputBar.css"
import upArrow from '@/assets/up-arrow.svg'
import { useChatStore } from "@/App"

function InputBar() {
  const [question, setQuestion] = useState('')
  const { textAreaRef, addMessage, scrollToBottom } = useChatStore()

  async function askPatGPT(question: string) {
    const response = await fetch("/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query: question })
    })

    return response.json()
  }

  function submitQuestion() {
    if (!question.length) return
    addMessage({ sender: 'user', msg: question })
    try {
      askPatGPT(question)
        .then((msg) => {
          addMessage!({ sender: 'bot', msg })
        })
    } catch (e) {
      console.error("Error communicating with PatGPT :(")
    }
    scrollToBottom()
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
    textAreaRef.current!.style.height = 'auto'
    textAreaRef.current!.style.height = `${textAreaRef.current!.scrollHeight}px`
    if (scrollToBottom) {
      scrollToBottom()
    }
  }, [question]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="input-bar-container">
      <div className="input-bar">
        <textarea
          className="question-box"
          placeholder="Ask PatGPT..."
          value={question}
          rows={1}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
          ref={textAreaRef}
        />
        <button className="submit-button" onClick={submitQuestion} disabled={!question.length}>
          <img src={upArrow} alt="Submit Message" />
        </button>
      </div>
      <p>
        Note: Like other Generative Pretrained Transformers, I may hallucinate.
      </p>
    </div>
  )
}

export default InputBar
