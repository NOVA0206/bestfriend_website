"use client"

import { useState, useEffect } from "react"

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Loading magic...")

  const loadingMessages = [
    "Sprinkling fairy dust...",
    "Gathering happy memories...",
    "Preparing surprises...",
    "Adding extra love...",
    "Almost ready!",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 500)
          return 100
        }
        return newProgress
      })
    }, 200)

    return () => clearInterval(interval)
  }, [onComplete])

  useEffect(() => {
    const messageIndex = Math.floor((progress / 100) * loadingMessages.length)
    if (messageIndex < loadingMessages.length) {
      setLoadingText(loadingMessages[messageIndex])
    }
  }, [progress])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-100 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="text-6xl mb-8 animate-bounce">💖</div>
        <h2 className="text-2xl font-bold text-purple-700 mb-4">{loadingText}</h2>
        <div className="w-64 h-2 bg-pink-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-400 to-purple-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">{Math.round(progress)}%</p>
      </div>
    </div>
  )
}
