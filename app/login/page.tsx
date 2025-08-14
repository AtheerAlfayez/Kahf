"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

// Predefined users for authentication
const AUTHORIZED_USERS = [
  { email: "admin@kahf.org", password: "admin123" },
  { email: "manager@kahf.org", password: "manager123" },
  { email: "editor@kahf.org", password: "editor123" },
  { email: "staff@kahf.org", password: "staff123" },
  { email: "user@kahf.org", password: "user123" },
]

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const user = AUTHORIZED_USERS.find(
        (u) => u.email === email && u.password === password
      )

      if (user) {
        // In a real application, you would handle session/token management here
        toast.success("Login successful!")
        router.push("/admin")
      } else {
        toast.error("Access denied. Invalid credentials.")
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent" style={{ color: '#003A70' }}>
              Admin Login
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Please sign in to access the admin panel
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#003A70] hover:bg-[#002347] text-white py-6"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
} 