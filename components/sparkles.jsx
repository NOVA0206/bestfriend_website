"use client"

import { useEffect, useState } from "react"

export default function Sparkles() {
  const [sparkles, setSparkles] = useState([])

  useEffect(() => {
    const createSparkle = () => {
      const sparkle = {
        id: Math.random(),
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 2,
      }
      setSparkles((prev) => [...prev, sparkle])

      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== sparkle.id))
      }, 4000)
    }

    const interval = setInterval(createSparkle, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute animate-sparkle text-yellow-400"
          style={{
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            animationDelay: `${sparkle.delay}s`,
          }}
        >
          ✨
        </div>
      ))}
    </div>
  )
}
