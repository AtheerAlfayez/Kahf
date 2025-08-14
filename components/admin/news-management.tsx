"use client"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Pencil, Trash2, Plus, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useNews } from "@/contexts/NewsContext"
import type { NewsItem } from "@/contexts/NewsContext"
import { useTranslation } from "@/contexts/TranslationContext"

// Initial sample news data
const initialNews: NewsItem[] = [
  {
    _id: "1",
    title: "Annual Company Retreat 2024",
    date: "2024-03-15",
    image: "/placeholder.svg",
    category: "Employee News",
    content: "Join us for our annual company retreat in Dubai this summer. We'll be discussing our achievements and planning for the future."
  },
  {
    _id: "2",
    title: "New Health Benefits Package",
    date: "2024-03-20",
    image: "/placeholder.svg",
    category: "HR Announcements",
    content: "We're excited to announce enhanced health benefits for all employees starting next month."
  },
  {
    _id: "3",
    title: "Team Building Workshop",
    date: "2024-03-25",
    image: "/placeholder.svg",
    category: "Event Announcements",
    content: "Get ready for an exciting team building workshop. Activities include leadership exercises and team challenges."
  }
];

const defaultNews = [
  {
    _id: "1",
    title: "Foundation Launches New Initiative",
    date: "2024-01-15",
    image: "/news-default.jpg",
    category: "Employee News",
    content: "The foundation is launching a new initiative to help communities in need..."
  },
  {
    _id: "2",
    title: "Upcoming Charity Event",
    date: "2024-01-20",
    image: "/news-default.jpg",
    category: "Event Announcements",
    content: "Join us for our upcoming charity event where we'll be raising funds for..."
  },
  {
    _id: "3",
    title: "New Guidelines Released",
    date: "2024-01-25",
    image: "/news-default.jpg",
    category: "Guidance",
    content: "We've updated our guidelines to better serve our communities..."
  }
]

export function NewsManagement() {
  const { getNestedTranslation, language } = useTranslation()
  const { news: newsItems, addNews, updateNews, deleteNews, isLoading, error } = useNews()
  const [isEditing, setIsEditing] = useState(false)
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState<NewsItem>({
    _id: "",
    title: "",
    date: "",
    image: "",
    category: "",
    content: "",
    translations: {
      ar: {
        title: "",
        content: ""
      }
    }
  })

  // Get translations
  const t = {
    news: getNestedTranslation("admin", "news"),
    form: JSON.parse(getNestedTranslation("admin", "form")),
    actions: JSON.parse(getNestedTranslation("admin", "actions")),
    newsCategories: JSON.parse(getNestedTranslation("admin", "newsCategories")),
    confirmDelete: getNestedTranslation("admin", "confirmDelete"),
    noNewsFound: getNestedTranslation("admin", "noNewsFound"),
    addFirstNews: getNestedTranslation("admin", "addFirstNews"),
    modals: JSON.parse(getNestedTranslation("admin", "modals"))
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        // Create FormData and append the file
        const imageFormData = new FormData()
        imageFormData.append("file", file)

        // Upload the file
        const response = await fetch("/api/upload", {
          method: "POST",
          body: imageFormData,
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || "Failed to upload image")
        }

        const data = await response.json()
        
        // Set the returned URL as the image in the form
        setFormData(prevData => ({ ...prevData, image: data.url }))
        setImagePreview(data.url)
        toast.success("Image uploaded successfully")
      } catch (err) {
        console.error("Error uploading image:", err)
        toast.error(err instanceof Error ? err.message : "Failed to upload image")
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Client-side validation for required fields
    if (!formData.title || !formData.date || !formData.image || !formData.category || !formData.content || !formData.translations?.ar?.title || !formData.translations?.ar?.content) {
      toast.error('Please fill in all required fields.')
      return
    }
    try {
      if (editingNews) {
        await updateNews(editingNews._id, formData)
        toast.success("News updated successfully")
      } else {
        await addNews({
          title: formData.title,
          date: formData.date,
          image: formData.image,
          category: formData.category,
          content: formData.content,
          translations: formData.translations
        })
        toast.success("News added successfully")
      }
      resetForm()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An error occurred")
    }
  }

  const handleEdit = (news: NewsItem) => {
    setIsEditing(true)
    setEditingNews(news)
    setImagePreview(news.image)
    setFormData({
      ...news,
      date: new Date(news.date).toISOString().split("T")[0],
      translations: {
        ar: {
          title: news.translations?.ar?.title ?? "",
          content: news.translations?.ar?.content ?? ""
        }
      }
    })
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this news item?")) return
    try {
      await deleteNews(id)
      toast.success("News deleted successfully")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An error occurred")
    }
  }

  const resetForm = () => {
    setIsEditing(false)
    setEditingNews(null)
    setImagePreview("")
    setFormData({
      _id: "",
      title: "",
      date: "",
      image: "",
      category: "",
      content: "",
      translations: {
        ar: {
          title: "",
          content: ""
        }
      }
    })
  }

  return (
    <div className={`space-y-6 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t.news}</h2>
        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            className="py-3 px-4 border border-transparent rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.02] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <div className="relative flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              {t.actions.addNews}
            </div>
          </Button>
        )}
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 max-w-xl w-full shadow-2xl border border-white/20 dark:border-gray-700/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                {editingNews ? t.modals.editNews : t.modals.addNews}
              </h2>
              <button
                onClick={() => {
                  setIsEditing(false)
                  setEditingNews(null)
                  setImagePreview("")
                  setFormData({
                    _id: "",
                    title: "",
                    date: "",
                    image: "",
                    category: "",
                    content: "",
                    translations: {
                      ar: {
                        title: "",
                        content: ""
                      }
                    }
                  })
                }}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* English Fields */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="title" className="text-gray-700 dark:text-gray-300">
                      {language === 'ar' ? 'عنوان' : 'Title'} (English)
                    </Label>
                    <Input
                      type="text"
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      placeholder={t.modals.enterNewsTitle}
                      className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="content" className="text-gray-700 dark:text-gray-300">
                      {language === 'ar' ? 'محتوى' : 'Content'} (English)
                    </Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      required
                      placeholder={t.modals.enterNewsDesc}
                      className="min-h-[100px] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                  </div>
                </div>

                {/* Arabic Fields */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="arTitle" className="text-gray-700 dark:text-gray-300">العنوان (بالعربية)</Label>
                    <Input
                      type="text"
                      id="arTitle"
                      value={formData.translations?.ar?.title || ""}
                      onChange={(e) => setFormData({
                        ...formData,
                        translations: {
                          ...formData.translations,
                          ar: {
                            ...formData.translations?.ar,
                            title: e.target.value
                          }
                        }
                      })}
                      required
                      placeholder="أدخل عنوان الخبر"
                      className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400"
                      dir="rtl"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="arContent" className="text-gray-700 dark:text-gray-300">المحتوى (بالعربية)</Label>
                    <Textarea
                      id="arContent"
                      value={formData.translations?.ar?.content || ""}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({
                        ...formData,
                        translations: {
                          ...formData.translations,
                          ar: {
                            title: formData.translations?.ar?.title || "",
                            content: e.target.value
                          }
                        }
                      })}
                      required
                      placeholder="أدخل وصف الخبر"
                      className="min-h-[100px] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400"
                      dir="rtl"
                    />
                  </div>
                </div>
              </div>

              {/* Rest of the form fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="category" className="text-gray-700 dark:text-gray-300">{t.form.category}</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                    required
                  >
                    <SelectTrigger id="category" className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600">
                      <SelectValue placeholder={t.form.selectCategory} />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                      <SelectItem value="Employee News" className="text-gray-900 dark:text-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700">{t.newsCategories.employeeNews}</SelectItem>
                      <SelectItem value="Event Announcements" className="text-gray-900 dark:text-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700">{t.newsCategories.eventAnnouncements}</SelectItem>
                      <SelectItem value="Information Technology" className="text-gray-900 dark:text-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700">{t.newsCategories.itAnnouncements}</SelectItem>
                      <SelectItem value="Human Resources" className="text-gray-900 dark:text-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700">{t.newsCategories.humanResources}</SelectItem>
                      <SelectItem value="Josoor" className="text-gray-900 dark:text-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700">{t.newsCategories.communication}</SelectItem>
                      <SelectItem value="Circulars" className="text-gray-900 dark:text-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700">{t.newsCategories.circulars}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="date" className="text-gray-700 dark:text-gray-300">{t.form.date}</Label>
                  <Input
                    type="date"
                    id="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400"
                  />
                </div>
              </div>

              {/* Image upload section */}
              <div className="space-y-1.5">
                <Label htmlFor="image" className="text-gray-700 dark:text-gray-300">{t.form.image}</Label>
                <Input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
              </div>

              {/* Action buttons */}
              <div className="flex justify-end gap-2 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  className="border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  {t.actions.cancel}
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  {editingNews ? (
                    <>
                      <Pencil className="w-4 h-4 mr-2" />
                      {t.actions.saveChanges}
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      {t.actions.addNews}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* News Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <div className="col-span-2 flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
          </div>
        ) : newsItems.length === 0 ? (
          <div className="col-span-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 p-8 rounded-lg text-center">
            <p className="text-lg">{t.noNewsFound}</p>
            <p className="text-sm mt-2">{t.addFirstNews}</p>
          </div>
        ) : (
          <AnimatePresence>
            {newsItems.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 overflow-hidden hover:shadow-2xl transition-shadow duration-200"
              >
                {/* Image at the top */}
                <div className="aspect-video bg-gray-100 dark:bg-gray-700 overflow-hidden">
                  <img
                    src={item.image || "/news-default.jpg"}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Title and Meta */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {language === 'ar' && item.translations?.ar?.title 
                        ? item.translations.ar.title 
                        : item.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <p>{new Date(item.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</p>
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">{item.category}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                    {language === 'ar' && item.translations?.ar?.content 
                      ? item.translations.ar.content 
                      : item.content}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(item)}
                      className="flex-1 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border-gray-200 dark:border-gray-700 dark:text-gray-300"
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      {t.actions.edit}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(item._id)}
                      className="flex-1 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      {t.actions.delete}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
} 