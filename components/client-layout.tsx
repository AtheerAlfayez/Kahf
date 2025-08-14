"use client"

import { useTranslation } from "@/contexts/TranslationContext"
import { Toaster } from "sonner"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { language } = useTranslation()

  return (
    <div className={`${language === 'ar' ? 'font-rb' : 'font-segoe'} font-bold`}>
      {children}
      <Toaster />
    </div>
  )
} 