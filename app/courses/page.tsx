"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BookOpen, Code, Search, Clock, Users, Star, Filter, Brain, ArrowRight } from "lucide-react"
import { getCurrentUser } from "@/app/actions/auth-actions"
import DashboardHeader from "@/app/dashboard/dashboard-header"
import { motion } from "framer-motion" // Import Framer Motion

type User = {
  id: string
  name: string
  email: string
  image: string
  progress: {
    html: number
    css: number
    javascript: number
    react: number
  }
}

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
}

export default function CoursesPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
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

  const courses = [
    {
      id: "html-fundamentals",
      title: "HTML Fundamentals",
      description: "Learn the building blocks of web pages",
      category: "HTML",
      level: "Beginner",
      duration: "4 hours",
      students: 12500,
      rating: 4.8,
      progress: user?.progress.html || 0,
      icon: <BookOpen className="h-10 w-10 text-orange-500" />,
    },
    {
      id: "css-styling-layout",
      title: "CSS Styling & Layout",
      description: "Master the art of styling web pages",
      category: "CSS",
      level: "Beginner",
      duration: "6 hours",
      students: 10200,
      rating: 4.7,
      progress: user?.progress.css || 0,
      icon: <BookOpen className="h-10 w-10 text-blue-500" />,
    },
    {
      id: "javascript-essentials",
      title: "JavaScript Essentials",
      description: "Learn the fundamentals of programming with JavaScript",
      category: "JavaScript",
      level: "Intermediate",
      duration: "8 hours",
      students: 8700,
      rating: 4.9,
      progress: user?.progress.javascript || 0,
      icon: <Code className="h-10 w-10 text-yellow-500" />,
    },
    {
      id: "javascript-dom-manipulation",
      title: "JavaScript DOM Manipulation",
      description: "Learn how to interact with the Document Object Model",
      category: "JavaScript",
      level: "Intermediate",
      duration: "5 hours",
      students: 7200,
      rating: 4.6,
      progress: 0,
      icon: <Code className="h-10 w-10 text-yellow-500" />,
    },
    {
      id: "css-grid-mastery",
      title: "CSS Grid Mastery",
      description: "Create complex layouts with CSS Grid",
      category: "CSS",
      level: "Intermediate",
      duration: "4 hours",
      students: 6500,
      rating: 4.8,
      progress: 0,
      icon: <BookOpen className="h-10 w-10 text-blue-500" />,
    },
    {
      id: "react-basics",
      title: "React Basics",
      description: "Build interactive UIs with React",
      category: "React",
      level: "Intermediate",
      duration: "10 hours",
      students: 9300,
      rating: 4.9,
      progress: user?.progress.react || 0,
      icon: <Brain className="h-10 w-10 text-cyan-500" />,
    },
    {
      id: "react-hooks-in-depth",
      title: "React Hooks in Depth",
      description: "Master the use of React Hooks in functional components",
      category: "React",
      level: "Advanced",
      duration: "6 hours",
      students: 5200,
      rating: 4.7,
      progress: 0,
      icon: <Brain className="h-10 w-10 text-cyan-500" />,
    },
    {
      id: "responsive-web-design",
      title: "Responsive Web Design",
      description: "Create websites that work on any device",
      category: "CSS",
      level: "Intermediate",
      duration: "5 hours",
      students: 7800,
      rating: 4.6,
      progress: 0,
      icon: <BookOpen className="h-10 w-10 text-blue-500" />,
    },
  ]

  function getFilteredCourses() {
    let filtered = [...courses]

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by category
    if (activeTab !== "all") {
      filtered = filtered.filter((course) => course.category.toLowerCase() === activeTab)
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
            <h1 className="text-3xl font-bold">Courses</h1>
            <p className="text-muted-foreground">Explore our comprehensive frontend development curriculum</p>
          </div>

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-[300px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search courses..."
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

            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="html">HTML</TabsTrigger>
                <TabsTrigger value="css">CSS</TabsTrigger>
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="react">React</TabsTrigger>
              </TabsList>
            </Tabs>
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
                    setActiveTab("all")
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
            {getFilteredCourses().map((course) => (
              <motion.div key={course.id} variants={fadeIn} initial="initial" animate="animate">
                <Card className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      {course.icon}
                      <Badge variant="outline">{course.level}</Badge>
                    </div>
                    <CardTitle className="mt-4">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="mr-1 h-4 w-4 text-yellow-500" />
                        <span>{course.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <Badge variant="secondary" className="font-normal">
                          {course.category}
                        </Badge>
                      </div>
                    </div>

                    {course.progress > 0 && (
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link href={`/courses/${course.id}`}>
                        {course.progress > 0 ? (
                          <>
                            Continue Learning <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        ) : (
                          <>
                            Start Course <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
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

