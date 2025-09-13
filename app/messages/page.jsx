"use client"

import FloatingHearts from "@/components/floating-hearts"
import Navigation from "@/components/navigation"
import Sparkles from "@/components/sparkles"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

/* ---------------- TypewriterText ---------------- */
function TypewriterText({ text, speed = 30, className = "" }) {
  const [displayedText, setDisplayedText] = useState("")

  useEffect(() => {
    let i = 0
    setDisplayedText("")
    if (!text) return
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i))
      i++
      if (i >= text.length) clearInterval(interval)
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed])

  return <div className={className}>{displayedText}</div>
}

/* ---------------- content ---------------- */
const heartfeltLetter = `I just want to take a moment to thank you for always being there whenever I needed someone. Your presence, support, laughter, and quirks have made my life brighter. I can't imagine this journey without you, and I'm endlessly grateful for every memory we've shared.

You are not just my bestfriend; you are my chosen family, my cheerleader, and my constant inspiration. Through every laugh we've shared, every tear we've wiped away, and every adventure we've embarked on together, you've shown me what true friendship means.

Your kindness knows no bounds, your heart is pure gold, and your spirit is absolutely infectious. You have this amazing ability to light up any room you walk into and make everyone around you feel special and valued.

I hope this website shows even a fraction of how much you mean to me. Thank you for being you, always. Thank you for accepting me exactly as I am, for celebrating my victories, and for standing by me through challenges.

Our friendship is one of the greatest gifts life has given me, and I treasure every moment we spend together. Here's to many more years of laughter, adventures, inside jokes, and amazing friendship.

With all my appreciation and friendship,
~Jeevan 💖`

const specialMessages = [
  {
    title: "You're My Sunshine",
    message:
      "On the cloudiest days, you're the sunshine that breaks through and reminds me that everything will be okay. Your smile is contagious and your laugh is music to my ears.",
    emoji: "☀️",
  },
  {
    title: "Adventure Buddy",
    message:
      "We’ve feasted, laughed, and made memories, but hitting the road together is still uncharted territory. Can’t wait for that next adventure with you!",
    emoji: "🗺️",
  },
  {
    title: "My Safe Space",
    message:
      "You're the person I can be completely myself with - no masks, no pretending. Thank you for creating a safe space where I can just be me.",
    emoji: "🏠",
  },
]

/* ---------------- Page ---------------- */
export default function MessagesPage() {
  const [flapOpen, setFlapOpen] = useState(false) // flap animation
  const [showLetter, setShowLetter] = useState(false) // show popped letter modal
  const [confetti, setConfetti] = useState([])
  const [revealedMessages, setRevealedMessages] = useState(new Set())

  /* confetti */
  const createConfetti = (amount = 100) => {
    const newConfetti = Array.from({ length: amount }, (_, i) => ({
      id: `${Date.now()}-${i}`,
      left: Math.random() * 100,
      top: Math.random() * 100,
      color: ["#f9c4d8", "#ffd700", "#ffb6c1", "#e1b7d6", "#87ceeb"][Math.floor(Math.random() * 5)],
      delay: Math.random() * 0.5,
    }))
    setConfetti(newConfetti)
    setTimeout(() => setConfetti([]), 4500)
  }

  const revealMessage = (index) => {
    setRevealedMessages((prev) => new Set([...prev, index]))
    createConfetti(30)
  }

  /* open envelope: flap lifts first then letter pops out as a modal */
  const openEnvelope = () => {
    setFlapOpen(true)
    // small delay for flap to lift visually
    setTimeout(() => {
      setShowLetter(true)
      createConfetti(80)
    }, 700)
  }

  const closeLetter = () => {
    setShowLetter(false)
    // slightly close flap after hiding letter so user can re-open
    setTimeout(() => setFlapOpen(false), 300)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50 relative overflow-x-hidden">
      <FloatingHearts />
      <Sparkles />
      <Navigation />

      {/* confetti layer */}
      {confetti.length > 0 && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          {confetti.map((c) => (
            <div
              key={c.id}
              className="absolute w-3 h-3 rounded-full animate-fadeDown"
              style={{
                left: `${c.left}%`,
                top: `${c.top * 0.6}%`,
                backgroundColor: c.color,
                animationDelay: `${c.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 pt-24 pb-20 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-400 mb-4">
          Special Messages 💌
        </h1>
        <p className="text-lg text-gray-600 mb-12">Heartfelt words written just for you</p>

        {/* ---------- Envelope visual (keeps small) ---------- */}
        <div className="relative w-72 mx-auto" aria-hidden>
          {/* envelope body */}
          <div className="relative w-full h-44 mx-auto">
            <div className="absolute inset-0 bg-pink-200 border-4 border-pink-400 rounded-xl shadow-lg" />

            {/* flap (3D) */}
            <div
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: "bottom center",
                transition: "transform 800ms cubic-bezier(.2,.9,.2,1), box-shadow 400ms",
                transform: flapOpen ? "perspective(900px) rotateX(-160deg) translateY(-6px)" : "perspective(900px) rotateX(0deg)",
                boxShadow: flapOpen ? "0 20px 50px rgba(0,0,0,0.18)" : "0 8px 20px rgba(0,0,0,0.08)",
              }}
              className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-r from-pink-400 to-pink-300 rounded-t-xl"
            />
          </div>

          {/* Open button */}
          {!showLetter && (
            <div className="mt-6 flex justify-center">
              <Button
                onClick={openEnvelope}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
              >
                ✨ Open My Letter ✨
              </Button>
            </div>
          )}
        </div>

        {/* ---------- Large popped-out LETTER modal (outside envelope, centered) ---------- */}
        {showLetter && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
          >
            {/* dim background */}
            <div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={closeLetter}
            />

            {/* letter card */}
            <div
              className="relative z-50 w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-600"
              style={{
                // pop-in from slightly down + scale
                transform: showLetter ? "translateY(0) scale(1)" : "translateY(30px) scale(.98)",
              }}
            >
              {/* letter header with close */}
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <h3 className="text-2xl font-semibold text-purple-700">A Letter For You</h3>
                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => {
                      // allow re-open (close letter but keep flap open)
                      closeLetter()
                    }}
                    className="bg-gray-100 text-gray-700 px-3 py-2 rounded-full"
                  >
                    Close
                  </Button>
                </div>
              </div>

              {/* letter content area */}
              <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto">
                <TypewriterText
                  text={heartfeltLetter}
                  speed={22}
                  className="text-gray-800 text-left text-sm md:text-base whitespace-pre-line leading-relaxed"
                />
              </div>

              {/* actions */}
              <div className="px-6 py-4 border-t flex justify-end gap-3">
                <Button
                  onClick={() => {
                    createConfetti(80)
                  }}
                  className="bg-pink-500 text-white px-4 py-2 rounded-full"
                >
                  Celebrate 🎉
                </Button>

                <Button
                  onClick={() => {
                    closeLetter()
                  }}
                  className="bg-gray-100 px-4 py-2 rounded-full text-gray-700"
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ---------- Messages grid ---------- */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-purple-700 mb-8">More Messages of Appreciation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialMessages.map((msg, index) => (
              <Card
                key={index}
                className="bg-white/90 backdrop-blur-sm border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl"
              >
                <CardHeader className="pt-6">
                  <div className="text-center">
                    <div className="text-5xl mb-2">{msg.emoji}</div>
                    <CardTitle className="text-xl text-purple-700">{msg.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {!revealedMessages.has(index) ? (
                    <div className="flex justify-center">
                      <Button
                        onClick={() => revealMessage(index)}
                        variant="outline"
                        className="rounded-full border-purple-300 hover:bg-purple-50 px-4 py-2"
                      >
                        Reveal Message 💝
                      </Button>
                    </div>
                  ) : (
                    <p className="text-gray-700 leading-relaxed">{msg.message}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* small helper animations (tailwind doesn't ship animate-fadeDown by default) */}
      <style jsx>{`
        @keyframes fadeDown {
          0% { transform: translateY(-4px); opacity: 1; }
          50% { transform: translateY(18vh); opacity: 0.9; }
          100% { transform: translateY(40vh); opacity: 0; }
        }
        .animate-fadeDown {
          animation: fadeDown 3.8s linear forwards;
        }
      `}</style>
    </div>
  )
}
