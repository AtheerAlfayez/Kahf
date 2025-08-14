"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { LanguageToggle } from "@/components/ui/language-toggle"
import { useTranslation } from "@/contexts/TranslationContext"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t, getNestedTranslation, language } = useTranslation()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-md shadow-md py-2" 
          : "bg-background py-4"
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 xl:px-10 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group transition-transform hover:scale-105">
          <Image
            src="/logo.png"
            alt="King Abdullah Humanitarian Foundation"
            width={80}
            height={80}
            className="h-16 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-12 2xl:gap-16">
          <Link href="/about" className="text-foreground/80 hover:text-foreground transition-colors">
            {t("about")}
          </Link>

          <Link href="/e-services" className="text-foreground/80 hover:text-foreground transition-colors">
            {t("eServices")}
          </Link>

          <Link href="/tawasol" className="text-foreground/80 hover:text-foreground transition-colors">
            {t("tawasol")}
          </Link>

          <a href="https://www.kahf.org.sa" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-foreground transition-colors">
            {language === 'ar' ? 'كهف' : 'Kahf'}
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-2">
            <ThemeToggle />
            <LanguageToggle />
          </div>

          <Link href="/contact-list">
            <Button className="border-2 border-[#00b189] bg-transparent hover:bg-[#00b189] text-[#00b189] hover:text-white rounded-3xl hidden lg:flex transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-send mr-2"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
              {t("getInTouch")}
            </Button>
          </Link>

          <Link href="/login" target="_blank" rel="noopener noreferrer">
            <Button className="border-2 border-[#003a70] bg-transparent hover:bg-[#003a70] text-[#003a70] hover:text-white rounded-3xl hidden lg:flex transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-log-in mr-2"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              {t("login")}
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border mt-2 py-4 px-4 shadow-lg">
          <nav className="flex flex-col gap-4">
            <Link
              href="/about"
              className="py-1 text-foreground/80 hover:text-foreground border-b border-border pb-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("about")}
            </Link>

            <Link
              href="/e-services"
              className="py-1 text-foreground/80 hover:text-foreground border-b border-border pb-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("eServices")}
            </Link>

            <Link
              href="/tawasol"
              className="py-1 text-foreground/80 hover:text-foreground border-b border-border pb-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("tawasol")}
            </Link>

            <a
              href="https://www.kahf.org.sa"
              target="_blank"
              rel="noopener noreferrer"
              className="py-1 text-foreground/80 hover:text-foreground border-b border-border pb-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {language === 'ar' ? 'كهف' : 'Kahf'}
            </a>

            <div className="flex items-center gap-4 pt-2 mt-2">
              <ThemeToggle />
              <LanguageToggle />
              <Link href="/contact-list" className="flex-1 md:flex-none" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full md:w-auto border-2 border-[#00b189] bg-transparent hover:bg-[#00b189] text-[#00b189] hover:text-white rounded-3xl transition-colors">
                  {t("getInTouch")}
                </Button>
              </Link>
              <Link href="/login" className="flex-1 md:flex-none" onClick={() => setIsMobileMenuOpen(false)} target="_blank" rel="noopener noreferrer">
                <Button className="w-full md:w-auto border-2 border-[#003a70] bg-transparent hover:bg-[#003a70] text-[#003a70] hover:text-white rounded-3xl transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-log-in mr-2"
                  >
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                  {t("login")}
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
