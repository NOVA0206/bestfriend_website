"use client"

import { useState } from "react"

const memories = [
  {
    date: "First Meeting",
    title: "The Day We Met",
    description: "Who knew this would be the start of something amazing!",
    emoji: "🌟",
  },
  {
    date: "Adventures",
    title: "Countless Adventures",
    description: "From spontaneous trips to late-night conversations",
    emoji: "🚗",
  },
  {
    date: "Support",
    title: "Through Thick & Thin",
    description: "Always there for each other, no matter what",
    emoji: "🤗",
  },
  {
    date: "Today",
    title: "Still Going Strong",
    description: "And this is just the beginning!",
    emoji: "💖",
  },
]

export default function MemoryTimeline() {
  const [activeMemory, setActiveMemory] = useState(0)

  return (
    <div className="space-y-4">
      {memories.map((memory, index) => (
        <div
          key={index}
          className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
            activeMemory === index ? "bg-purple-100 scale-105" : "bg-gray-50 hover:bg-purple-50"
          }`}
          onClick={() => setActiveMemory(index)}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{memory.emoji}</span>
            <div>
              <h4 className="font-semibold text-purple-700">{memory.title}</h4>
              <p className="text-sm text-gray-600">{memory.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
