"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [winner, setWinner] = useState(null)
  const [confetti, setConfetti] = useState([])

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  const handleClick = (i) => {
    if (board[i] || winner) return

    const newBoard = [...board]
    newBoard[i] = isXNext ? "💖" : "✨"
    setBoard(newBoard)

    const gameWinner = calculateWinner(newBoard)
    if (gameWinner) {
      setWinner(gameWinner)
      createConfetti()
    }

    setIsXNext(!isXNext)
  }

  const createConfetti = () => {
    const newConfetti = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDelay: Math.random() * 2,
    }))
    setConfetti(newConfetti)
    setTimeout(() => setConfetti([]), 3000)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setWinner(null)
    setConfetti([])
  }

  const renderSquare = (i) => (
    <button
      key={i}
      className="w-20 h-20 bg-white border-2 border-purple-300 rounded-lg text-3xl font-bold hover:bg-purple-50 transition-all duration-200 hover:scale-105 active:scale-95"
      onClick={() => handleClick(i)}
    >
      {board[i]}
    </button>
  )

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-purple-200 shadow-xl max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl text-purple-700">Tic Tac Toe</CardTitle>
        <p className="text-gray-600">💖 vs ✨</p>
      </CardHeader>
      <CardContent className="text-center">
        {/* Confetti */}
        {confetti.length > 0 && (
          <div className="fixed inset-0 pointer-events-none z-20">
            {confetti.map((piece) => (
              <div
                key={piece.id}
                className="absolute w-2 h-2 bg-yellow-400 animate-bounce"
                style={{
                  left: `${piece.left}%`,
                  animationDelay: `${piece.animationDelay}s`,
                  animationDuration: "3s",
                }}
              />
            ))}
          </div>
        )}

        {/* Game Status */}
        <div className="mb-6">
          {winner ? (
            <div className="text-2xl font-bold text-green-600">🎉 {winner} Wins! 🎉</div>
          ) : board.every((square) => square) ? (
            <div className="text-2xl font-bold text-blue-600">It's a Tie! 🤝</div>
          ) : (
            <div className="text-xl text-purple-600">Next player: {isXNext ? "💖" : "✨"}</div>
          )}
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-2 mb-6 justify-center">
          {Array.from({ length: 9 }, (_, i) => renderSquare(i))}
        </div>

        {/* Reset Button */}
        <Button
          onClick={resetGame}
          className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white rounded-full px-6 py-2"
        >
          New Game
        </Button>
      </CardContent>
    </Card>
  )
}
