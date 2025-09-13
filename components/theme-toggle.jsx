"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  return (
    <Button
      onClick={() => setIsDark(!isDark)}
      variant="ghost"
      size="sm"
      className="fixed top-4 right-4 z-50 rounded-full bg-white/80 backdrop-blur-sm border border-pink-200"
    >
      {isDark ? "☀️" : "🌙"}
    </Button>
  )
}
