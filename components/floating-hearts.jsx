"use client"

import { useEffect, useState } from "react"

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    const createHeart = () => {
      const heart = {
        id: Math.random(),
        left: Math.random() * 100,
        animationDuration: 8 + Math.random() * 4,
        size: 20 + Math.random() * 20,
      }
      setHearts((prev) => [...prev, heart])

      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== heart.id))
      }, heart.animationDuration * 1000)
    }

    const interval = setInterval(createHeart, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-heart-float text-pink-400"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.animationDuration}s`,
          }}
        >
          💖
        </div>
      ))}
    </div>
  )
}
