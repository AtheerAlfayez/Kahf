import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import { NewsProvider } from "@/contexts/NewsContext"
import { TranslationProvider } from "@/contexts/TranslationContext"
import { ClientLayout } from "@/components/client-layout"

export const metadata: Metadata = {
  title: "Humanitarian Foundation",
  description: "Empowering communities through humanitarian aid and support",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="font-segoe">
      <head />
      <body className="font-bold">
        <NewsProvider>
          <TranslationProvider>
            <ThemeProvider>
              <ClientLayout>{children}</ClientLayout>
            </ThemeProvider>
          </TranslationProvider>
        </NewsProvider>
      </body>
    </html>
  )
}
