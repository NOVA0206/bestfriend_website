"use client"

import { useState } from "react"

const reactions = [
  { emoji: "😍", label: "Love it!", count: 0 },
  { emoji: "🥰", label: "So sweet!", count: 0 },
  { emoji: "😂", label: "Hilarious!", count: 0 },
  { emoji: "🤗", label: "Warm hugs!", count: 0 },
  { emoji: "✨", label: "Magical!", count: 0 },
]

export default function EmojiReactions() {
  const [reactionCounts, setReactionCounts] = useState(reactions)

  const handleReaction = (index) => {
    setReactionCounts((prev) =>
      prev.map((reaction, i) => (i === index ? { ...reaction, count: reaction.count + 1 } : reaction)),
    )
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {reactionCounts.map((reaction, index) => (
        <button
          key={index}
          onClick={() => handleReaction(index)}
          className="flex flex-col items-center p-3 rounded-lg bg-yellow-50 hover:bg-yellow-100 transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <span className="text-2xl mb-1">{reaction.emoji}</span>
          <span className="text-xs text-gray-600 text-center">{reaction.label}</span>
          <span className="text-sm font-bold text-yellow-600">{reaction.count}</span>
        </button>
      ))}
    </div>
  )
}
