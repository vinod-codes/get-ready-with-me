"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BookOpen, Code, Search, Clock, Users, Star, Filter, ArrowRight, Brain } from "lucide-react"
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

export default function LabsPage() {
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

  const labs = [
    {
      id: "interactive-todo-list",
      title: "Interactive To-Do List",
      description: "Build a functional to-do list with JavaScript",
      category: "JavaScript",
      level: "Beginner",
      duration: "45 min",
      students: 5200,
      rating: 4.8,
      icon: <Code className="h-10 w-10 text-yellow-500" />,
    },
    {
      id: "weather-app",
      title: "Weather App with API",
      description: "Build a weather app using a public API",
      category: "JavaScript",
      level: "Intermediate",
      duration: "90 min",
      students: 3800,
      rating: 4.6,
      icon: <Code className="h-10 w-10 text-yellow-500" />,
    },
    {
      id: "responsive-portfolio",
      title: "Responsive Portfolio Website",
      description: "Create a responsive portfolio website with HTML and CSS",
      category: "HTML/CSS",
      level: "Intermediate",
      duration: "60 min",
      students: 4500,
      rating: 4.7,
      icon: <BookOpen className="h-10 w-10 text-blue-500" />,
    },
    {
      id: "react-shopping-cart",
      title: "React Shopping Cart",
      description: "Build a shopping cart with React and Context API",
      category: "React",
      level: "Advanced",
      duration: "120 min",
      students: 3200,
      rating: 4.9,
      icon: <Brain className="h-10 w-10 text-cyan-500" />,
    },
    {
      id: "css-grid-gallery",
      title: "CSS Grid Image Gallery",
      description: "Create a responsive image gallery using CSS Grid",
      category: "HTML/CSS",
      level: "Beginner",
      duration: "45 min",
      students: 4100,
      rating: 4.5,
      icon: <BookOpen className="h-10 w-10 text-blue-500" />,
    },
    {
      id: "js-quiz-app",
      title: "JavaScript Quiz App",
      description: "Build an interactive quiz application",
      category: "JavaScript",
      level: "Intermediate",
      duration: "75 min",
      students: 3600,
      rating: 4.7,
      icon: <Code className="h-10 w-10 text-yellow-500" />,
    },
    {
      id: "react-task-tracker",
      title: "React Task Tracker",
      description: "Create a task tracking app with React Hooks",
      category: "React",
      level: "Intermediate",
      duration: "90 min",
      students: 2900,
      rating: 4.8,
      icon: <Brain className="h-10 w-10 text-cyan-500" />,
    },
    {
      id: "css-animations",
      title: "CSS Animations Workshop",
      description: "Master CSS transitions and keyframe animations",
      category: "HTML/CSS",
      level: "Advanced",
      duration: "60 min",
      students: 3400,
      rating: 4.6,
      icon: <BookOpen className="h-10 w-10 text-blue-500" />,
    },
    {
      id: "js-memory-game",
      title: "Memory Card Game",
      description: "Build a memory matching game with JavaScript",
      category: "JavaScript",
      level: "Beginner",
      duration: "60 min",
      students: 4800,
      rating: 4.7,
      icon: <Code className="h-10 w-10 text-yellow-500" />,
    },
    {
      id: "react-blog-cms",
      title: "React Blog CMS",
      description: "Create a blog content management system",
      category: "React",
      level: "Advanced",
      duration: "150 min",
      students: 2600,
      rating: 4.9,
      icon: <Brain className="h-10 w-10 text-cyan-500" />,
    },
    {
      id: "css-flexbox-landing",
      title: "Flexbox Landing Page",
      description: "Build a modern landing page with Flexbox",
      category: "HTML/CSS",
      level: "Beginner",
      duration: "45 min",
      students: 5100,
      rating: 4.5,
      icon: <BookOpen className="h-10 w-10 text-blue-500" />,
    },
    {
      id: "js-expense-tracker",
      title: "Expense Tracker",
      description: "Create an expense tracking app with charts",
      category: "JavaScript",
      level: "Advanced",
      duration: "120 min",
      students: 3100,
      rating: 4.8,
      icon: <Code className="h-10 w-10 text-yellow-500" />,
    }
  ]

  function getFilteredLabs() {
    let filtered = [...labs]

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (lab) =>
          lab.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lab.description.toLowerCase().includes(searchQuery.toLowerCase()),
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
            <h1 className="text-3xl font-bold">Coding Labs</h1>
            <p className="text-muted-foreground">Practice your skills with interactive coding challenges</p>
          </div>

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-[300px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search labs..."
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
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration</label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="">Any Duration</option>
                    <option value="short">Under 5 hours</option>
                    <option value="medium">5-10 hours</option>
                    <option value="long">Over 10 hours</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Rating</label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="">Any Rating</option>
                    <option value="4.5">4.5 & Up</option>
                    <option value="4.0">4.0 & Up</option>
                    <option value="3.5">3.5 & Up</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sort By</label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("")
                    setShowFilters(false)
                  }}
                >
                  Reset
                </Button>
                <Button size="sm" onClick={() => setShowFilters(false)}>
                  Apply Filters
                </Button>
              </div>
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {getFilteredLabs().map((lab) => (
              <motion.div key={lab.id} variants={fadeIn} initial="initial" animate="animate">
                <Card className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      {lab.icon}
                      <Badge variant="outline">{lab.level}</Badge>
                    </div>
                    <CardTitle className="mt-4">{lab.title}</CardTitle>
                    <CardDescription>{lab.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{lab.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{lab.students.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="mr-1 h-4 w-4 text-yellow-500" />
                        <span>{lab.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link href={`/labs/${lab.id}`}>
                        Start Lab <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}

