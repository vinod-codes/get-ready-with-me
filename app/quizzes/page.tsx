"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Code, Search, Filter } from "lucide-react"
import { getCurrentUser } from "@/app/actions/auth-actions"
import DashboardHeader from "@/app/dashboard/dashboard-header"
import { motion } from "framer-motion" // Import Framer Motion

type User = {
  id: string
  name: string
  email: string
  image: string
}

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
}

export default function QuizzesPage() {
const router = useRouter()
const [user, setUser] = useState<User | null>(null)
const [isLoading, setIsLoading] = useState(true)
const [searchQuery, setSearchQuery] = useState("")
const [showFilters, setShowFilters] = useState(false)

useEffect(() => {
  async function loadUser() {
    try {
      const userData = await getCurrentUser()
      if (!userData) {
        router.push("/auth/login")
        return
      }
      setUser(userData as User)
    } catch (error) {
      console.error("Failed to load user data", error)
    } finally {
      setIsLoading(false)
    }
  }

  loadUser()
}, [router])

if (isLoading) {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
    </div>
  )
}

const quizzes = [
  {
    id: "javascript-basics",
    title: "JavaScript Basics",
    description: "Test your knowledge of JavaScript fundamentals",
    category: "JavaScript",
    level: "Beginner",
    questions: 5,
    duration: "5 min",
    rating: 4.7,
    icon: <Code className="h-10 w-10 text-yellow-500" />,
  },
  {
    id: "html-basics",
    title: "HTML Basics",
    description: "Test your knowledge of HTML fundamentals",
    category: "HTML",
    level: "Beginner",
    questions: 3,
    duration: "3 min",
    rating: 4.5,
    icon: <BookOpen className="h-10 w-10 text-orange-500" />,
  },
  {
    id: "css-basics",
    title: "CSS Basics",
    description: "Test your knowledge of CSS fundamentals",
    category: "CSS",
    level: "Beginner",
    questions: 4,
    duration: "4 min",
    rating: 4.6,
    icon: <BookOpen className="h-10 w-10 text-blue-500" />,
  },
]

function getFilteredQuizzes() {
  let filtered = [...quizzes]

  // Filter by search query
  if (searchQuery) {
    filtered = filtered.filter(
      (quiz) =>
        quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  return filtered
}

return (
  <div className="flex min-h-screen flex-col">
    <DashboardHeader user={user} />

    <main className="flex-1 p-6 lg:p-8">
      <motion.div // Wrap the content with motion.div
        className="mx-auto max-w-7xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Quizzes</h1>
          <p className="text-muted-foreground">Test your knowledge and reinforce your learning</p>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search quizzes..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4" />
              <span className="sr-only">Toggle filters</span>
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="mb-8 rounded-lg border p-4">
            <h3 className="mb-2 font-medium">Filters</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Level</label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
\

