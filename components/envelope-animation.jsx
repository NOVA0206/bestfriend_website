"use client"

import { useState, useEffect } from "react"

export default function EnvelopeAnimation({ onComplete }) {
  const [isOpening, setIsOpening] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsOpening(true)
    }, 1000)

    const timer2 = setTimeout(() => {
      setShowMessage(true)
    }, 2500)

    const timer3 = setTimeout(() => {
      onComplete()
    }, 4500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-100 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Envelope */}
        <div className="relative mb-8">
          <div
            className={`w-64 h-40 bg-white border-4 border-pink-300 rounded-lg shadow-2xl transition-all duration-1000 ${
              isOpening ? "transform -translate-y-4" : ""
            }`}
          >
            {/* Envelope flap */}
            <div
              className={`absolute -top-2 left-0 w-full h-20 bg-pink-200 border-4 border-pink-300 transition-all duration-1000 origin-bottom ${
                isOpening ? "transform -rotate-180" : ""
              }`}
              style={{
                clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
              }}
            />

            {/* Heart seal */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-4xl animate-pulse">💖</div>
          </div>
        </div>

        {/* Message */}
        {showMessage && (
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold text-pink-600 mb-4 typewriter">You have mail! 💌</h2>
            <p className="text-xl text-gray-600 animate-bounce">Opening your special surprise...</p>
          </div>
        )}
      </div>
    </div>
  )
}
