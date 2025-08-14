"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface HeroSectionProps {
  imageUrl: string
  overlayOpacity?: number
  height?: string
  imagePosition?: "center" | "top" | "bottom"
  showVideo?: boolean
}

export function HeroSection({
  imageUrl,
  overlayOpacity = 0.5,
  height = "600px",
  imagePosition = "center",
  showVideo = false,
}: HeroSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative w-full overflow-hidden" style={{ height }}>
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 w-full h-full max-w-screen-2xl mx-auto">
        <Image
          src={imageUrl || "/hero-bg.jpg"}
          alt="Hero background"
          fill
          priority
          className="object-cover transition-transform duration-700 ease-out"
          style={{
            objectPosition: imagePosition,
            transform: isLoaded ? "scale(1.05)" : "scale(1.15)",
          }}
          onLoad={() => setIsLoaded(true)}
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"
          style={{ opacity: overlayOpacity }}
        ></div>
      </div>

      {/* Content Container */}
      <div className="relative h-full w-full">
        {showVideo && (
          <video
            src="/فيديو الملك عبدالله.mp4"
            autoPlay
            loop
            muted
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/10 to-transparent"></div>
    </section>
  )
}
