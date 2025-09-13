"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import TypewriterText from "./typewriter-text"

export default function PoemCard({ poem, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  const handleTitleComplete = () => {
    setTimeout(() => setShowContent(true), 500)
  }

  return (
    <Card
      className={`bg-white/80 backdrop-blur-sm border-purple-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <CardHeader>
        <CardTitle className="text-2xl text-purple-700 text-center">
          {isVisible && <TypewriterText text={poem.title} speed={80} onComplete={handleTitleComplete} />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {showContent && (
          <div className="text-center">
            <TypewriterText
              text={poem.content}
              speed={30}
              className="text-lg leading-relaxed text-gray-700 whitespace-pre-line"
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
