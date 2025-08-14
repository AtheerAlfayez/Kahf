"use client"

import { useState, useEffect } from "react"
import { ScrollReveal } from "./scroll-reveal"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Calendar, MapPin, Clock, ChevronDown, ChevronUp } from "lucide-react"
import { useTranslation } from "@/contexts/TranslationContext"
import type { Translations } from "@/contexts/TranslationContext"

// Define event type
export interface Event {
  _id: string
  title: string
  titleAr: string
  description: string
  descriptionAr: string
  date: string
  location: string
}

interface EventListProps {
  selectedDate: Date | null
  onNextEventChange: (event: Event | null) => void
}

type EventFilter = 'all' | 'upcoming' | 'past' | 'today'

export function EventList({ selectedDate, onNextEventChange }: EventListProps) {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set())
  const [activeFilter, setActiveFilter] = useState<EventFilter>('all')
  const [showAllEvents, setShowAllEvents] = useState(false)
  const { getNestedTranslation, language } = useTranslation()

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/events")
      if (!response.ok) throw new Error("Failed to fetch events")
      const data = await response.json()
      setEvents(data)
      
      // Set the next upcoming event
      const upcomingEvents = data
        .filter((event: Event) => new Date(event.date) > new Date())
        .sort((a: Event, b: Event) => new Date(a.date).getTime() - new Date(b.date).getTime())
      
      onNextEventChange(upcomingEvents[0] || null)
    } catch (error) {
      console.error("Failed to fetch events:", error)
      setError("Failed to load events. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const filterEvents = (events: Event[]) => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    
    // First apply date selection filter if exists
    let filtered = selectedDate
      ? events.filter(
          (event) =>
            new Date(event.date).toDateString() === selectedDate.toDateString()
        )
      : events

    // Then apply tab filter
    switch (activeFilter) {
      case 'upcoming':
        return filtered.filter(event => new Date(event.date) > now)
      case 'past':
        return filtered.filter(event => new Date(event.date) < today)
      case 'today':
        return filtered.filter(
          event => new Date(event.date).toDateString() === today.toDateString()
        )
      default:
        return filtered
    }
  }

  // Handle save event
  const handleSaveEvent = (eventId: string) => {
    // In a real app, this would save to user's profile or localStorage
    alert(`Event ${eventId} saved to your favorites!`)
  }

  // Handle register for event
  const handleRegisterEvent = (eventId: string) => {
    // In a real app, this would register the user for the event
    alert(`You've registered for event ${eventId}!`)
  }

  const toggleDescription = (eventId: string) => {
    setExpandedEvents(prev => {
      const newSet = new Set(prev)
      if (newSet.has(eventId)) {
        newSet.delete(eventId)
      } else {
        newSet.add(eventId)
      }
      return newSet
    })
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Loading events...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 dark:text-red-400">{error}</p>
        <Button onClick={fetchEvents} className="mt-4">
          Try Again
        </Button>
      </div>
    )
  }

  const filteredEvents = filterEvents(events)
  const displayedEvents = showAllEvents ? filteredEvents : filteredEvents.slice(0, 3)
  const hasMoreEvents = filteredEvents.length > 3

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-6">
        <Button
          variant={activeFilter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveFilter('all')}
          className="text-sm"
        >
          {getNestedTranslation("events", "allEvents")}
        </Button>
        <Button
          variant={activeFilter === 'upcoming' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveFilter('upcoming')}
          className="text-sm"
        >
          {getNestedTranslation("events", "upcoming")}
        </Button>
        <Button
          variant={activeFilter === 'today' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveFilter('today')}
          className="text-sm"
        >
          {getNestedTranslation("events", "today")}
        </Button>
        <Button
          variant={activeFilter === 'past' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveFilter('past')}
          className="text-sm"
        >
          {getNestedTranslation("events", "past")}
        </Button>
      </div>

      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        {selectedDate
          ? `Events on ${selectedDate.toLocaleDateString()}`
          : activeFilter === 'all'
          ? getNestedTranslation("events", "allEvents")
          : getNestedTranslation("events", activeFilter as keyof Translations["events"])}
      </h3>

      {filteredEvents.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          {getNestedTranslation("events", "noEventsFound")}
        </div>
      ) : (
        <div className="space-y-4">
          {displayedEvents.map((event) => (
            <ScrollReveal key={event._id}>
              <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 overflow-hidden hover:shadow-2xl transition-shadow duration-200">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-1">
                    {language === 'ar' ? event.titleAr : event.title}
                  </h3>
                  <div className="space-y-2">
                    <p className={cn(
                      "text-gray-600 dark:text-gray-300 whitespace-pre-wrap break-words",
                      !expandedEvents.has(event._id) && "line-clamp-3"
                    )}>
                      {language === 'ar' ? event.descriptionAr : event.description}
                    </p>
                    {(language === 'ar' ? event.descriptionAr : event.description).length > 150 && (
                      <button
                        onClick={() => toggleDescription(event._id)}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium flex items-center gap-1 transition-colors"
                      >
                        {expandedEvents.has(event._id) ? (
                          <>
                            {getNestedTranslation("events", "showLess")} <ChevronUp className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            {getNestedTranslation("events", "readMore")} <ChevronDown className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                  <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400 mt-4">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center text-blue-600 dark:text-blue-400">
                        <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="truncate font-medium">
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center text-blue-600 dark:text-blue-400">
                        <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="truncate font-medium">
                          {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="flex items-center text-blue-600 dark:text-blue-400">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="truncate font-medium">
                          {event.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
          
          {hasMoreEvents && (
            <div className="text-center pt-4">
              <Button
                variant="outline"
                onClick={() => setShowAllEvents(!showAllEvents)}
                className="w-full md:w-auto"
              >
                {showAllEvents ? (
                  <>{getNestedTranslation("events", "showLessEvents")} <ChevronUp className="ml-2 h-4 w-4" /></>
                ) : (
                  <>{getNestedTranslation("events", "seeMoreEvents")} <ChevronDown className="ml-2 h-4 w-4" /></>
                )}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
