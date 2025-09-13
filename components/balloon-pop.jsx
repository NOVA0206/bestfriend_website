"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function BalloonPop() {
  const [balloons, setBalloons] = useState([])
  const [score, setScore] = useState(0)
  const [gameActive, setGameActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)

  const balloonColors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57", "#ff9ff3", "#54a0ff"]
  const surpriseMessages = [
    "You're amazing! 💖",
    "Best friend ever! ✨",
    "So proud of you! 🌟",
    "You make me smile! 😊",
    "Love you lots! 💕",
    "You're the best! 🎉",
  ]

  useEffect(() => {
    let interval
    if (gameActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setGameActive(false)
    }
    return () => clearInterval(interval)
  }, [gameActive, timeLeft])

  useEffect(() => {
    let interval
    if (gameActive) {
      interval = setInterval(() => {
        createBalloon()
      }, 1500)
    }
    return () => clearInterval(interval)
  }, [gameActive])

  const createBalloon = () => {
    const balloon = {
      id: Math.random(),
      left: Math.random() * 80 + 10,
      color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
      message: surpriseMessages[Math.floor(Math.random() * surpriseMessages.length)],
    }
    setBalloons((prev) => [...prev, balloon])

    setTimeout(() => {
      setBalloons((prev) => prev.filter((b) => b.id !== balloon.id))
    }, 4000)
  }

  const popBalloon = (balloonId, message) => {
    setBalloons((prev) => prev.filter((b) => b.id !== balloonId))
    setScore((prev) => prev + 10)

    // Show message briefly
    const messageElement = document.createElement("div")
    messageElement.textContent = message
    messageElement.className =
      "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-pink-600 z-50 animate-bounce"
    document.body.appendChild(messageElement)
    setTimeout(() => {
      document.body.removeChild(messageElement)
    }, 1500)
  }

  const startGame = () => {
    setGameActive(true)
    setScore(0)
    setTimeLeft(30)
    setBalloons([])
  }

  const resetGame = () => {
    setGameActive(false)
    setScore(0)
    setTimeLeft(30)
    setBalloons([])
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-purple-200 shadow-xl max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl text-purple-700">Balloon Pop 🎈</CardTitle>
        <div className="flex justify-center gap-6 text-lg">
          <span>Score: {score}</span>
          <span>Time: {timeLeft}s</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative h-96 bg-gradient-to-b from-blue-100 to-green-100 rounded-lg overflow-hidden mb-6">
          {balloons.map((balloon) => (
            <button
              key={balloon.id}
              className="absolute animate-bounce cursor-pointer hover:scale-110 transition-transform"
              style={{
                left: `${balloon.left}%`,
                bottom: "0%",
                animationDuration: "4s",
                animationTimingFunction: "ease-out",
              }}
              onClick={() => popBalloon(balloon.id, balloon.message)}
            >
              <div className="w-12 h-16 rounded-full shadow-lg" style={{ backgroundColor: balloon.color }} />
              <div className="w-0.5 h-8 bg-gray-400 mx-auto" />
            </button>
          ))}
        </div>

        <div className="text-center space-y-4">
          {!gameActive && timeLeft === 30 && (
            <Button
              onClick={startGame}
              className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white rounded-full px-8 py-3 text-lg"
            >
              Start Game!
            </Button>
          )}

          {!gameActive && timeLeft === 0 && (
            <div>
              <div className="text-2xl font-bold text-green-600 mb-4">Game Over! Final Score: {score} 🎉</div>
              <Button
                onClick={resetGame}
                className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white rounded-full px-6 py-2"
              >
                Play Again
              </Button>
            </div>
          )}

          {gameActive && <p className="text-gray-600">Pop the balloons for surprise messages!</p>}
        </div>
      </CardContent>
    </Card>
  )
}
