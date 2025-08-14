"use client"

import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"
import { useTranslation } from "@/contexts/TranslationContext"

export function Footer() {
  const { getNestedTranslation, language } = useTranslation()
  const socialLinks = JSON.parse(getNestedTranslation("footer", "socialLinks"))

  return (
    <footer className="bg-gradient-to-br from-[#003a70] to-[#002347] text-white py-6">
      <div className="container mx-auto px-4">
        <div className={`flex flex-col md:flex-row justify-between items-center gap-4 ${language === 'ar' ? 'md:flex-row-reverse' : ''}`}>
          <p className="text-sm text-[#00b189]">{getNestedTranslation("footer", "copyright")}</p>

          <div className={`flex gap-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <a href="#" className="text-white hover:text-[#00b189] transition-colors">
              <span className="sr-only">{socialLinks.facebook}</span>
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-white hover:text-[#00b189] transition-colors">
              <span className="sr-only">{socialLinks.twitter}</span>
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-white hover:text-[#00b189] transition-colors">
              <span className="sr-only">{socialLinks.instagram}</span>
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-white hover:text-[#00b189] transition-colors">
              <span className="sr-only">{socialLinks.linkedin}</span>
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-white hover:text-[#00b189] transition-colors">
              <span className="sr-only">{socialLinks.youtube}</span>
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
