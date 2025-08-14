"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "@/contexts/TranslationContext"

interface CountdownProps {
  targetDate: Date | string | null
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const { getNestedTranslation } = useTranslation()

  useEffect(() => {
    if (!targetDate) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      return
    }

    const calculateTimeLeft = () => {
      const target = new Date(targetDate)
      const difference = target.getTime() - new Date().getTime()

      if (difference <= 0) {
        // Event has passed
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      })
    }

    // Calculate immediately
    calculateTimeLeft()

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000)

    // Cleanup
    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="grid grid-cols-4 gap-2">
      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-center">
        <div className="text-2xl font-bold text-white">{timeLeft.days}</div>
        <div className="text-[10px] text-white/80 uppercase tracking-wider font-medium">
          {getNestedTranslation("countdown", "days")}
        </div>
      </div>
      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-center">
        <div className="text-2xl font-bold text-white">{timeLeft.hours.toString().padStart(2, '0')}</div>
        <div className="text-[10px] text-white/80 uppercase tracking-wider font-medium">
          {getNestedTranslation("countdown", "hours")}
        </div>
      </div>
      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-center">
        <div className="text-2xl font-bold text-white">{timeLeft.minutes.toString().padStart(2, '0')}</div>
        <div className="text-[10px] text-white/80 uppercase tracking-wider font-medium">
          {getNestedTranslation("countdown", "minutes")}
        </div>
      </div>
      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-center">
        <div className="text-2xl font-bold text-white">{timeLeft.seconds.toString().padStart(2, '0')}</div>
        <div className="text-[10px] text-white/80 uppercase tracking-wider font-medium">
          {getNestedTranslation("countdown", "seconds")}
        </div>
      </div>
    </div>
  )
}
