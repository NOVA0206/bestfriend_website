"use client"

import { useState, useEffect } from "react"

const funFacts = [
  "We've shared over 1000 laughs together! 😂",
  "You always know how to make me smile 😊",
  "Our friendship is 100% authentic and amazing! ✨",
  "We can talk for hours and never get bored 💬",
  "You're the sister I chose for myself 👭",
  "Our inside jokes are legendary! 🤣",
  "Distance means nothing when friendship means everything 💕",
]

export default function FunFactCarousel() {
  const [currentFact, setCurrentFact] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % funFacts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center">
      <div className="h-16 flex items-center justify-center">
        <p className="text-lg text-gray-700 animate-fade-in font-medium">{funFacts[currentFact]}</p>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {funFacts.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentFact ? "bg-pink-400 scale-125" : "bg-pink-200"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
