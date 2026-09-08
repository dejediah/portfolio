import { useEffect, useState } from 'react'
import './App.css'

const FULL_TEXT = 'jed borillo'

// Config for parallax layers to keep JSX clean and modular
const BG_LAYERS = [
  { src: '/sunflower/bg1.png', scaleX: -0.7, scaleY: -0.7, filter: 'brightness(0.4) blur(3px)' },
  { src: '/sunflower/bg2.png', scaleX: -0.7, scaleY: 0.7, filter: 'brightness(0.5) blur(2px)' },
  { src: '/sunflower/bg3.png', scaleX: 0.7, scaleY: -0.7, filter: 'brightness(0.65) blur(1px)' },
]

export default function App() {
  const [displayedText, setDisplayedText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  // Typewriter effect
  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      index += 1
      setDisplayedText(FULL_TEXT.slice(0, index))

      if (index >= FULL_TEXT.length) {
        clearInterval(interval)
        setIsTypingComplete(true)
      }
    }, 67)

    return () => clearInterval(interval)
  }, [])

  // Parallax pointer handler
  useEffect(() => {
    const handleMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 20
      const y = (event.clientY / window.innerHeight - 0.5) * 20
      setOffset({ x, y })
    }

    window.addEventListener('pointermove', handleMove)
    return () => window.removeEventListener('pointermove', handleMove)
  }, [])

  return (
    <div className="home">
      {/* Background Parallax Layers */}
      {BG_LAYERS.map((layer, index) => (
        <img
          key={index}
          src={layer.src}
          alt=""
          className="bg-image"
          style={{
            transform: `translate(${offset.x * layer.scaleX}px, ${offset.y * layer.scaleY}px)`,
            filter: layer.filter,
          }}
        />
      ))}

      {/* Main Name Header */}
      <main className="center-container">
        <div className="typing-row" aria-label="Name">
          <span className="name">{displayedText}</span>
          {!isTypingComplete && <span className="cursor" aria-hidden="true" />}
        </div>
              <footer
        className="bottom-subtitle"
        style={{
          transform: `translate(${offset.x * 0.5}px, ${offset.y * 0.5}px)`,
        }}
      >
        data analyst <span className="divider">|</span> creative data
      </footer>
      </main>

      {/* Foreground Left Graphics */}
      <div
        className="fg-wrapper left"
        style={{
          transform: `translate(${offset.x * -1.2}px, ${offset.y * -1.2}px)`,
        }}
      >
        <img src="/sunflower/fg-left.png" alt="" className="fg-image left" />
      </div>

      {/* Foreground Right Graphics */}
      <div
        className="fg-wrapper right"
        style={{
          transform: `translate(${offset.x * 1.5}px, ${offset.y * 1.5}px)`,
        }}
      >
        <img src="/sunflower/fg-right.png" alt="" className="fg-image right" />
      </div>
    </div>
  )
}