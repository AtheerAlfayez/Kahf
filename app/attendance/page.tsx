import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { HeroSection } from "@/components/hero-section"
import { ScrollReveal } from "@/components/scroll-reveal"

export default function AttendancePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Header />

      {/* Page Content */}
      <div className="flex-1 container mx-auto py-8 px-4 mt-16">
        <ScrollReveal>
          <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-white/20 dark:border-gray-700/20">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-2">Attendance Record</h1>
              <p className="text-gray-600 dark:text-gray-400">Track your attendance and time records</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900 dark:text-gray-100">Employee</span>
                <span className="text-blue-600 dark:text-blue-400 cursor-pointer flex items-center">
                  Mohammed Al-Saud <ChevronDown className="h-4 w-4 ml-1" />
                </span>
              </div>

              <div className="flex gap-2">
                <div className="relative">
                  <select className="border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 appearance-none pr-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                    <option>4/2025</option>
                    <option>3/2025</option>
                    <option>2/2025</option>
                    <option>1/2025</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 pointer-events-none text-gray-500 dark:text-gray-400" />
                </div>

                <Button className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600">
                  <Search className="h-4 w-4" />
                  SEARCH
                </Button>
              </div>

              <div className="text-right">
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Late Hours:</div>
                <div className="font-bold text-red-600 dark:text-red-400 text-xl">3.5</div>
              </div>
            </div>

            {/* Attendance Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/50">
                    <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-900 dark:text-gray-100">Day</th>
                    <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-900 dark:text-gray-100">Date</th>
                    <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-900 dark:text-gray-100">Time In</th>
                    <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-900 dark:text-gray-100">Time Out</th>
                    <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-900 dark:text-gray-100">Number Of Hours</th>
                    <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-900 dark:text-gray-100">Late Hours</th>
                    <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-900 dark:text-gray-100">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.map((record, index) => (
                    <tr
                      key={index}
                      className={
                        record.isWeekend
                          ? "bg-gray-50 dark:bg-gray-700/50"
                          : record.notes === "Missing Finger"
                          ? "bg-red-300/50 dark:bg-red-900/30"
                          : "text-gray-900 dark:text-gray-100"
                      }
                    >
                      <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">{record.day}</td>
                      <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">{record.date}</td>
                      <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">{record.timeIn || ""}</td>
                      <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">{record.timeOut || ""}</td>
                      <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">{record.hours}</td>
                      <td className={`border border-gray-200 dark:border-gray-700 px-4 py-2 ${record.lateHours > 0 ? "text-yellow-600 dark:text-yellow-400 font-bold" : ""}`}>
                        {record.lateHours}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">{record.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </ScrollReveal>
      </div>

      <Footer />
    </main>
  )
}

// Sample attendance data
const attendanceData = [
  {
    day: "Tuesday",
    date: "01/04/2025",
    timeIn: "",
    timeOut: "",
    hours: "0.0",
    lateHours: 0.0,
    notes: "NON WORKING DAY",
    isWeekend: true,
  },
  {
    day: "Wednesday",
    date: "02/04/2025",
    timeIn: "",
    timeOut: "",
    hours: "0.0",
    lateHours: 0.0,
    notes: "NON WORKING DAY",
    isWeekend: true,
  },
  {
    day: "Thursday",
    date: "03/04/2025",
    timeIn: "",
    timeOut: "",
    hours: "0.0",
    lateHours: 0.0,
    notes: "NON WORKING DAY",
    isWeekend: true,
  },
  {
    day: "Friday",
    date: "04/04/2025",
    timeIn: "",
    timeOut: "",
    hours: "0.0",
    lateHours: 0.0,
    notes: "NON WORKING DAY",
    isWeekend: true,
  },
  {
    day: "Saturday",
    date: "05/04/2025",
    timeIn: "",
    timeOut: "",
    hours: "0.0",
    lateHours: 0.0,
    notes: "NON WORKING DAY",
    isWeekend: true,
  },
  {
    day: "Sunday",
    date: "06/04/2025",
    timeIn: "",
    timeOut: "",
    hours: "08.0",
    lateHours: 0.0,
    notes: "Missing Finger",
    issue: true,
  },
  {
    day: "Monday",
    date: "07/04/2025",
    timeIn: "",
    timeOut: "",
    hours: "08.0",
    lateHours: 0.0,
    notes: "Missing Finger",
    issue: true,
  },
  {
    day: "Tuesday",
    date: "08/04/2025",
    timeIn: "",
    timeOut: "",
    hours: "08.0",
    lateHours: 0.0,
    notes: "Missing Finger",
    issue: true,
  },
  {
    day: "Wednesday",
    date: "09/04/2025",
    timeIn: "09:30 AM",
    timeOut: "06:00 PM",
    hours: "08.5",
    lateHours: 1.5,
    notes: "Missing Finger",
    issue: true,
  },
  {
    day: "Thursday",
    date: "10/04/2025",
    timeIn: "09:15 AM",
    timeOut: "06:00 PM",
    hours: "08.75",
    lateHours: 1.25,
    notes: "Missing Finger",
    issue: true,
  },
  {
    day: "Friday",
    date: "11/04/2025",
    timeIn: "",
    timeOut: "",
    hours: "0.0",
    lateHours: 0.0,
    notes: "NON WORKING DAY",
    isWeekend: true,
  },
  {
    day: "Saturday",
    date: "12/04/2025",
    timeIn: "",
    timeOut: "",
    hours: "0.0",
    lateHours: 0.0,
    notes: "NON WORKING DAY",
    isWeekend: true,
  },
  {
    day: "Sunday",
    date: "13/04/2025",
    timeIn: "09:45 AM",
    timeOut: "06:00 PM",
    hours: "08.25",
    lateHours: 0.75,
    notes: "Missing Finger",
    issue: true,
  },
  {
    day: "Monday",
    date: "14/04/2025",
    timeIn: "",
    timeOut: "",
    hours: "08.0",
    lateHours: 0.0,
    notes: "Missing Finger",
    issue: true,
  },
  {
    day: "Tuesday",
    date: "15/04/2025",
    timeIn: "",
    timeOut: "",
    hours: "08.0",
    lateHours: 0.0,
    notes: "Missing Finger",
    issue: true,
  },
]
