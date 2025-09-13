"use client"

import BalloonPop from "@/components/balloon-pop"
import FloatingHearts from "@/components/floating-hearts"
import MemoryCardGame from "@/components/memory-card-game"
import Navigation from "@/components/navigation"
import Sparkles from "@/components/sparkles"
import TicTacToe from "@/components/tic-tac-toe"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

export default function GamesPage() {
  const [activeGame, setActiveGame] = useState(null)

  const games = [
    {
      id: "tictactoe",
      title: "Tic Tac Toe",
      description: "Classic game for two! Challenge your bestie!",
      emoji: "⭕",
      component: TicTacToe,
    },
    {
      id: "memory",
      title: "Memory Match",
      description: "Find matching pairs of friendship emojis!",
      emoji: "🧠",
      component: MemoryCardGame,
    },
    {
      id: "balloons",
      title: "Balloon Pop",
      description: "Pop colorful balloons for fun surprises!",
      emoji: "🎈",
      component: BalloonPop,
    },
  ]

  const ActiveGameComponent = activeGame
    ? games.find((g) => g.id === activeGame)?.component
    : null

  const handleGameSelect = (gameId) => {
    console.log("[v0] Selecting game:", gameId)
    setActiveGame(gameId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffd700' fillOpacity='0.4'%3E%3Cpath d='M25 25m-8 0a8 8 0 1 1 16 0a8 8 0 1 1-16 0'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <FloatingHearts />
      <Sparkles />
      <Navigation />

      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-6">
            Fun Games 🎮
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Let's play together and create more memories!
          </p>
        </div>

        {!activeGame ? (
          <>
            {/* Games Selection */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {games.map((game) => (
                <Card
                  key={game.id}
                  className="bg-white/80 backdrop-blur-sm border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => handleGameSelect(game.id)}
                >
                  <CardHeader className="text-center">
                    <div className="text-6xl mb-4">{game.emoji}</div>
                    <CardTitle className="text-2xl text-purple-700">
                      {game.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 mb-4">{game.description}</p>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleGameSelect(game.id)
                      }}
                      className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white rounded-full"
                    >
                      Play Now!
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Back to Home */}
            <div className="text-center">
              <Button
                asChild
                className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <a href="/">
                  <span className="mr-2">🏠</span>
                  Back to Home
                </a>
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Active Game */}
<div className="relative">
  {/* Floating Back Button */}
  <Button
    onClick={() => {
      console.log("[v0] Going back to games menu")
      setActiveGame(null) // shows the games selection again
    }}
    className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
               mb-4 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 
               hover:from-purple-500 hover:to-pink-500 text-white px-6 py-3 
               shadow-2xl hover:shadow-3xl transition-all duration-300 
               hover:scale-110 z-50"
  >
    ← Back to Games
  </Button>

  {/* Active Game Component */}
  <div className="mt-16 relative z-10">
    {ActiveGameComponent && <ActiveGameComponent />}
  </div>
</div>

          </>
        )}
      </div>
    </div>
  )
}
