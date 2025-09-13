"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(0)
  const audioRef = useRef(null)

  const songs = [
    { title: "Friendship Melody", emoji: "🎵" },
    { title: "Happy Vibes", emoji: "😊" },
    { title: "Memory Lane", emoji: "💭" },
  ]

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        // Since we don't have actual audio files, we'll just simulate
        console.log("Playing:", songs[currentSong].title)
      }
      setIsPlaying(!isPlaying)
    }
  }

  const nextSong = () => {
    setCurrentSong((prev) => (prev + 1) % songs.length)
    setIsPlaying(false)
  }

  return (
    <Card className="fixed bottom-4 right-4 bg-white/90 backdrop-blur-sm border-pink-200 shadow-lg z-40">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{songs[currentSong].emoji}</span>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700">{songs[currentSong].title}</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" onClick={togglePlay} className="rounded-full">
              {isPlaying ? "⏸️" : "▶️"}
            </Button>
            <Button size="sm" variant="ghost" onClick={nextSong} className="rounded-full">
              ⏭️
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
