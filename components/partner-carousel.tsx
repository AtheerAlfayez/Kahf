"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/contexts/TranslationContext"

interface Partner {
  id: number
  logo: string
  name: string
}

export function PartnerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { getNestedTranslation } = useTranslation()

  const partners: Partner[] = [
    { id: 1, logo: "/logo-1.png", name: "Partner 1" },
    { id: 2, logo: "/logo-2.png", name: "Partner 2" },
    { id: 3, logo: "/logo-3.png", name: "Partner 3" },
    { id: 4, logo: "/logo-4.png", name: "Partner 4" },
    { id: 5, logo: "/logo-5.png", name: "Partner 5" },
    { id: 6, logo: "/logo-6.png", name: "Partner 6" },
    { id: 7, logo: "/logo-7.jpg", name: "Partner 7" },
  ]

  const visiblePartners = 5
  const totalPartners = partners.length

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPartners)
    }, 3000)

    return () => clearInterval(interval)
  }, [totalPartners])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPartners)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPartners) % totalPartners)
  }

  // Calculate which partners to show
  const getVisiblePartners = () => {
    const visible = []
    for (let i = 0; i < visiblePartners; i++) {
      const index = (currentIndex + i) % totalPartners
      visible.push(partners[index])
    }
    return visible
  }

  return (
    <div className="relative">
      <div className="flex justify-center items-center">
        <div className="w-full max-w-7xl mx-auto">
          <div className="relative overflow-hidden">
            <div className="flex justify-center items-center gap-12">
              {getVisiblePartners().map((partner) => (
                <div
                  key={partner.id}
                  className="flex-shrink-0 px-4 animate-fade-in"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={240}
                      height={120}
                      className="object-contain h-24 w-auto transition-all duration-300 hover:scale-105 dark:filter dark:brightness-90 dark:hover:brightness-100"
                    />
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 z-10 dark:border-gray-600"
              onClick={prevSlide}
              aria-label={getNestedTranslation("partners", "previousPartners")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 z-10 dark:border-gray-600"
              onClick={nextSlide}
              aria-label={getNestedTranslation("partners", "nextPartners")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
