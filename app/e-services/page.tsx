"use client"

import React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"
import {
  Home,
  Calendar,
  DollarSign,
  Monitor,
  Building2,
  Users,
  Plane,
  Award,
  Grid3X3,
  ClipboardList,
  Bell,
  Briefcase,
  User,
  Mail,
  Badge,
  FilePlus2,
  CalendarDays,
  Clock,
  Users as UsersIcon,
  BarChart2,
  Layers,
  Paperclip,
} from "lucide-react"
import { useTranslation } from "@/contexts/TranslationContext"
import { useState } from "react"

// Add translation keys for all new/changed text
const translations = {
  en: {
    leaveRequest: "Leave Request",
    requesterInfo: "Requester Information",
    badgeNo: "Badge No",
    requesterFullName: "Requester Full Name",
    requesterDeptName: "Requester Dept Name",
    requesterEmail: "Requester Email",
    requestInfo: "Request Information",
    leaveType: "Leave Type",
    selectLeaveType: "Select leave type",
    replacement: "Replacement",
    replacementPlaceholder: "Type a value",
    reason: "Reason",
    attachment: "Attachment",
    attachFile: "Click here to attach a file",
    submit: "Submit",
    cancel: "Cancel",
    fromDate: "From Date",
    fromTime: "From Time",
    toTime: "To Time",
    noOfHours: "No of Hours",
    actualRejoinTime: "Actual Rejoin Time",
    totalRequests: "Total Requests",
    totalRequestsDesc: "All requests made by the employee during the year",
    annualBalance: "Annual Balance",
    annualBalanceDesc: "Annual leave balance",
    otherLeaves: "Other Leaves",
    otherLeavesDesc: "Other leave types balance",
    leaveTypes: [
      { value: "temporary", label: "Temporary permit leave" },
      { value: "sick", label: "Sick leave" },
      { value: "unpaid", label: "Unpaid leave" },
      { value: "annual", label: "Annual leave" },
      { value: "death1", label: "Death leave (first family)" },
      { value: "death2", label: "Death leave (second family)" },
      { value: "study", label: "Study leave" },
      { value: "maternity", label: "Maternity leave" },
      { value: "business", label: "Business leave" },
      { value: "haj", label: "Haj leave" },
      { value: "birth", label: "Birth leave (Men)" },
      { value: "indemnity", label: "Indemnity leave" },
      { value: "iddah", label: "Iddah leave" },
      { value: "wedding", label: "Wedding leave" },
    ],
    events: {
      subtitle: "Submit your leave request using the form below.",
    },
  },
  ar: {
    leaveRequest: "طلب إجازة",
    requesterInfo: "معلومات مقدم الطلب",
    badgeNo: "رقم الشارة",
    requesterFullName: "اسم مقدم الطلب",
    requesterDeptName: "اسم القسم",
    requesterEmail: "البريد الإلكتروني",
    requestInfo: "معلومات الطلب",
    leaveType: "نوع الإجازة",
    selectLeaveType: "اختر نوع الإجازة",
    replacement: "الموظف البديل",
    replacementPlaceholder: "اكتب قيمة",
    reason: "السبب",
    attachment: "المرفق",
    attachFile: "انقر هنا لإرفاق ملف",
    submit: "إرسال",
    cancel: "إلغاء",
    fromDate: "من تاريخ",
    fromTime: "من وقت",
    toTime: "إلى وقت",
    noOfHours: "عدد الساعات",
    actualRejoinTime: "وقت العودة الفعلي",
    totalRequests: "إجمالي الطلبات",
    totalRequestsDesc: "جميع الطلبات المقدمة خلال السنة",
    annualBalance: "رصيد الإجازة السنوية",
    annualBalanceDesc: "رصيد الإجازة السنوية",
    otherLeaves: "إجازات أخرى",
    otherLeavesDesc: "رصيد أنواع الإجازات الأخرى",
    leaveTypes: [
      { value: "temporary", label: "إجازة تصريح مؤقت" },
      { value: "sick", label: "إجازة مرضية" },
      { value: "unpaid", label: "إجازة بدون راتب" },
      { value: "annual", label: "إجازة سنوية" },
      { value: "death1", label: "إجازة وفاة (الأسرة الأولى)" },
      { value: "death2", label: "إجازة وفاة (الأسرة الثانية)" },
      { value: "study", label: "إجازة دراسية" },
      { value: "maternity", label: "إجازة أمومة" },
      { value: "business", label: "إجازة عمل" },
      { value: "haj", label: "إجازة حج" },
      { value: "birth", label: "إجازة ولادة (للرجال)" },
      { value: "indemnity", label: "إجازة تعويضية" },
      { value: "iddah", label: "إجازة عدة" },
      { value: "wedding", label: "إجازة زواج" },
    ],
    events: {
      subtitle: "قم بإرسال طلب إجازتك باستخدام النموذج أدناه.",
    },
  },
}

export default function EServicesPage() {
  const { language } = useTranslation()
  const [selectedService, setSelectedService] = useState<string>("home")
  // Mocked user/request data
  const requester = {
    badgeNo: "4011",
    fullName: "Atheer Alfayez",
    deptName: "ICT",
    email: "atheer.alfayez@kaif.org.sa"
  }
  const [leaveType, setLeaveType] = useState<string>("")
  const [replacement, setReplacement] = useState("")
  const [reason, setReason] = useState("")
  const [attachment, setAttachment] = useState<File | null>(null)
  const [fromDate, setFromDate] = useState("")
  const [fromTime, setFromTime] = useState("")
  const [toTime, setToTime] = useState("")
  const [noOfHours, setNoOfHours] = useState("")
  const [actualRejoinTime, setActualRejoinTime] = useState("")
  // Mocked right sidebar data
  const totalRequests = 8
  const annualBalance = 21
  const otherLeaves = 7

  const t = translations[language]

  return (
    <main className={`min-h-screen ${language === 'ar' ? 'rtl' : ''} dark:bg-gray-900`}>
      <Header />

      {/* Hero Section with Dashboard Overlay */}
      <section className="relative">
        {/* Hero Background */}
        <div className="relative h-[600px] w-full">
          <Image src="/hero-img.jpg" alt="E-Services Portal" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>

          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              {/* Dashboard Cards Column - Left Side */}
              <div className={`max-w-[280px] space-y-3 ${language === 'ar' ? 'mr-4 md:mr-8' : 'ml-4 md:ml-8'}`}>
                {/* User Welcome Card */}
                <Card className="p-3 flex items-center gap-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <Image
                      src="/avatar-default.png"
                      alt="User"
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
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {language === 'ar' ? 'آخر تسجيل دخول: قبل ساعتين' : 'Last login: 2 hours ago'}
                    </p>
                  </div>
                </Card>

                {/* My Tasks */}
                <Card className="p-3 flex items-center justify-between bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#003a70]/10 dark:bg-[#003a70]/20 flex items-center justify-center">
                      <ClipboardList className="w-3.5 h-3.5 text-[#003a70] dark:text-[#00b189]" />
                    </div>
                    <span className="text-xs text-gray-700 dark:text-gray-300">{language === 'ar' ? 'مهامي' : 'My Tasks'}</span>
                  </div>
                  <span className="text-base font-bold text-[#003a70] dark:text-[#00b189]">12</span>
                </Card>

                {/* Active Requests */}
                <Card className="p-3 flex items-center justify-between bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg mb-10">
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
                  <Card className="p-3 flex items-center justify-between bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow cursor-pointer mt-3">
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

      {/* Services Section */}
      <section className="py-8 px-4 md:px-8" id="requests">
        <div className="container mx-auto">
          <div className={`grid grid-cols-1 md:grid-cols-5 gap-8 ${language === 'ar' ? 'md:flex-row-reverse' : ''}`}>
            {/* Sidebar */}
            <ScrollReveal direction={language === 'ar' ? 'right' : 'left'}>
              <div className="col-span-1 md:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <h2 className="font-bold text-[#003a70] dark:text-[#00b189]">{language === 'ar' ? 'خدماتي' : 'My Services'}</h2>
                  </div>
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    <ServiceMenuItem icon={<Home />} label={language === 'ar' ? 'الرئيسية' : 'Home'} active={selectedService === 'home'} onClick={() => setSelectedService('home')} />
                    <ServiceMenuItem icon={<Calendar />} label={language === 'ar' ? 'طلب إجازة' : 'Leave Request'} active={selectedService === 'leave'} onClick={() => setSelectedService('leave')} />
                    <ServiceMenuItem icon={<DollarSign />} label={language === 'ar' ? 'طلب مالي' : 'Finance Request'} active={selectedService === 'finance'} onClick={() => setSelectedService('finance')} />
                    <ServiceMenuItem icon={<Monitor />} label={language === 'ar' ? 'طلب تقنية المعلومات' : 'ICT Request'} active={selectedService === 'ict'} onClick={() => setSelectedService('ict')} />
                    <ServiceMenuItem icon={<Building2 />} label={language === 'ar' ? 'الخدمات الحكومية' : 'Government Services'} active={selectedService === 'gov'} onClick={() => setSelectedService('gov')} />
                    <ServiceMenuItem icon={<Users />} label={language === 'ar' ? 'طلب إخلاء طرف' : 'Relieving Request'} active={selectedService === 'relieve'} onClick={() => setSelectedService('relieve')} />
                    <ServiceMenuItem icon={<Plane />} label={language === 'ar' ? 'طلب سفر' : 'Travel Request'} active={selectedService === 'travel'} onClick={() => setSelectedService('travel')} />
                    <ServiceMenuItem icon={<Award />} label={language === 'ar' ? 'طلب شهادة' : 'Certificate Request'} active={selectedService === 'cert'} onClick={() => setSelectedService('cert')} />
                    <ServiceMenuItem icon={<Grid3X3 />} label={language === 'ar' ? 'خدمات أخرى' : 'Other Services'} active={selectedService === 'other'} onClick={() => setSelectedService('other')} />
                  </div>
                </div>
              </div>
            </ScrollReveal>
            {/* Main Content */}
            {/* Remove ScrollReveal from main area, use a clean card layout */}
            <div
              className={`col-span-1 md:col-span-4 ${selectedService === 'leave' ? 'lg:col-span-3' : ''}`}
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-6 md:p-10 min-h-[500px]">
                {selectedService === 'leave' ? (
                  // No card wrapper, just the form content directly
                  <>
                    {/* Top Header */}
                    <div className="flex flex-col items-center justify-center mb-8">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Calendar className="w-7 h-7 text-[#00b189]" />
                        <h2 className="text-xl md:text-2xl font-extrabold text-[#003a70] dark:text-[#00b189] text-center">
                          {t.leaveRequest}
                        </h2>
                      </div>
                      <div className="text-base md:text-lg text-gray-500 dark:text-gray-300 font-normal text-center mb-4 max-w-xl mx-auto">
                        {t.events?.subtitle || "Submit your leave request using the form below."}
                      </div>
                      <div className="border-t-2 border-[#00b189] w-16 mx-auto mb-8"></div>
                    </div>
                    {/* Requester Information */}
                    <div className="mb-12">
                      <h3 className="font-bold text-lg md:text-xl mb-4 text-[#003a70] dark:text-[#00b189]">{t.requesterInfo}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.badgeNo}</label>
                          <div className="bg-gray-50 dark:bg-gray-800 rounded px-4 py-2 text-sm md:text-base text-gray-900 dark:text-gray-100">{requester.badgeNo}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.requesterFullName}</label>
                          <div className="bg-gray-50 dark:bg-gray-800 rounded px-4 py-2 text-sm md:text-base text-gray-900 dark:text-gray-100">{requester.fullName}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.requesterDeptName}</label>
                          <div className="bg-gray-50 dark:bg-gray-800 rounded px-4 py-2 text-sm md:text-base text-gray-900 dark:text-gray-100">{requester.deptName}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.requesterEmail}</label>
                          <div className="bg-gray-50 dark:bg-gray-800 rounded px-4 py-2 text-sm md:text-base text-gray-900 dark:text-gray-100">{requester.email}</div>
                        </div>
                      </div>
                    </div>
                    <div className="my-8">
                      <div className="border-t border-gray-200 dark:border-gray-700 w-full"></div>
                    </div>
                    {/* Request Information */}
                    <div className="mb-8">
                      <h3 className="font-bold text-lg md:text-xl mb-4 text-[#003a70] dark:text-[#00b189]">{t.requestInfo}</h3>
                      <div className="flex flex-col gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.leaveType}</label>
                          <select value={leaveType} onChange={e => setLeaveType(e.target.value)} className="block w-full border rounded-lg px-4 py-2 text-sm md:text-base focus:ring-2 focus:ring-[#00b189]">
                            <option value="">{t.selectLeaveType}</option>
                            {t.leaveTypes.map(type => (
                              <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                          </select>
                        </div>
                        {leaveType && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.fromDate}</label>
                              <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="w-full border rounded-lg px-4 py-2 text-sm md:text-base focus:ring-2 focus:ring-[#00b189]" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.fromTime}</label>
                              <input type="time" value={fromTime} onChange={e => setFromTime(e.target.value)} className="w-full border rounded-lg px-4 py-2 text-sm md:text-base focus:ring-2 focus:ring-[#00b189]" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.toTime}</label>
                              <input type="time" value={toTime} onChange={e => setToTime(e.target.value)} className="w-full border rounded-lg px-4 py-2 text-sm md:text-base focus:ring-2 focus:ring-[#00b189]" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.noOfHours}</label>
                              <input type="number" value={noOfHours} onChange={e => setNoOfHours(e.target.value)} className="w-full border rounded-lg px-4 py-2 text-sm md:text-base focus:ring-2 focus:ring-[#00b189]" />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.actualRejoinTime}</label>
                              <input type="datetime-local" value={actualRejoinTime} onChange={e => setActualRejoinTime(e.target.value)} className="w-full border rounded-lg px-4 py-2 text-sm md:text-base focus:ring-2 focus:ring-[#00b189]" />
                            </div>
                          </div>
                        )}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.replacement}</label>
                          <input type="text" value={replacement} onChange={e => setReplacement(e.target.value)} placeholder={t.replacementPlaceholder} className="block w-full border-b-2 border-gray-300 focus:border-[#00b189] bg-transparent px-4 py-2 outline-none text-sm md:text-base" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.reason}</label>
                          <textarea
                            value={reason}
                            onChange={e => setReason(e.target.value)}
                            placeholder={t.replacementPlaceholder}
                            className="block w-full border rounded-lg px-4 py-2 text-sm md:text-base focus:ring-2 focus:ring-[#00b189] min-h-[80px] resize-y"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.attachment}</label>
                          <div className="w-full flex flex-col gap-2">
                            <label htmlFor="attachment" className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#f0faff] dark:bg-[#1a2e32] border border-[#b6e6e6] dark:border-[#234b4b] rounded-xl cursor-pointer hover:bg-[#e6f7f7] hover:border-[#00b189] dark:hover:bg-[#234b4b] transition-all font-semibold text-base shadow-sm text-[#003a70] dark:text-[#00b189]">
                              <Paperclip className="w-5 h-5 text-[#00b189]" />
                              <span className="truncate">{t.attachFile}</span>
                            </label>
                            <input type="file" id="attachment" className="hidden" onChange={e => setAttachment(e.target.files?.[0] || null)} />
                            {attachment && (
                              <span className="block w-full mt-1 px-3 py-2 bg-[#e6f7f7] dark:bg-[#234b4b] text-xs md:text-sm text-[#003a70] dark:text-[#00b189] rounded-lg truncate shadow-inner">{attachment.name}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 mt-8">
                      <button type="submit" className="flex-1 px-4 py-2 bg-[#003a70] text-white rounded-lg shadow hover:bg-[#002347] transition-all text-sm md:text-base font-bold">{t.submit}</button>
                      <button type="button" className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition-all text-sm md:text-base font-bold" onClick={() => setSelectedService('home')}>{t.cancel}</button>
                    </div>
                  </>
                ) : (
                  // Home/HR Services content with matching header UI
                  <>
                    <div className="flex flex-col items-center justify-center mb-8">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Home className="w-7 h-7 text-[#00b189]" />
                        <h2 className="text-xl md:text-2xl font-extrabold text-[#003a70] dark:text-[#00b189] text-center">
                  {language === 'ar' ? 'خدمات الموارد البشرية' : 'HR Services'}
                </h2>
                      </div>
                      <div className="text-base md:text-lg text-gray-500 dark:text-gray-300 font-normal text-center mb-4 max-w-xl mx-auto">
                  {language === 'ar' ? 'إدارة طلبات وخدمات الموارد البشرية الخاصة بك' : 'Manage your HR-related requests and services'}
                      </div>
                      <div className="border-t-2 border-[#00b189] w-16 mx-auto mb-8"></div>
                    </div>
                <a
                  href="https://eservices.kaif.org/arabic/Runtime/Form/myportal.form/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-8 max-w-md"
                >
                  <div className="flex items-center gap-4 p-5 rounded-xl shadow-sm transition-colors cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 bg-gray-50 dark:bg-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 flex-shrink-0 text-[#003A70]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2zm0 0V7m0 4v4m0 0c0 1.104-.896 2-2 2s-2-.896-2-2 .896-2 2-2 2 .896 2 2z" />
                    </svg>
                    <div>
                      <div className="text-lg font-bold text-[#003A70]">
                        {language === 'ar' ? 'بوابة خدمات الموارد البشرية' : 'HR Services Portal'}
                      </div>
                      <div className="text-sm opacity-80 text-gray-700 dark:text-gray-300">
                        {language === 'ar' ? 'الدخول إلى جميع خدمات وطلبات الموارد البشرية' : 'Access all HR services and requests'}
                      </div>
                    </div>
                  </div>
                </a>
                  </>
                )}
              </div>
            </div>
            {/* Right Sidebar - Desktop Only */}
            {selectedService === 'leave' && (
              <ScrollReveal direction={language === 'ar' ? 'left' : 'right'}>
                <div className="hidden lg:flex col-span-1 lg:col-span-1 flex-col gap-6 items-start">
                  <SidebarStatCard icon={<BarChart2 className="w-7 h-7 text-[#00b189]" />} label={t.totalRequests} value={totalRequests} desc={t.totalRequestsDesc} />
                  <SidebarStatCard icon={<Layers className="w-7 h-7 text-[#003a70]" />} label={t.annualBalance} value={annualBalance} desc={t.annualBalanceDesc} />
                  <SidebarStatCard icon={<UsersIcon className="w-7 h-7 text-[#003a70]" />} label={t.otherLeaves} value={otherLeaves} desc={t.otherLeavesDesc} />
              </div>
            </ScrollReveal>
            )}
          </div>
          
          {/* Stats Boxes - Mobile/Tablet (below main content) */}
          {selectedService === 'leave' && (
            <div className="mt-8 lg:hidden">
              <ScrollReveal direction={language === 'ar' ? 'left' : 'right'}>
                <div className="flex flex-col gap-6 items-center">
                  <SidebarStatCard icon={<BarChart2 className="w-7 h-7 text-[#00b189]" />} label={t.totalRequests} value={totalRequests} desc={t.totalRequestsDesc} />
                  <SidebarStatCard icon={<Layers className="w-7 h-7 text-[#003a70]" />} label={t.annualBalance} value={annualBalance} desc={t.annualBalanceDesc} />
                  <SidebarStatCard icon={<UsersIcon className="w-7 h-7 text-[#003a70]" />} label={t.otherLeaves} value={otherLeaves} desc={t.otherLeavesDesc} />
                </div>
              </ScrollReveal>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

// Service Menu Item Component
function ServiceMenuItem({ icon, label, active = false, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }) {
  const { language } = useTranslation()
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
        active ? `${language === 'ar' ? 'border-r-4' : 'border-l-4'} border-[#003a70] dark:border-[#003a70] bg-gray-50 dark:bg-gray-700` : ""
      }`}
    >
      {/* Set icon color to blue for light, lighter blue for dark mode */}
      {React.isValidElement(icon)
        ? React.cloneElement(icon as React.ReactElement<any>, {
            className: [
              (icon as React.ReactElement<any>).props.className,
              'w-5 h-5 text-[#003a70] dark:text-[#4fc3f7]'
            ].filter(Boolean).join(' ')
          })
        : icon}
      <span className="text-gray-700 dark:text-gray-300">{label}</span>
    </button>
  )
}

// Add SidebarStatCard component at the end of the file
function SidebarStatCard({ icon, label, value, desc }: { icon: React.ReactNode; label: string; value: number; desc: string }) {
  return (
    <div className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 flex flex-col items-center gap-2 border border-gray-100 dark:border-gray-800">
      <div>{icon}</div>
      <div className="text-4xl font-bold text-[#003a70] dark:text-[#00b189]">{value}</div>
      <div className="font-semibold text-lg mb-1 text-gray-700 dark:text-gray-200">{label}</div>
      <div className="text-xs text-gray-500 text-center">{desc}</div>
    </div>
  )
}