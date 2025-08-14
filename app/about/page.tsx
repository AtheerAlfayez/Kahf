"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { ScrollReveal } from "@/components/scroll-reveal"
import { HeroSection } from "@/components/hero-section"
import { useTranslation } from "@/contexts/TranslationContext"

export default function AboutPage() {
  const { getNestedTranslation, language } = useTranslation()
  const glance = JSON.parse(getNestedTranslation("aboutPage", "glance"))
  const boardOfTrustees = JSON.parse(getNestedTranslation("aboutPage", "boardOfTrustees"))
  const boardOfDirectors = JSON.parse(getNestedTranslation("aboutPage", "boardOfDirectors"))
  const executiveManagement = JSON.parse(getNestedTranslation("aboutPage", "executiveManagement"))

  return (
    <main className={`min-h-screen ${language === 'ar' ? 'rtl' : ''} dark:bg-gray-900`}>
      <Header />

      {/* Hero Section */}
      <HeroSection
        imageUrl="/hero-img.jpg"
        height="400px"
        showVideo={false}
      />

      {/* Foundation at a Glance */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800 mt-16">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center text-[#003a70] dark:text-[#00b189] mb-8">
              {glance.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 max-w-4xl mx-auto text-center leading-relaxed">
              {glance.description}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Board of Trustees */}
      <section className="py-12 bg-white dark:bg-gray-900" id="board">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center text-[#003a70] dark:text-[#00b189] mb-8">
              {boardOfTrustees.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 max-w-4xl mx-auto text-center leading-relaxed">
              {boardOfTrustees.description}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Board of Directors */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800" id="directors">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center text-[#003a70] dark:text-[#00b189] mb-8">
              {boardOfDirectors.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 max-w-4xl mx-auto text-center mb-12 leading-relaxed">
              {boardOfDirectors.description}
            </p>
          </ScrollReveal>

          {/* Chairman */}
          <ScrollReveal>
            <div className="max-w-xs mx-auto mb-12">
              <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full">
                <div className="aspect-square relative">
                  <Image
                    src="/1.jpg"
                    alt={language === 'ar' ? 'أ.د. خالد محمد العيبان' : 'Prof. Dr. Khalid Mohammed Alaiban'}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-[#003a70] dark:text-[#00b189]">
                    {language === 'ar' ? 'أ.د. خالد محمد العيبان' : 'Prof. Dr. Khalid Mohammed Alaiban'}
                  </h3>
                  <p className="text-[#00b189] dark:text-[#00b189]/80 text-sm">
                    {boardOfDirectors.chairmanTitle}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Board Members */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${language === 'ar' ? 'rtl' : ''}`}>
            {boardMembers.map((member, index) => (
              <ScrollReveal key={member.name} delay={0.1 * index}>
                <div className="max-w-xs mx-auto">
                  <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full">
                    <div className="aspect-square relative">
                      <Image
                        src={member.image || "/member-default.jpg"}
                        alt={language === 'ar' ? member.nameAr : member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-bold text-[#003a70] dark:text-[#00b189]">
                        {language === 'ar' ? member.nameAr : member.name}
                      </h3>
                      <p className="text-[#00b189] dark:text-[#00b189]/80 text-sm">
                        {language === 'ar' ? 
                          (member.roleAr || boardOfDirectors.boardMember) : 
                          (member.role || boardOfDirectors.boardMember)}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Management */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center text-[#003a70] dark:text-[#00b189] mb-2">
              {executiveManagement.title}
            </h2>
            <h3 className="text-xl font-medium text-center text-[#003a70]/80 dark:text-[#00b189]/80 mb-8">
              {executiveManagement.subtitle}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 max-w-4xl mx-auto text-center mb-12 leading-relaxed">
              {executiveManagement.description}
            </p>
            <ExecutiveChart />
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}

// Board members data
const boardMembers = [
  {
    name: "Dr. Raed Abdullah Alhogail",
    nameAr: "د. رائد عبدالله الحقيل",
    image: "/2.jpg",
    role: "Vice Chairman of the Board",
    roleAr: "نائب رئيس مجلس الإدارة"
  },
  {
    name: "Dr. Youssef bin Othman Al-Huzaim",
    nameAr: "د. يوسف بن عثمان الحزيم",
    image: "/3.jpg",
  },
  {
    name: "Mr. Osama Abdullah Elkhereiji",
    nameAr: "أ. أسامة عبدالله الخريجي",
    image: "/4.jpg",
  },
  {
    name: "Mr. Fahd Bin Sulaiman Al-Rajhi",
    nameAr: "أ. فهد بن سليمان الراجحي",
    image: "/5.jpg",
  },
  {
    name: "Mr. Tareq bin Mohammed Alkhoder",
    nameAr: "أ. طارق بن محمد الخضر",
    image: "/6.jpg",
  },
  {
    name: "Mr. Saadallah bin Mohammed Alazem",
    nameAr: "أ. سعدالله بن محمد العازم",
    image: "/7.jpg",
  },
  {
    name: "Mr. Hassan Shakib Aljabri",
    nameAr: "أ. حسن شكيب الجبري",
    image: "/8.jpg",
  },
  {
    name: "Dr. Abdulaziz bin Fahd Alanqari",
    nameAr: "د. عبدالعزيز بن فهد العنقري",
    image: "/9.jpg",
  },
]

// ExecutiveChart component
function ExecutiveChart() {
  const { getNestedTranslation, language } = useTranslation()
  const orgChart = JSON.parse(getNestedTranslation("aboutPage", "executiveManagement")).orgChart

  return (
    <div className="p-4 bg-white dark:bg-gray-900 text-center">
      <div className="flex flex-col items-center space-y-2 relative">
        {/* Main Vertical Line */}
        <div className="absolute w-0.5 bg-gray-400 dark:bg-gray-500 left-1/2 -translate-x-[1px] z-0 hidden md:block" style={{ 
          top: '32px', 
          height: 'calc(100% - 155px)'
        }}></div>

        {/* Top Level - Board of Directors */}
        <div className="relative w-44 z-10">
          <div className="bg-[#003a70] dark:bg-[#003a70] text-white px-3 py-2 rounded-lg shadow">
            {orgChart.boardOfDirectors}
          </div>
        </div>

        {/* Secretariat on right side between Board and CEO */}
        <div className="w-full relative">
          <div className="flex md:justify-end justify-center px-4 -mt-1 md:pr-[150px]">
            {/* Horizontal line to Secretariat */}
            <div className="absolute h-0.5 bg-[#00b189] dark:bg-[#00b189] top-1/2 z-0 hidden md:block" style={{ 
              right: '374px',
              left: 'calc(50% - 1px)',
              transform: 'translateX(1px)'
            }}></div>
            <div className="w-56 relative z-10">
              <div className="bg-[#003a70] dark:bg-[#003a70] text-white px-3 py-2 rounded-lg shadow whitespace-normal">
                {orgChart.secretariat}
              </div>
            </div>
          </div>
        </div>

        {/* CEO Box */}
        <div className="relative w-full -mt-1">
          <div className="flex justify-center">
            <div className="bg-[#003a70] dark:bg-[#003a70] text-white px-3 py-2 rounded-lg shadow w-44 relative z-10">
              {orgChart.ceo}
            </div>
          </div>
        </div>

        {/* Internal Auditor */}
        <div className="w-full relative">
          <div className="flex md:justify-start justify-center px-4 -mt-1 mb-2 md:pl-[150px]">
            {/* Horizontal line to Internal Auditor */}
            <div className="absolute h-0.5 bg-[#00b189] dark:bg-[#00b189] top-1/2 z-0 hidden md:block" style={{ 
              left: '326px',
              right: 'calc(50% - 1px)',
              transform: 'translateX(1px)'
            }}></div>
            <div className="w-44 relative z-10">
              <div className="bg-[#003a70] dark:bg-[#003a70] text-white px-3 py-2 rounded-lg shadow">
                {orgChart.internalAuditor}
              </div>
            </div>
          </div>
        </div>

        {/* Departments Section with Border */}
        <div className="w-full max-w-4xl relative z-10 mt-2 px-4 md:px-0">
          {/* Border around departments */}
          <div className="absolute -top-2 -left-2 -right-2 -bottom-2 border-2 border-[#00b189] dark:border-[#00b189] rounded-lg"></div>
          
          {/* First row - 4 departments */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
            <div className="bg-[#003a70] dark:bg-[#003a70] text-white px-3 py-2 rounded-lg shadow">
              {orgChart.humanitarianPrograms}
            </div>
            <div className="bg-[#003a70] dark:bg-[#003a70] text-white px-3 py-2 rounded-lg shadow">
              {orgChart.legalSector}
            </div>
            <div className="bg-[#003a70] dark:bg-[#003a70] text-white px-3 py-2 rounded-lg shadow">
              {orgChart.humanResources}
            </div>
            <div className="bg-[#003a70] dark:bg-[#003a70] text-white px-3 py-2 rounded-lg shadow">
              {orgChart.engineeringAffairs}
            </div>
          </div>
          
          {/* Second row - 3 centered departments */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="bg-[#003a70] dark:bg-[#003a70] text-white px-3 py-2 rounded-lg shadow">
              {orgChart.administrativeFinancial}
            </div>
            <div className="bg-[#003a70] dark:bg-[#003a70] text-white px-3 py-2 rounded-lg shadow sm:col-span-2 lg:col-span-1">
              {orgChart.corporateCommunications}
            </div>
            <div className="bg-[#003a70] dark:bg-[#003a70] text-white px-3 py-2 rounded-lg shadow sm:col-start-1 sm:col-span-2 lg:col-start-auto lg:col-span-1">
              {orgChart.investment}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
