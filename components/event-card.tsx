"use client"

import { Button } from "@/components/ui/button"
import { Bookmark, UserPlus, MapPin, Calendar, Clock, CheckCircle } from "lucide-react"
import type { Event } from "./event-list"
import { useTranslation } from "@/contexts/TranslationContext"

interface EventProps {
  event: Event
  onSave: () => void
  onRegister: () => void
}

export function EventCard({ event, onSave, onRegister }: EventProps) {
  const { language } = useTranslation()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-green-100 text-green-800"
      case "ongoing":
        return "bg-yellow-100 text-yellow-800"
      case "past":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Calendar className="w-4 h-4" />
      case "ongoing":
        return <Clock className="w-4 h-4" />
      case "past":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Calendar className="w-4 h-4" />
    }
  }

  // Format the date for better display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')
  }

  // Check if event is in the past to disable registration
  const isPastEvent = event.status === "past"

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start gap-2 mb-2">
        <div
          className={`text-${event.status === "upcoming" ? "green" : event.status === "ongoing" ? "yellow" : "gray"}-600`}
        >
          {getStatusIcon(event.status)}
        </div>
        <div className="text-xs text-gray-600">
          {formatDate(event.date)} • {event.status}
        </div>
      </div>

      <h4 className="text-lg font-semibold mb-1">{language === 'ar' ? event.titleAr : event.title}</h4>
      <p className="text-sm text-gray-600 mb-3">{language === 'ar' ? event.descriptionAr : event.description}</p>

      <div className="flex items-center text-sm text-gray-600 mb-4">
        <MapPin className="w-4 h-4 mr-1" />
        {event.location}
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" className="text-xs" onClick={onSave}>
          <Bookmark className="w-3.5 h-3.5 mr-1" />
          Save
        </Button>
        <Button size="sm" className="text-xs bg-blue-600 hover:bg-blue-700" onClick={onRegister} disabled={isPastEvent}>
          <UserPlus className="w-3.5 h-3.5 mr-1" />
          {isPastEvent ? "Ended" : "Register"}
        </Button>
      </div>
    </div>
  )
}
