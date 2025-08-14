"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface NewsItem {
  _id: string
  title: string
  date: string
  image: string
  category: string
  content: string
  translations?: {
    ar?: {
      title?: string
      content?: string
    }
  }
}

export interface NewNewsItem {
  title: string
  date: string
  image: string
  category: string
  content: string
  translations?: {
    ar?: {
      title?: string
      content?: string
    }
  }
}

interface NewsContextType {
  news: NewsItem[]
  addNews: (news: NewNewsItem) => Promise<void>
  updateNews: (id: string, news: Partial<NewsItem>) => Promise<void>
  deleteNews: (id: string) => Promise<void>
  isLoading: boolean
  error: string | null
}

const NewsContext = createContext<NewsContextType | undefined>(undefined)

export function NewsProvider({ children }: { children: ReactNode }) {
  const [news, setNews] = useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch news on mount
  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch('/api/news')
      if (!response.ok) {
        throw new Error('Failed to fetch news')
      }
      const data = await response.json()
      setNews(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching news:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const addNews = async (newNews: NewNewsItem) => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNews),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to add news')
      }
      
      const addedNews = await response.json()
      setNews(prev => [addedNews, ...prev])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error adding news:', err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const updateNews = async (id: string, updatedNews: Partial<NewsItem>) => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch('/api/news', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: id, ...updatedNews }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update news')
      }
      
      const updated = await response.json()
      setNews(prev => prev.map(item => 
        item._id === updated._id ? updated : item
      ))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error updating news:', err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const deleteNews = async (id: string) => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch(`/api/news?id=${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete news')
      }
      
      setNews(prev => prev.filter(item => item._id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error deleting news:', err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <NewsContext.Provider value={{ news, addNews, updateNews, deleteNews, isLoading, error }}>
      {children}
    </NewsContext.Provider>
  )
}

export function useNews() {
  const context = useContext(NewsContext)
  if (context === undefined) {
    throw new Error("useNews must be used within a NewsProvider")
  }
  return context
} 