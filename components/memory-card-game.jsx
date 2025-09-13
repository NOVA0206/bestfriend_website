"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const emojis = ["💖", "✨", "🌟", "🦋", "🌸", "🎀", "💕", "🌈"]
const gameEmojis = [...emojis, ...emojis].sort(() => Math.random() - 0.5)

export default function MemoryCardGame() {
  const [cards, setCards] = useState(
    gameEmojis.map((emoji, index) => ({ id: index, emoji, flipped: false, matched: false })),
  )
  const [flippedCards, setFlippedCards] = useState([])
  const [moves, setMoves] = useState(0)
  const [gameWon, setGameWon] = useState(false)

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards
      if (cards[first].emoji === cards[second].emoji) {
        setCards((prev) =>
          prev.map((card, index) => (index === first || index === second ? { ...card, matched: true } : card)),
        )
      }
      setTimeout(() => {
        setCards((prev) =>
          prev.map((card, index) =>
            flippedCards.includes(index) && !card.matched ? { ...card, flipped: false } : card,
          ),
        )
        setFlippedCards([])
      }, 1000)
      setMoves((prev) => prev + 1)
    }
  }, [flippedCards, cards])

  useEffect(() => {
    if (cards.every((card) => card.matched) && cards.length > 0) {
      setGameWon(true)
    }
  }, [cards])

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || cards[index].flipped || cards[index].matched) return

    setCards((prev) => prev.map((card, i) => (i === index ? { ...card, flipped: true } : card)))
    setFlippedCards((prev) => [...prev, index])
  }

  const resetGame = () => {
    const newCards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji, flipped: false, matched: false }))
    setCards(newCards)
    setFlippedCards([])
    setMoves(0)
    setGameWon(false)
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-purple-200 shadow-xl max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl text-purple-700">Memory Match</CardTitle>
        <div className="flex justify-center gap-4 text-lg">
          <span>Moves: {moves}</span>
          {gameWon && <span className="text-green-600 font-bold">🎉 You Won! 🎉</span>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-3 mb-6">
          {cards.map((card, index) => (
            <button
              key={card.id}
              className={`w-16 h-16 rounded-lg text-2xl font-bold transition-all duration-300 ${
                card.flipped || card.matched
                  ? "bg-pink-100 border-2 border-pink-300"
                  : "bg-purple-200 border-2 border-purple-300 hover:bg-purple-300"
              } hover:scale-105 active:scale-95`}
              onClick={() => handleCardClick(index)}
            >
              {card.flipped || card.matched ? card.emoji : "?"}
            </button>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={resetGame}
            className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white rounded-full px-6 py-2"
          >
            New Game
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
