"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { ScrollReveal } from "@/components/scroll-reveal"
import { StatCard } from "@/components/stat-card"
import { Calendar } from "@/components/ui/calendar"
import { Countdown } from "@/components/countdown"
import { EventList, Event } from "@/components/event-list"
import { PartnerCarousel } from "@/components/partner-carousel"
import { MapPin } from "lucide-react"
import { useTranslation } from "@/contexts/TranslationContext"

export default function Home() {
  // State for selected event date
  const [selectedEventDate, setSelectedEventDate] = useState<Date | null>(null)
  const [nextEvent, setNextEvent] = useState<Event | null>(null)
  const [eventDates, setEventDates] = useState<Date[]>([])
  const { getNestedTranslation, language } = useTranslation()

  // Fetch events and extract dates
  useEffect(() => {
    const fetchEventDates = async () => {
      try {
        const response = await fetch("/api/events")
        if (!response.ok) throw new Error("Failed to fetch events")
        const data = await response.json()
        const dates = data.map((event: Event) => new Date(event.date))
        setEventDates(dates)
      } catch (error) {
        console.error("Error fetching event dates:", error)
      }
    }
    fetchEventDates()
  }, [])

  // Function to check if a date has an event
  const hasEvent = (date: Date) => {
    return eventDates.some(eventDate => 
      eventDate.getDate() === date.getDate() &&
      eventDate.getMonth() === date.getMonth() &&
      eventDate.getFullYear() === date.getFullYear()
    )
  }

  return (
    <main className="min-h-screen">
      <Header />

      {/* Home Video */}
      <div className="w-full h-screen flex justify-center items-center bg-black overflow-hidden">
        <video
          src="/home-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ maxHeight: '100vh' }}
        />
      </div>

      {/* Hero Section */}
      {/* Removed <HeroSection ... /> */}

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-[#003a70] to-[#002347] text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard 
              value={40} 
              label={getNestedTranslation("stats", "millionPeople")}
              icon="users"
            />
            <StatCard 
              value={17} 
              label={getNestedTranslation("stats", "countries")}
              icon="globe" 
            />
            <StatCard 
              value={37} 
              label={getNestedTranslation("stats", "humanitarianProjects")}
              icon="briefcase" 
            />
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="relative py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <div className="absolute inset-0 bg-[url('/pattern.jpg')] opacity-5 dark:opacity-[0.02] bg-repeat"></div>
        <div className="container mx-auto px-4 relative">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#003a70] to-[#002347] bg-clip-text text-transparent">
                {getNestedTranslation("events", "title")}
              </h2>
              <div className="w-24 h-1 bg-[#00b189] mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {getNestedTranslation("events", "subtitle")}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <ScrollReveal direction="left" className="lg:col-span-5">
              <div className="bg-gradient-to-br from-[#003a70] to-[#002347] dark:from-[#003a70] dark:to-[#002347] rounded-2xl p-6 text-white shadow-2xl h-full">
                <div className="mb-6 w-full">
                  <h3 className="text-xl font-bold mb-4">{getNestedTranslation("events", "calendarTitle")}</h3>
                  <div className="w-full">
                    <Calendar 
                      mode="single"
                      onSelect={(date: Date | undefined) => setSelectedEventDate(date || null)}
                      className="w-full"
                      classNames={{
                        months: "w-full",
                        month: "w-full",
                        caption: "flex justify-center pt-1 relative items-center mb-4",
                        caption_label: "text-sm font-medium",
                        table: "w-full",
                        head_row: "w-full grid grid-cols-7 gap-1",
                        head_cell: "text-muted-foreground rounded-md font-normal text-[0.8rem] text-center flex items-center justify-center h-9",
                        row: "w-full grid grid-cols-7 gap-1 mt-2",
                        cell: "text-center p-0 relative flex items-center justify-center [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                        day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 flex items-center justify-center relative",
                        day_today: "bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-full"
                      }}
                      components={{
                        DayContent: ({ date }) => (
                          <div className="relative">
                            {date.getDate()}
                            {hasEvent(date) && (
                              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#00b189] rounded-full" />
                            )}
                          </div>
                        )
                      }}
                    />
                  </div>
                </div>
                <div className="bg-white/10 rounded-xl p-5 backdrop-blur-sm">
                  {nextEvent ? (
                    <>
                      <div className="mb-4">
                        <h4 className="text-lg font-semibold mb-2">{language === 'ar' ? nextEvent.titleAr : nextEvent.title}</h4>
                        <p className="text-sm text-white/80">{new Date(nextEvent.date).toLocaleString('en-US')}</p>
                      </div>
                      <Countdown targetDate={nextEvent.date} />
                    </>
                  ) : (
                    <div className="text-center text-white/80">{getNestedTranslation("events", "noUpcomingEvents")}</div>
                  )}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" className="lg:col-span-7">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
                <EventList 
                  selectedDate={selectedEventDate} 
                  onNextEventChange={setNextEvent}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#003a70] to-[#002347] bg-clip-text text-transparent">
                {getNestedTranslation("partners", "title")}
              </h2>
              <div className="w-24 h-1 bg-[#00b189] mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {getNestedTranslation("partners", "subtitle")}
              </p>
            </div>
          </ScrollReveal>
          <PartnerCarousel />
        </div>
      </section>

      <Footer />
    </main>
  )
}
