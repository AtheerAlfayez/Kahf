"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  LayoutDashboard,
  Users,
  Settings,
  Settings2,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Newspaper,
  Clock,
  Filter,
  BookOpen,
  FileText,
  Monitor,
  Users2,
  MessageSquare,
} from "lucide-react"
import { NewsManagement } from "@/components/admin/news-management"
import { useNews } from "@/contexts/NewsContext"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { LanguageToggle } from "@/components/ui/language-toggle"
import type { NewsItem } from "@/contexts/NewsContext"
import { useTranslation } from "@/contexts/TranslationContext"

interface Event {
  _id: string
  title: string
  titleAr: string
  description: string
  descriptionAr: string
  date: string
  time: string
  location: string
}

export default function AdminPage() {
  const { getNestedTranslation, language, setLanguage } = useTranslation()
  const [events, setEvents] = useState<Event[]>([])
  const { news } = useNews()
  const [isLoading, setIsLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [form, setForm] = useState({
    title: "",
    titleAr: "",
    description: "",
    descriptionAr: "",
    date: "",
    time: "",
    location: "",
  })
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")

  useEffect(() => {
    console.log('Current language from context:', language);
    fetchEvents()
  }, [language])

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events")
      if (!response.ok) throw new Error("Failed to fetch events")
      const data = await response.json()
      console.log('Fetched events:', data);
      setEvents(data)
    } catch (error) {
      console.error("Error fetching events:", error)
      toast.error("Failed to load events")
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setForm({
      title: "",
      titleAr: "",
      description: "",
      descriptionAr: "",
      date: "",
      time: "",
      location: "",
    })
  }

  const openAddModal = () => {
    resetForm()
    setShowAddModal(true)
  }

  const openEditModal = (event: Event) => {
    setSelectedEvent(event)
    setForm({
      title: event.title || "",
      titleAr: event.titleAr || "",
      description: event.description || "",
      descriptionAr: event.descriptionAr || "",
      date: event.date ? event.date.split('T')[0] : "",
      time: event.date ? event.date.split('T')[1]?.slice(0, 5) || "" : "",
      location: event.location || "",
    })
    setShowEditModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return

    try {
      const response = await fetch(`/api/events/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete event")

      toast.success("Event deleted successfully")
      fetchEvents()
    } catch (error) {
      console.error("Error deleting event:", error)
      toast.error("Failed to delete event")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = showEditModal 
        ? `/api/events/${selectedEvent?._id}`
        : "/api/events"
      const method = showEditModal ? "PUT" : "POST"
      
      // Combine date and time for the API
      const dateTime = `${form.date}T${form.time}:00`
      const body = {
        title: form.title,
        titleAr: form.titleAr,
        description: form.description,
        descriptionAr: form.descriptionAr,
        date: dateTime,
        location: form.location,
        ...(showEditModal && selectedEvent?._id ? { _id: selectedEvent._id } : {})
      }

      console.log("Submitting event:", {
        url,
        method,
        body
      })

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to save event")
      }

      toast.success(
        showEditModal ? "Event updated successfully" : "Event added successfully"
      )
      setShowAddModal(false)
      setShowEditModal(false)
      resetForm()
      fetchEvents()
    } catch (error) {
      console.error("Error saving event:", error)
      toast.error(error instanceof Error ? error.message : "Failed to save event")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setForm(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const t = {
    dashboard: getNestedTranslation("admin", "dashboard"),
    events: getNestedTranslation("admin", "events"),
    news: getNestedTranslation("admin", "news"),
    users: getNestedTranslation("admin", "users"),
    settings: getNestedTranslation("admin", "settings"),
    totalEvents: getNestedTranslation("admin", "totalEvents"),
    totalNews: getNestedTranslation("admin", "totalNews"),
    activeUsers: getNestedTranslation("admin", "activeUsers"),
    upcomingEvents: getNestedTranslation("admin", "upcomingEvents"),
    noUpcomingEvents: getNestedTranslation("admin", "noUpcomingEvents"),
    scheduleEvent: getNestedTranslation("admin", "scheduleEvent"),
    actions: JSON.parse(getNestedTranslation("admin", "actions")),
    newsCategories: JSON.parse(getNestedTranslation("admin", "newsCategories")),
    welcomeMessage: getNestedTranslation("admin", "welcomeMessage"),
    quickActions: getNestedTranslation("admin", "quickActions"),
    modals: JSON.parse(getNestedTranslation("admin", "modals")),
    form: JSON.parse(getNestedTranslation("admin", "form")),
    noEventsFound: getNestedTranslation("admin", "noEventsFound"),
    addFirstEvent: getNestedTranslation("admin", "addFirstEvent")
  }

  const sidebarItems = [
    {
      id: "dashboard",
      label: t.dashboard,
      icon: LayoutDashboard,
    },
    {
      id: "events",
      label: t.events,
      icon: Calendar,
    },
    {
      id: "news",
      label: t.news,
      icon: Newspaper,
    },
    {
      id: "users",
      label: t.users,
      icon: Users,
    },
    {
      id: "settings",
      label: t.settings,
      icon: Settings,
    },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t.welcomeMessage}</h2>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Total Events Card */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t.totalEvents}</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{events.length}</p>
                  </div>
                </div>
              </div>

              {/* Total News Card */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                    <Newspaper className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t.totalNews}</p>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{news.length}</p>
                  </div>
                </div>
              </div>

              {/* Active Users Card */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t.activeUsers}</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">124</p>
                  </div>
                </div>
              </div>
            </div>

            {/* News by Category and Upcoming Events Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - News Categories and Quick Actions */}
              <div className="lg:col-span-2 space-y-6">
                {/* News by Category */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t.newsCategories.title}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Employee News */}
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t.newsCategories.employeeNews}</p>
                          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {news.filter(item => item.category === "Employee News").length}
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                    </div>

                    {/* Event Announcements */}
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t.newsCategories.eventAnnouncements}</p>
                          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            {news.filter(item => item.category === "Event Announcements").length}
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                      </div>
                    </div>

                    {/* Information Technology */}
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t.newsCategories.itAnnouncements}</p>
                          <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                            {news.filter(item => item.category === "Information Technology").length}
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center">
                          <Monitor className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                        </div>
                      </div>
                    </div>

                    {/* Human Resources */}
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t.newsCategories.humanResources}</p>
                          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                            {news.filter(item => item.category === "Human Resources").length}
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                          <Users2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        </div>
                      </div>
                    </div>

                    {/* Josoor */}
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t.newsCategories.communication}</p>
                          <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">
                            {news.filter(item => item.category === "Josoor").length}
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                        </div>
                      </div>
                    </div>

                    {/* Circulars */}
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t.newsCategories.circulars}</p>
                          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                            {news.filter(item => item.category === "Circulars").length}
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t.quickActions}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button
                      onClick={() => setActiveTab("events")}
                      className="py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg dark:shadow-blue-900/20"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      {t.actions.addEvent}
                    </Button>
                    <Button
                      onClick={() => setActiveTab("news")}
                      className="py-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg dark:shadow-purple-900/20"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      {t.actions.addNews}
                    </Button>
                    <Button
                      onClick={() => setActiveTab("settings")}
                      className="py-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg dark:shadow-green-900/20"
                    >
                      <Settings2 className="w-5 h-5 mr-2" />
                      {t.actions.manageCategories}
                    </Button>
                    <Button
                      onClick={() => setActiveTab("settings")}
                      className="py-6 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white shadow-lg dark:shadow-yellow-900/20"
                    >
                      <Settings className="w-5 h-5 mr-2" />
                      {t.actions.settings}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Column - Upcoming Events */}
              <div className="lg:col-span-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">{t.upcomingEvents}</h3>
                <div className="space-y-6">
                  {events
                    .filter(event => new Date(event.date) > new Date())
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    .slice(0, 3)
                    .map((event, index) => (
                      <div key={event._id} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="min-w-0 space-y-1">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-lg truncate">
                            {language === 'ar' ? event.titleAr : event.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(event.date).toLocaleDateString('en-US')} at {new Date(event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                          </p>
                        </div>
                      </div>
                    ))}
                  {events.filter(event => new Date(event.date) > new Date()).length === 0 && (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-600 dark:text-gray-400 font-medium">{t.noUpcomingEvents}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">{t.scheduleEvent}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      case "events":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t.events}</h2>
              <Button
                onClick={openAddModal}
                className="py-3 px-4 border border-transparent rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.02] relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <div className="relative flex items-center">
                  <Plus className="w-5 h-5 mr-2" />
                  {t.actions.addEvent}
                </div>
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
                </div>
              ) : events.length === 0 ? (
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 p-8 rounded-lg text-center">
                  <p className="text-lg">{t.noEventsFound}</p>
                  <p className="text-sm mt-2">{t.addFirstEvent}</p>
                </div>
              ) : (
                <AnimatePresence>
                  {events.map((event, index) => {
                    console.log('Rendering event:', event);
                    console.log('Current language state:', language);
                    console.log('Title to show:', language === 'ar' ? event.titleAr : event.title);
                    console.log('Description to show:', language === 'ar' ? event.descriptionAr : event.description);
                    
                    return (
                    <motion.div
                      key={event._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 overflow-hidden hover:shadow-2xl transition-shadow duration-200"
                    >
                      <div className="p-6">
                        <div className="space-y-4">
                            <h3 className={`text-xl font-semibold text-gray-900 dark:text-gray-100 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                              {language === 'ar' ? event.titleAr || event.title : event.title}
                          </h3>
                            <p className={`text-gray-600 dark:text-gray-300 line-clamp-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                              {language === 'ar' ? event.descriptionAr || event.description : event.description}
                            </p>
                          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                              <div className={`flex items-center ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'} justify-between text-sm`}>
                                <div className={`flex items-center space-x-4 ${language === 'ar' ? 'space-x-reverse' : ''}`}>
                                  <div className={`flex items-center ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''} space-x-2`}>
                                    <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    <span className="font-medium text-gray-700 dark:text-gray-300">{new Date(event.date).toLocaleDateString('en-US')}</span>
                                </div>
                                  <div className={`flex items-center ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''} space-x-2`}>
                                    <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    <span className="font-medium text-gray-700 dark:text-gray-300">
                                      {new Date(event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                                  <div className={`flex items-center ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''} space-x-2`}>
                                    <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                  <span className="font-medium text-gray-700 dark:text-gray-300">{event.location}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                            <div className={`flex ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'} justify-end space-x-2 ${language === 'ar' ? 'space-x-reverse' : ''} pt-4 border-t border-gray-100 dark:border-gray-700`}>
                            <Button
                              onClick={() => openEditModal(event)}
                              variant="outline"
                              size="sm"
                              className="w-28 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-xs border-gray-200 dark:border-gray-700 dark:text-gray-300"
                            >
                                <Edit className={`w-3.5 h-3.5 ${language === 'ar' ? 'ml-1.5' : 'mr-1.5'}`} />
                              {t.actions.edit}
                            </Button>
                            <Button
                              onClick={() => handleDelete(event._id)}
                              variant="destructive"
                              size="sm"
                              className="w-28 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors text-xs"
                            >
                                <Trash2 className={`w-3.5 h-3.5 ${language === 'ar' ? 'ml-1.5' : 'mr-1.5'}`} />
                              {t.actions.delete}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>
          </div>
        )
      case "news":
        return <NewsManagement />
      case "users":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Users</h2>
            <p className="text-gray-600">User management coming soon...</p>
          </div>
        )
      case "settings":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
            <p className="text-gray-600">Settings panel coming soon...</p>
          </div>
        )
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-xl w-1/4"></div>
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg border border-white/20 dark:border-gray-700/20 lg:hidden"
      >
        <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed top-0 left-0 h-full w-72 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-r border-white/20 dark:border-gray-700/20 shadow-xl z-50 lg:hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Admin Panel
                  </h2>
                  <button
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <nav className="space-y-2">
                  {sidebarItems.map((item, index) => (
                    <motion.button
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        activeTab === item.id
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  ))}
                </nav>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Theme</span>
                      <ThemeToggle />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Language</span>
                      <LanguageToggle />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.div
        initial={{ width: 288 }}
        animate={{ width: isSidebarOpen ? 288 : 96 }}
        className="fixed top-0 left-0 h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-r border-white/20 dark:border-gray-700/20 shadow-xl z-40 hidden lg:block"
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <AnimatePresence mode="wait">
              {isSidebarOpen && (
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 whitespace-nowrap"
                >
                  Admin Panel
                </motion.h2>
              )}
            </AnimatePresence>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
            >
              {isSidebarOpen ? (
                <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
          <nav className="space-y-2 flex-1">
            {sidebarItems.map((item, index) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center ${
                  isSidebarOpen ? "justify-start space-x-3" : "justify-center"
                } px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                }`}
              >
                <item.icon className="w-6 h-6" />
                <AnimatePresence mode="wait">
                  {isSidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="font-medium whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </nav>
          <div className={`mt-auto space-y-3 ${isSidebarOpen ? 'px-2' : 'px-0'}`}>
            <motion.div
              initial={false}
              animate={{ height: isSidebarOpen ? "auto" : "auto" }}
              className="flex flex-col gap-3"
            >
              <div className={`flex items-center ${isSidebarOpen ? 'justify-between px-4' : 'justify-center'} py-3 rounded-xl transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700/50`}>
                {isSidebarOpen && <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Theme</span>}
                <ThemeToggle />
              </div>
              <div className={`flex items-center ${isSidebarOpen ? 'justify-between px-4' : 'justify-center'} py-3 rounded-xl transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700/50`}>
                {isSidebarOpen && <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Language</span>}
                  <LanguageToggle />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div
        className={`min-h-screen transition-all duration-300 ${
          isSidebarOpen ? "lg:pl-72" : "lg:pl-24"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
        </div>
      </div>

      {/* Add Event Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-8 max-w-2xl w-full shadow-2xl border border-white/20 dark:border-gray-700/20"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  {t.modals.addEvent}
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* English Title */}
                <div className="space-y-2">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                      {t.form.title} (English)
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={form.title}
                      onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:placeholder-gray-400"
                    placeholder={t.modals.enterEventTitle}
                  />
                </div>

                  {/* Arabic Title */}
                  <div className="space-y-2">
                    <label
                      htmlFor="titleAr"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      العنوان (بالعربية)
                    </label>
                    <input
                      type="text"
                      id="titleAr"
                      value={form.titleAr}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:placeholder-gray-400 text-right"
                      placeholder="أدخل عنوان الفعالية"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* English Description */}
                <div className="space-y-2">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                      {t.form.description} (English)
                  </label>
                  <textarea
                    id="description"
                    value={form.description}
                      onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:placeholder-gray-400"
                    placeholder={t.modals.enterEventDesc}
                  />
                </div>

                  {/* Arabic Description */}
                  <div className="space-y-2">
                    <label
                      htmlFor="descriptionAr"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      الوصف (بالعربية)
                    </label>
                    <textarea
                      id="descriptionAr"
                      value={form.descriptionAr}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:placeholder-gray-400 text-right"
                      placeholder="أدخل وصف الفعالية"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      {t.form.date}
                    </label>
                    <input
                      type="date"
                      id="date"
                      value={form.date}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="time"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      {t.form.time}
                    </label>
                    <input
                      type="time"
                      id="time"
                      value={form.time}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {t.form.location}
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={form.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:placeholder-gray-400"
                    placeholder={t.modals.enterEventLocation}
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddModal(false)}
                    className="px-6 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    {t.actions.cancel}
                  </Button>
                  <Button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.02] relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <div className="relative flex items-center">
                      <Plus className="w-4 h-4 mr-2" />
                      {t.actions.addEvent}
                    </div>
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Event Modal */}
      <AnimatePresence>
        {showEditModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-8 max-w-2xl w-full shadow-2xl border border-white/20 dark:border-gray-700/20"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  {t.modals.editEvent}
                </h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* English Title */}
                <div className="space-y-2">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                      {t.form.title} (English)
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={form.title}
                      onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:placeholder-gray-400"
                    placeholder={t.modals.enterEventTitle}
                  />
                </div>

                  {/* Arabic Title */}
                  <div className="space-y-2">
                    <label
                      htmlFor="titleAr"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      العنوان (بالعربية)
                    </label>
                    <input
                      type="text"
                      id="titleAr"
                      value={form.titleAr}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:placeholder-gray-400 text-right"
                      placeholder="أدخل عنوان الفعالية"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* English Description */}
                <div className="space-y-2">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                      {t.form.description} (English)
                  </label>
                  <textarea
                    id="description"
                    value={form.description}
                      onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:placeholder-gray-400"
                    placeholder={t.modals.enterEventDesc}
                  />
                </div>

                  {/* Arabic Description */}
                  <div className="space-y-2">
                    <label
                      htmlFor="descriptionAr"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      الوصف (بالعربية)
                    </label>
                    <textarea
                      id="descriptionAr"
                      value={form.descriptionAr}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:placeholder-gray-400 text-right"
                      placeholder="أدخل وصف الفعالية"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      {t.form.date}
                    </label>
                    <input
                      type="date"
                      id="date"
                      value={form.date}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="time"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      {t.form.time}
                    </label>
                    <input
                      type="time"
                      id="time"
                      value={form.time}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {t.form.location}
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={form.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:placeholder-gray-400"
                    placeholder={t.modals.enterEventLocation}
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowEditModal(false)}
                    className="px-6 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    {t.actions.cancel}
                  </Button>
                  <Button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.02] relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <div className="relative flex items-center">
                      <Edit className="w-4 h-4 mr-2" />
                      {t.actions.saveChanges}
                    </div>
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 