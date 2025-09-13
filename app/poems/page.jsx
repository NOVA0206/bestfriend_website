"use client"

import FloatingHearts from "@/components/floating-hearts"
import Navigation from "@/components/navigation"
import PoemCard from "@/components/poem-card"
import Sparkles from "@/components/sparkles"
import TypewriterText from "@/components/typewriter-text"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const englishPoems = [
  {
    title: "My Dearest Friend",
    content: `In this world of endless faces,
You shine bright in all the places.
Through the laughter and the tears,
You've been with me through the years.

A friend like you is rare to find,
With such a beautiful heart and mind.
Thank you for being you, so true,
My life is brighter because of you.`,
  },
  {
    title: "Forever Friends",
    content: `Side by side or miles apart,
You're always close within my heart.
Through every season, every day,
Our friendship grows in every way.

No distance can break what we have built,
No time can fade this friendship's quilt.
Together we laugh, together we cry,
Our bond will never say goodbye.`,
  },
  {
    title: "Grateful Heart",
    content: `For all the times you made me smile,
For walking with me every mile.
For listening when I needed to talk,
For being my rock when I couldn't walk.

Your kindness knows no earthly bound,
In you, the truest friend I've found.
Thank you for your loving care,
For always being truly there.`,
  },
]

const marathiPoems = [
  {
    title: "माझी प्रिय मैत्रिण",
    content: `तुझ्या हास्याने मन माझे नेहमी उजळते,
तुझ्या सहवासाने जीवन माझे आनंदाने भरते।

आनंदात तू सोबत असशील तर मार्ग सुकर होते,
दुःखात तुझ्या सान्निध्याने प्रत्येक वेदना हलकी होते।

मैत्रीची नाळ आपुलकीने घट्ट जुळते,
आठवणींच्या फुलांनी प्रत्येक क्षण सुगंधित होते।

तुझ्या मित्रत्वामुळे आयुष्य अधिक समृद्ध होते,
तुझ्याशिवाय हे जगणे कधीच पूर्ण वाटते नाही — इतके समजते.।`,
  },
  {
    title: "सखी माझी",
    content: `सखी माझी, जिथे तू असतेस तिथे उजेड उमलतो,
तुझ्या हासण्याने, मन आनंदाने भरतो.

सावल्यांतही तू किरणासारखी प्रकाश पसरवतेस,
तुझ्या संगतीने क्षण प्रत्येक आनंदाने नटवतेस.

मैत्री आमची अनमोल, श्रद्धेचा ठाव असतो,
तुझ्या सहवासामुळे जीवन सुलभ व सुंदर होतो.

धन्यवाद तुझा, सखी, साथीसाठी प्रत्येक रात्री-दिवस,
तुझ्या मित्रत्वात मी सापडतो नेहमीच नवा उत्साह व विश्वास.`,
  },
]

export default function PoemsPage() {
  const [currentPoem, setCurrentPoem] = useState(null)
  const [showSurprise, setShowSurprise] = useState(false)
  const [language, setLanguage] = useState("english")

  const getRandomPoem = () => {
    const allPoems = [...englishPoems, ...marathiPoems]
    const randomPoem = allPoems[Math.floor(Math.random() * allPoems.length)]
    setCurrentPoem(randomPoem)
    setShowSurprise(true)
  }

  const currentPoems = language === "english" ? englishPoems : marathiPoems

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23e1b7d6' fillOpacity='0.3'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <FloatingHearts />
      <Sparkles />
      <Navigation />

      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-6">
            <TypewriterText text="Beautiful Poems 📝" speed={100} />
          </h1>
          <p className="text-xl text-gray-600 mb-8">Words from the heart, written just for you</p>

          {/* Language Toggle */}
          <div className="flex justify-center gap-4 mb-8 relative z-40">
            <button
              onClick={() => {
                console.log("[v0] Switching to English")
                setLanguage("english")
              }}
              className="rounded-full px-6 py-2 transition-all duration-300 font-medium border-2"
              style={{
                backgroundColor: language === "english" ? "#7c3aed" : "#ffffff",
                color: language === "english" ? "#ffffff" : "#1f2937",
                borderColor: "#7c3aed",
                position: "relative",
                zIndex: 100,
              }}
            >
              English
            </button>
            <button
              onClick={() => {
                console.log("[v0] Switching to Marathi")
                setLanguage("marathi")
              }}
              className="rounded-full px-6 py-2 transition-all duration-300 font-medium border-2"
              style={{
                backgroundColor: language === "marathi" ? "#7c3aed" : "#ffffff",
                color: language === "marathi" ? "#ffffff" : "#1f2937",
                borderColor: "#7c3aed",
                position: "relative",
                zIndex: 100,
              }}
            >
              मराठी
            </button>
          </div>
        </div>

        {/* Poems Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {currentPoems.map((poem, index) => (
            <PoemCard key={`${language}-${index}`} poem={poem} delay={index * 500} />
          ))}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Button
            asChild
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <a href="/">
              <span className="mr-2">🏠</span>
              Back to Home
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
