"use client"

import CursorTrail from "@/components/cursor-trail"
import EmojiReactions from "@/components/emoji-reactions"
import EnvelopeAnimation from "@/components/envelope-animation"
import FloatingHearts from "@/components/floating-hearts"
import LoadingScreen from "@/components/loading-screen"
import MemoryTimeline from "@/components/memory-timeline"
import MusicPlayer from "@/components/music-player"
import Navigation from "@/components/navigation"
import Sparkles from "@/components/sparkles"
import ThemeToggle from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [showContent, setShowContent] = useState(false)
  const [confetti, setConfetti] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasSeenAnimation, setHasSeenAnimation] = useState(false)
  const [surpriseOpen, setSurpriseOpen] = useState(false)

  useEffect(() => {
    const animationSeen = localStorage.getItem("friendship-website-animation-seen")
    if (animationSeen === "true") {
      setHasSeenAnimation(true)
      setShowContent(true)
      setIsLoading(false)
    }
  }, [])

  const createConfetti = () => {
    console.log("[magic] createConfetti triggered")
    const newConfetti = Array.from({ length: 60 }, (_, i) => ({
      id: `${Date.now()}-${i}`,
      left: Math.random() * 100,
      size: Math.random() * 12 + 8, // 8px - 20px
      color: ["#f9c4d8", "#ffd700", "#ffb6c1", "#e1b7d6"][
        Math.floor(Math.random() * 4)
      ],
      animationDelay: Math.random() * 0.4,
      rotate: Math.random() * 360,
    }))
    setConfetti(newConfetti)
    // remove after animation
    setTimeout(() => setConfetti([]), 3200)
  }

  const handleAnimationComplete = () => {
    localStorage.setItem("friendship-website-animation-seen", "true")
    setShowContent(true)
  }

  if (isLoading && !hasSeenAnimation) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23f9c4d8' fillOpacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <FloatingHearts />
      <Sparkles />
      <Navigation />
      <CursorTrail />
      <MusicPlayer />
      <ThemeToggle />

      {/* Confetti (top layer) */}
      {confetti.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {confetti.map((piece) => (
            <div
              key={piece.id}
              className="absolute rounded-full animate-fall"
              style={{
                left: `${piece.left}%`,
                width: `${piece.size}px`,
                height: `${piece.size}px`,
                backgroundColor: piece.color,
                animationDelay: `${piece.animationDelay}s`,
                transform: `rotate(${piece.rotate}deg)`,
              }}
            />
          ))}
        </div>
      )}

      {!showContent && !hasSeenAnimation ? (
        <EnvelopeAnimation onComplete={handleAnimationComplete} />
      ) : (
        <div className="container mx-auto px-4 pt-24 pb-12 animate-fadeIn">
          {/* Header / Magic */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-400 mb-4 animate-pulse">
              To My Bestest Bestfriend 💖
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6">
              Welcome to a small corner made just for you by me with an intention of presenting a special gift for you.
            </p>

            <div className="flex justify-center">
              <Button
                onClick={createConfetti}
                className="relative inline-flex items-center bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white px-6 py-3 text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
              >
                Click for Magic! ✨
                {/* small subtle floating shimmer */}
                <span className="absolute -top-2 -right-2 inline-block w-6 h-6 rounded-full bg-white/30 animate-pulse" />
              </Button>
            </div>
          </div>

          {/* Centered Grid: 3 columns on md+ */}
          <div className="flex justify-center mb-12">
            <div className="grid gap-8 justify-items-center md:grid-cols-3 w-full max-w-6xl">
              {/* Card 1: Memory Timeline */}
              <Card className="w-80 bg-white/80 backdrop-blur-sm border-purple-200 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold text-purple-700 mb-3 flex items-center">
                    <span className="mr-2">📸</span>Memory Lane
                  </h3>
                  <div className="text-sm text-gray-700">
                    <MemoryTimeline />
                  </div>
                </CardContent>
              </Card>

              {/* Card 2: Emoji Reactions */}
              <Card className="w-80 bg-white/80 backdrop-blur-sm border-yellow-200 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold text-yellow-700 mb-3 flex items-center">
                    <span className="mr-2">😊</span>React to This!
                  </h3>
                  <div className="text-sm text-gray-700">
                    <EmojiReactions />
                  </div>
                </CardContent>
              </Card>

              {/* Card 3: Surprise Box (simple interactive) */}
              <Card className="w-80 bg-white/80 backdrop-blur-sm border-pink-200 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <CardContent className="p-6 flex flex-col">
                  <h3 className="text-2xl font-semibold text-pink-600 mb-3 flex items-center">
                    <span className="mr-2">🎁</span>Surprise Box
                  </h3>

                  <p className="text-sm text-gray-700 mb-4">
                    Click the button below to open a tiny surprise message.
                  </p>

                  <Button
                    onClick={() => setSurpriseOpen((s) => !s)}
                    className="self-start bg-gradient-to-r from-pink-300 to-purple-300 text-gray-900 px-4 py-2 rounded-full shadow-sm hover:scale-105 transition"
                  >
                    {surpriseOpen ? "Close" : "Open Surprise"}
                  </Button>

                  {surpriseOpen && (
                    <div className="mt-4 p-3 bg-white/90 rounded-md border border-pink-100 shadow-inner">
                      <p className="text-sm text-gray-800">
                        ✨ Surprise! You're the best. Can't wait for more memories. 💖
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-wrap justify-center gap-6">
            <Button
              asChild
              className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white px-6 py-3 rounded-full shadow-lg transition transform hover:scale-105"
            >
              <a href="/poems">📝 Read Beautiful Poems</a>
            </Button>

            <Button
              asChild
              className="bg-gradient-to-r from-purple-400 to-indigo-400 hover:from-purple-500 hover:to-indigo-500 text-white px-6 py-3 rounded-full shadow-lg transition transform hover:scale-105"
            >
              <a href="/games">🎮 Play Fun Games</a>
            </Button>

            <Button
              asChild
              className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white px-6 py-3 rounded-full shadow-lg transition transform hover:scale-105"
            >
              <a href="/messages">💌 Special Messages</a>
            </Button>
          </div>
        </div>
      )}

      {/* Animations CSS */}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 1;
          }
          30% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall 3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease forwards;
        }
      `}</style>
    </div>
  )
}
