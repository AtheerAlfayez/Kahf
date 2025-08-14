"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { 
  Briefcase, 
  Globe, 
  Users, 
  Calendar 
} from "lucide-react"

interface StatCardProps {
  value: number
  label: string
  icon: "briefcase" | "globe" | "users" | "calendar"
  prefix?: string
  suffix?: string
  duration?: number
}

export function StatCard({ value, label, icon, prefix = "", suffix = "", duration = 2 }: StatCardProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const end = value
    const incrementTime = (duration * 1000) / end
    const timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start >= end) clearInterval(timer)
    }, incrementTime)

    return () => {
      clearInterval(timer)
    }
  }, [isInView, value, duration])

  const IconComponent = {
    briefcase: Briefcase,
    globe: Globe,
    users: Users,
    calendar: Calendar
  }[icon]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
    >
      <div className="mb-4 p-3 bg-[#00b189]/20 rounded-full">
        <IconComponent className="h-10 w-10 text-[#00b189]" />
      </div>
      <h2 className="text-4xl font-bold text-[#00b189] mb-1 flex items-baseline">
        {prefix}
        <span className="tabular-nums">{count.toLocaleString()}</span>
        {suffix}
      </h2>
      <p className="text-sm text-center text-white/80">{label}</p>
    </motion.div>
  )
}
