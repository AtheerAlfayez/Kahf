"use client"

import { useState, useMemo } from "react"
import { useTheme } from "next-themes"

const employees = [
  {
    id: "053000001",
    name: "Fahad AlShammari",
    role: "Product Owner - Marketing",
    email: "f.alshammari@kahf.org",
    initials: "FA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000002",
    name: "Atheer AlSubaie",
    role: "Marketing Lead - IT Department",
    email: "a.alsubaie@kahf.org",
    initials: "AA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000003",
    name: "Fahad AlHarbi",
    role: "Backend Developer - Infrastructure",
    email: "f.alharbi@kahf.org",
    initials: "FA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000004",
    name: "Yousef AlFayez",
    role: "Marketing Lead - Projects Office",
    email: "y.alfayez@kahf.org",
    initials: "YA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000005",
    name: "Rania AlFayez",
    role: "Backend Developer - IT Department",
    email: "r.alfayez@kahf.org",
    initials: "RA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000006",
    name: "Atheer AlOtaibi",
    role: "Marketing Lead - Projects Office",
    email: "a.alotaibi@kahf.org",
    initials: "AA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000007",
    name: "Mansour AlSubaie",
    role: "Backend Developer - HR Department",
    email: "m.alsubaie@kahf.org",
    initials: "MA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000008",
    name: "Huda AlQahtani",
    role: "Marketing Lead - HR Department",
    email: "h.alqahtani@kahf.org",
    initials: "HA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000009",
    name: "Atheer AlQahtani",
    role: "UX Designer - Analytics",
    email: "a.alqahtani@kahf.org",
    initials: "AA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000010",
    name: "Yousef AlSubaie",
    role: "UX Designer - Design Unit",
    email: "y.alsubaie@kahf.org",
    initials: "YA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000011",
    name: "Layla AlHarbi",
    role: "UX Designer - Analytics",
    email: "l.alharbi@kahf.org",
    initials: "LA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000012",
    name: "Mansour AlZahrani",
    role: "HR Manager - Projects Office",
    email: "m.alzahrani@kahf.org",
    initials: "MA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000013",
    name: "Huda AlMutairi",
    role: "Network Engineer - Projects Office",
    email: "h.almutairi@kahf.org",
    initials: "HA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000014",
    name: "Huda AlFayez",
    role: "HR Manager - Projects Office",
    email: "h.alfayez@kahf.org",
    initials: "HA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000015",
    name: "Yousef AlGhamdi",
    role: "HR Manager - Infrastructure",
    email: "y.alghamdi@kahf.org",
    initials: "YA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000016",
    name: "Khalid AlSubaie",
    role: "Project Manager - Projects Office",
    email: "k.alsubaie@kahf.org",
    initials: "KA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000017",
    name: "Yousef AlAnazi",
    role: "Marketing Lead - HR Department",
    email: "y.alanazi@kahf.org",
    initials: "YA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000018",
    name: "Noura AlMutairi",
    role: "Network Engineer - IT Department",
    email: "n.almutairi@kahf.org",
    initials: "NA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000019",
    name: "Mansour AlQahtani",
    role: "Data Analyst - Infrastructure",
    email: "m.alqahtani@kahf.org",
    initials: "MA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000020",
    name: "Noura AlFayez",
    role: "Project Manager - Analytics",
    email: "n.alfayez@kahf.org",
    initials: "NA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000021",
    name: "Mansour AlSubaie",
    role: "Network Engineer - Analytics",
    email: "m.alsubaie@kahf.org",
    initials: "MA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000022",
    name: "Fahad AlFayez",
    role: "Product Owner - IT Department",
    email: "f.alfayez@kahf.org",
    initials: "FA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000023",
    name: "Sultan AlAnazi",
    role: "Project Manager - IT Department",
    email: "s.alanazi@kahf.org",
    initials: "SA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000024",
    name: "Khalid AlAnazi",
    role: "Frontend Developer - HR Department",
    email: "k.alanazi@kahf.org",
    initials: "KA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000025",
    name: "Huda AlHarbi",
    role: "Frontend Developer - Projects Office",
    email: "h.alharbi@kahf.org",
    initials: "HA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000026",
    name: "Fahad AlGhamdi",
    role: "Project Manager - Projects Office",
    email: "f.alghamdi@kahf.org",
    initials: "FA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000027",
    name: "Yousef AlShammari",
    role: "Marketing Lead - Marketing",
    email: "y.alshammari@kahf.org",
    initials: "YA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000028",
    name: "Rania AlSubaie",
    role: "Network Engineer - Analytics",
    email: "r.alsubaie@kahf.org",
    initials: "RA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000029",
    name: "Noura AlSubaie",
    role: "HR Manager - Analytics",
    email: "n.alsubaie@kahf.org",
    initials: "NA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000030",
    name: "Fahad AlAnazi",
    role: "Network Engineer - IT Department",
    email: "f.alanazi@kahf.org",
    initials: "FA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000031",
    name: "Fahad AlZahrani",
    role: "Support Engineer - Marketing",
    email: "f.alzahrani@kahf.org",
    initials: "FA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000032",
    name: "Atheer AlOtaibi",
    role: "Product Owner - Design Unit",
    email: "a.alotaibi@kahf.org",
    initials: "AA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000033",
    name: "Huda AlGhamdi",
    role: "Lead Developer - Marketing",
    email: "h.alghamdi@kahf.org",
    initials: "HA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000034",
    name: "Yousef AlAnazi",
    role: "Lead Developer - Projects Office",
    email: "y.alanazi@kahf.org",
    initials: "YA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000035",
    name: "Khalid AlGhamdi",
    role: "Data Analyst - Analytics",
    email: "k.alghamdi@kahf.org",
    initials: "KA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000036",
    name: "Huda AlHarbi",
    role: "Lead Developer - Projects Office",
    email: "h.alharbi@kahf.org",
    initials: "HA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000037",
    name: "Huda AlShammari",
    role: "Product Owner - Marketing",
    email: "h.alshammari@kahf.org",
    initials: "HA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000038",
    name: "Noura AlOtaibi",
    role: "Product Owner - Infrastructure",
    email: "n.alotaibi@kahf.org",
    initials: "NA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000039",
    name: "Rania AlSubaie",
    role: "Support Engineer - IT Department",
    email: "r.alsubaie@kahf.org",
    initials: "RA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000040",
    name: "Khalid AlFayez",
    role: "Support Engineer - HR Department",
    email: "k.alfayez@kahf.org",
    initials: "KA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000041",
    name: "Mansour AlShammari",
    role: "Backend Developer - Design Unit",
    email: "m.alshammari@kahf.org",
    initials: "MA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000042",
    name: "Fahad AlShammari",
    role: "HR Manager - Analytics",
    email: "f.alshammari@kahf.org",
    initials: "FA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000043",
    name: "Rania AlMutairi",
    role: "Network Engineer - HR Department",
    email: "r.almutairi@kahf.org",
    initials: "RA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000044",
    name: "Khalid AlMutairi",
    role: "Support Engineer - Projects Office",
    email: "k.almutairi@kahf.org",
    initials: "KA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000045",
    name: "Rania AlSubaie",
    role: "HR Manager - Analytics",
    email: "r.alsubaie@kahf.org",
    initials: "RA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000046",
    name: "Fahad AlOtaibi",
    role: "Marketing Lead - Marketing",
    email: "f.alotaibi@kahf.org",
    initials: "FA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000047",
    name: "Khalid AlQahtani",
    role: "Project Manager - Analytics",
    email: "k.alqahtani@kahf.org",
    initials: "KA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000048",
    name: "Fahad AlOtaibi",
    role: "Backend Developer - Infrastructure",
    email: "f.alotaibi@kahf.org",
    initials: "FA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000049",
    name: "Layla AlSubaie",
    role: "UX Designer - Projects Office",
    email: "l.alsubaie@kahf.org",
    initials: "LA",
    color: "bg-gray-200 text-gray-700",
  },
  {
    id: "053000050",
    name: "Rania AlShammari",
    role: "Network Engineer - Design Unit",
    email: "r.alshammari@kahf.org",
    initials: "RA",
    color: "bg-gray-200 text-gray-700",
  },
]

export default function ContactList() {
  const [searchTerm, setSearchTerm] = useState("")
  const { theme } = useTheme()

  const filteredEmployees = useMemo(() => {
    if (!searchTerm) return employees

    return employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [searchTerm])

  const clearSearch = () => {
    setSearchTerm("")
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${theme === 'dark' ? 'dark bg-gray-900 text-gray-100' : ''}`}>
      {/* Search Bar */}
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by name, ID, role, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-700 rounded-lg leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900 dark:text-gray-100"
              />
              {searchTerm && (
                <button onClick={clearSearch} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg
                    className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Search Results Info */}
      {searchTerm && (
        <div className="bg-blue-50 border-b border-blue-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <p className="text-sm text-blue-700">
              {filteredEmployees.length === 0 ? (
                <>
                  No employees found for "<span className="font-semibold">{searchTerm}</span>"
                </>
              ) : (
                <>
                  Found {filteredEmployees.length} employee{filteredEmployees.length !== 1 ? "s" : ""} for "
                  <span className="font-semibold">{searchTerm}</span>"
                </>
              )}
            </p>
          </div>
        </div>
      )}

      {/* Contact Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredEmployees.length === 0 && searchTerm ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No employees found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search terms or browse all employees.</p>
            <div className="mt-6">
              <button
                onClick={clearSearch}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Clear search
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredEmployees.map((employee) => (
              <div
                key={employee.id}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-sm transition-shadow duration-200"
              >
                {/* Avatar and Content */}
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-10 h-10 ${employee.color} rounded-full flex items-center justify-center flex-shrink-0`}
                  >
                    <span className="text-sm font-medium">{employee.initials}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white leading-tight mb-1">{employee.name}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-2">{employee.role}</p>
                    <a
                      href={`mailto:${employee.email}`}
                      className="text-xs text-blue-600 hover:text-blue-800 block mb-1 break-all"
                    >
                      {employee.email}
                    </a>
                    <p className="text-xs text-gray-400">{employee.id}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 