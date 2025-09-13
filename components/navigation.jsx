"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/poems", label: "Poems", icon: "📝" },
    { href: "/games", label: "Games", icon: "🎮" },
    { href: "/messages", label: "Messages", icon: "💌" },
  ]

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-pink-200">
      <div className="flex items-center gap-4">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={pathname === item.href ? "default" : "ghost"}
              size="sm"
              className={`rounded-full transition-all duration-300 hover:scale-105 ${
                pathname === item.href
                  ? "bg-purple-600 text-white shadow-md hover:bg-purple-700"
                  : "text-gray-700 hover:bg-pink-100 hover:text-gray-800"
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </Button>
          </Link>
        ))}
      </div>
    </nav>
  )
}
