import { useEffect, useState } from 'react'
import './App.css'

const fullText = 'jed borillo'

function App() {
  const [displayedText, setDisplayedText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let index = 0

    const interval = setInterval(() => {
      index += 1
      setDisplayedText(fullText.slice(0, index))

      if (index >= fullText.length) {
        clearInterval(interval)
        setIsTypingComplete(true)
      }
    }, 67)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 20
      const y = (event.clientY / window.innerHeight - 0.5) * 20

      setOffset({ x, y })
    }

    window.addEventListener('pointermove', handleMove)

    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [])

  return (
    <div className="home">
      <img
        src="/sunflower/bg1.png"
        alt=""
        className="bg-image"
        style={{
          transform: `translate(${offset.x * -0.7}px, ${offset.y * -0.7}px)`,
          filter: 'brightness(0.4) blur(3px)'
        }}
      />
      <img
        src="/sunflower/bg2.png"
        alt=""
        className="bg-image"
        style={{
          transform: `translate(${offset.x * -0.7}px, ${offset.y * 0.7}px)`,
          filter: 'brightness(0.5) blur(2px)'
        }}
      />
            <img
        src="/sunflower/bg3.png"
        alt=""
        className="bg-image"
        style={{
          transform: `translate(${offset.x * 0.7}px, ${offset.y * -0.7}px)`,
          filter: 'brightness(0.65) blur(1px)'
        }}
      />

      <div className="centerContainer">
        <div className="typingRow" aria-label="Name">
          <span className="name">{displayedText}</span>
          {!isTypingComplete && <span className="cursor" aria-hidden="true" />}
        </div>
      </div>

      {/* Foreground Left Wrapper */}
      <div
        className="fg-wrapper left"
        style={{
          transform: `translate(${offset.x * -1.2}px, ${offset.y * -1.2}px)`
        }}
      >
        <img
          src="/sunflower/fg-left.png"
          alt=""
          className="fg-image left"
        />
      </div>

      {/* Foreground Right Wrapper */}
      <div
        className="fg-wrapper right"
        style={{
          transform: `translate(${offset.x * 1.5}px, ${offset.y * 1.5}px)`
        }}
      >
        <img
          src="/sunflower/fg-right.png"
          alt=""
          className="fg-image right"
        />
      </div>

      {/* Floating Bottom Text */}
      <div 
        className="bottom-subtitle"
        style={{
          transform: `translate(${offset.x * 0.5}px, ${offset.y * 0.5}px)`
        }}
      >
        data analyst <span className="divider">|</span> creative data
      </div>
    </div>
  )
}

export default App