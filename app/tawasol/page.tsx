"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ClipboardList, Bell, Briefcase, Search, Calendar, Filter, X } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { useNews } from "@/contexts/NewsContext"
import type { NewsItem } from "@/contexts/NewsContext"
import { useTranslation } from "@/contexts/TranslationContext"

export default function TawasolPage() {
  const { news, isLoading, error } = useNews()
  const { language } = useTranslation()
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Filter out Guidance Announcements and HR Announcements from categories
  const categories = Array.from(new Set(news.map(item => item.category))).filter(
    c => c !== 'Guidance Announcements' && c !== 'HR Announcements'
  );

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case "Employee News": return language === 'ar' ? 'أخبار الموظفين' : 'Employee News'
      case "Event Announcements": return language === 'ar' ? 'إعلانات الفعاليات' : 'Event Announcements'
      case "Information Technology": return language === 'ar' ? 'تكنولوجيا المعلومات' : 'Information Technology'
      case "Human Resources": return language === 'ar' ? 'الموارد البشرية' : 'Human Resources'
      case "Josoor": return language === 'ar' ? 'جسور للتواصل الداخلي' : 'Josoor'
      case "Circulars": return language === 'ar' ? 'التعاميم' : 'Circulars'
      default: return category
    }
  }

  useEffect(() => {
    setFilteredNews(news)
  }, [news])

  useEffect(() => {
    filterNews()
  }, [searchTerm, dateFrom, dateTo])

  const filterNews = () => {
    let filtered = [...news]

    // Search by title and Arabic title
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.translations?.ar?.title?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by date range
    if (dateFrom) {
      filtered = filtered.filter((item) => new Date(item.date) >= new Date(dateFrom))
    }
    if (dateTo) {
      filtered = filtered.filter((item) => new Date(item.date) <= new Date(dateTo))
    }

    setFilteredNews(filtered)
  }

  const getNewsByCategory = (category: string) => {
    return filteredNews.filter((item) => item.category === category)
  }

  return (
    <main className={`min-h-screen ${language === 'ar' ? 'rtl' : ''} dark:bg-gray-900`}>
      <Header />

      {/* Hero Section with Dashboard Overlay */}
      <section className="relative">
        {/* Hero Background */}
        <div className="relative h-[600px] w-full">
          <Image src="/hero-img.jpg" alt="Tawasol Portal" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>

          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              {/* Dashboard Cards Column - Left Side */}
              <div className={`max-w-[280px] space-y-3 ${language === 'ar' ? 'mr-4 md:mr-8' : 'ml-4 md:ml-8'}`}>
                {/* User Welcome Card */}
                <Card className="p-3 flex items-center gap-3 bg-background/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <Image
                      src="/avatar-default.png"
                      alt={language === 'ar' ? 'المستخدم' : 'User'}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{language === 'ar' ? 'مرحباً بعودتك،' : 'Welcome back,'}</p>
                    <h3 className="font-medium text-[#003a70] dark:text-[#00b189] text-sm">
                      {language === 'ar' ? 'أتَـيْـر الفايز' : 'Atheer Alfayez'}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {language === 'ar' ? 'آخر تسجيل دخول: قبل ساعتين' : 'Last login: 2 hours ago'}
                    </p>
                  </div>
                </Card>

                {/* My Tasks */}
                <Card className="p-3 flex items-center justify-between bg-background/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#003a70]/10 dark:bg-[#003a70]/20 flex items-center justify-center">
                      <ClipboardList className="w-3.5 h-3.5 text-[#003a70] dark:text-[#00b189]" />
                    </div>
                    <span className="text-xs text-gray-700 dark:text-gray-300">{language === 'ar' ? 'مهامي' : 'My Tasks'}</span>
                  </div>
                  <span className="text-base font-bold text-[#003a70] dark:text-[#00b189]">12</span>
                </Card>

                {/* Active Requests */}
                <Card className="p-3 flex items-center justify-between bg-background/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg mb-10">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#00b189]/10 dark:bg-[#00b189]/20 flex items-center justify-center">
                      <Bell className="w-3.5 h-3.5 text-[#00b189] dark:text-[#00b189]" />
                    </div>
                    <span className="text-xs text-gray-700 dark:text-gray-300">{language === 'ar' ? 'الطلبات النشطة' : 'Active Requests'}</span>
                  </div>
                  <span className="text-base font-bold text-[#003a70] dark:text-[#00b189]">5</span>
                </Card>

                {/* Attendance */}
                <Link href="/attendance">
                  <Card className="p-3 flex items-center justify-between bg-background/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow cursor-pointer mt-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#00b189]/10 dark:bg-[#00b189]/20 flex items-center justify-center">
                        <Briefcase className="w-3.5 h-3.5 text-[#00b189] dark:text-[#00b189]" />
                      </div>
                      <span className="text-xs text-gray-700 dark:text-gray-300">{language === 'ar' ? 'الحضور' : 'Attendance'}</span>
                    </div>
                    <span className="text-base font-bold text-[#003a70] dark:text-[#00b189]">92%</span>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-8 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[280px,1fr] gap-8">
            {/* Filters Sidebar - Fixed */}
            <ScrollReveal direction={language === 'ar' ? 'right' : 'left'}>
              <div className="md:sticky md:top-24">
                <Card className="p-4 bg-background dark:bg-gray-800 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-[#003a70] dark:text-[#00b189] flex items-center">
                      <Filter className="w-4 h-4 mr-2" />
                      {language === 'ar' ? 'التصفية' : 'Filters'}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {/* Search */}
                    <div>
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <Input
                          placeholder={language === 'ar' ? 'البحث في الأخبار...' : 'Search news...'}
                          className="pl-8"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Date From */}
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {language === 'ar' ? 'من' : 'From'}
                      </label>
                      <div className="relative">
                        <Input
                          type="date"
                          className="pr-8"
                          value={dateFrom}
                          onChange={(e) => setDateFrom(e.target.value)}
                        />
                        <Calendar className="absolute right-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      </div>
                    </div>

                    {/* Date To */}
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {language === 'ar' ? 'إلى' : 'To'}
                      </label>
                      <div className="relative">
                        <Input
                          type="date"
                          className="pr-8"
                          value={dateTo}
                          onChange={(e) => setDateTo(e.target.value)}
                        />
                        <Calendar className="absolute right-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </ScrollReveal>

            {/* News Content */}
            <ScrollReveal direction={language === 'ar' ? 'left' : 'right'}>
              <div className="space-y-8">
                {isLoading ? (
                  <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 p-8 rounded-lg text-center">
                    <p className="text-lg">{language === 'ar' ? 'جاري تحميل الأخبار...' : 'Loading news...'}</p>
                  </div>
                ) : error ? (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-8 rounded-lg text-center">
                    <p className="text-lg">{language === 'ar' ? 'حدث خطأ أثناء تحميل الأخبار' : 'Error loading news'}</p>
                    <p className="text-sm mt-2">{error}</p>
                  </div>
                ) : (
                  <>
                    {/* News Categories */}
                    {categories.map((category) => {
                      const categoryNews = getNewsByCategory(category)
                      if (categoryNews.length > 0) {
                        return (
                          <div key={category} className="bg-background dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                            <div className="bg-[#003a70] dark:bg-[#003a70] text-white p-4">
                              <h2 className="text-xl font-semibold">
                                {getCategoryTitle(category)}
                              </h2>
                            </div>
                            <div className="p-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {categoryNews.map((item) => (
                                  <NewsCard 
                                    key={item._id} 
                                    item={item} 
                                    onViewDetails={() => {
                                      setSelectedNews(item);
                                      setIsModalOpen(true);
                                    }} 
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        )
                      }
                      return null
                    })}

                    {filteredNews.length === 0 && !isLoading && (
                      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 p-8 rounded-lg text-center">
                        <p className="text-lg">
                          {language === 'ar' ? 'لم يتم العثور على أخبار' : 'No news items found'}
                        </p>
                        {(searchTerm || dateFrom || dateTo) && (
                          <p className="text-sm mt-2">
                            {language === 'ar' ? 'حاول تعديل عوامل التصفية' : 'Try adjusting your filters'}
                          </p>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* News Details Modal */}
      {isModalOpen && selectedNews && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {language === 'ar' && selectedNews.translations?.ar?.title 
                    ? selectedNews.translations.ar.title 
                    : selectedNews.title}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsModalOpen(false)}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="h-[60vh] bg-gray-100 dark:bg-gray-700 rounded-lg overflow-auto mb-4">
                <div className="min-h-full w-full">
                  <Image
                    src={selectedNews.image || "/news-default.jpg"}
                    alt={language === 'ar' && selectedNews.translations?.ar?.title 
                      ? selectedNews.translations.ar.title 
                      : selectedNews.title}
                    width={800}
                    height={800}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <p>{new Date(selectedNews.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                  <p className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                    {selectedNews.category}
                  </p>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {language === 'ar' && selectedNews.translations?.ar?.content 
                      ? selectedNews.translations.ar.content 
                      : selectedNews.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}

// News Card Component
function NewsCard({ item, onViewDetails }: { item: NewsItem; onViewDetails: () => void }) {
  const { language } = useTranslation()
  
  const displayTitle = language === 'ar' && item.translations?.ar?.title 
    ? item.translations.ar.title 
    : item.title
    
  const displayContent = language === 'ar' && item.translations?.ar?.content 
    ? item.translations.ar.content 
    : item.content
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer" onClick={onViewDetails}>
      <div className="relative h-48">
        <Image src={item.image} alt={displayTitle} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-[#003a70] dark:text-[#00b189] mb-2">{displayTitle}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{displayContent}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-[#00b189] dark:text-[#00b189]">{item.category}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(item.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>
    </Card>
  )
}
