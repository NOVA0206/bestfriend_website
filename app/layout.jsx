import { Suspense } from "react"
import "./globals.css"

export const metadata = {
  title: "To My Bestest Bestfriend 💖",
  description: "A heartwarming website dedicated to friendship",
  keywords: "friendship, bestfriend, memories, poems, games",
  authors: [{ name: "Your Loving Bestfriend" }],
  openGraph: {
    title: "To My Bestest Bestfriend 💖",
    description: "A special website made with love for my amazing bestfriend",
    type: "website",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </body>
    </html>
  )
}
