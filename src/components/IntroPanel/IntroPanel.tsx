import './IntroPanel.css';
import pat from "@/assets/pat.jpg"

function WelcomeBox() {
  return (
    <div className="welcome-box">
      <div>
        <img src={pat} alt="PatGPT: Portfolio aggregation to Generate Poignant Tidbits" />
        <p className="hi">Hi, I'm PatGPT</p>
        <p>Ask me anything about Pat Neal's resume</p>
      </div>
    </div>
  )
}

const introQuestions = [
  "Is Pat open to new opportunities?",
  "Does Pat work with Java?",
  "Is a hotdog a sandwich?",
  "Why would you do this?",
]

function IntroPanel() {
  return (
    <div className="intro-panel">
      <WelcomeBox />
      <ul className="intro-questions">
        {introQuestions.map(q => <li key={q}>{q}</li>)}
      </ul>
    </div>
  )
}

export default IntroPanel;
