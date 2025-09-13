"use client"

import { useEffect, useState } from "react"

export default function CursorTrail() {
  const [trail, setTrail] = useState([])

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newTrail = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      }

      setTrail((prev) => [...prev.slice(-10), newTrail])

      setTimeout(() => {
        setTrail((prev) => prev.filter((point) => point.id !== newTrail.id))
      }, 1000)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="absolute w-2 h-2 bg-pink-400 rounded-full animate-ping"
          style={{
            left: point.x - 4,
            top: point.y - 4,
            opacity: (index + 1) / trail.length,
            animationDelay: `${index * 50}ms`,
          }}
        />
      ))}
    </div>
  )
}
