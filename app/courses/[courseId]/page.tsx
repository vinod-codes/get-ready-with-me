"use client"

import { AvatarFallback } from "@/components/ui/avatar"
import { AvatarImage } from "@/components/ui/avatar"
import { Avatar } from "@/components/ui/avatar"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  BookOpen,
  Code,
  Clock,
  Users,
  Star,
  CheckCircle,
  Play,
  FileText,
  ArrowLeft,
  Brain,
  MessageSquare,
  X,
  Send,
} from "lucide-react"
import { getCurrentUser } from "@/app/actions/auth-actions"
import DashboardHeader from "@/app/dashboard/dashboard-header"
import { motion } from "framer-motion"
import { use } from "react"
import { Textarea } from "@/components/ui/textarea"

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

export default function CourseDetailPage({ params }: { params: Promise<{ courseId: string }> }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("curriculum")
  const [showAiMentor, setShowAiMentor] = useState(false)
  
  // Unwrap params using React.use()
  const { courseId } = use(params)

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

  // Mock course data based on courseId
  const course = {
    id: courseId,
    title:
      courseId === "javascript-essentials"
        ? "JavaScript Essentials"
        : courseId === "html-fundamentals"
          ? "HTML Fundamentals"
          : courseId === "css-styling-layout"
            ? "CSS Styling & Layout"
            : "React Basics",
    description:
      courseId === "javascript-essentials"
        ? "Learn the fundamentals of programming with JavaScript"
        : courseId === "html-fundamentals"
          ? "Learn the building blocks of web pages"
          : courseId === "css-styling-layout"
            ? "Master the art of styling web pages"
            : "Build interactive UIs with React",
    category: courseId.includes("javascript")
      ? "JavaScript"
      : courseId.includes("html")
        ? "HTML"
        : courseId.includes("css")
          ? "CSS"
          : "React",
    level: courseId.includes("fundamentals") || courseId.includes("basics") ? "Beginner" : "Intermediate",
    duration:
      courseId === "javascript-essentials"
        ? "8 hours"
        : courseId === "html-fundamentals"
          ? "4 hours"
          : courseId === "css-styling-layout"
            ? "6 hours"
            : "10 hours",
    students: 8700,
    rating: 4.9,
    progress:
      courseId === "javascript-essentials"
        ? 45
        : courseId === "html-fundamentals"
          ? 100
          : courseId === "css-styling-layout"
            ? 100
            : 20,
    icon: courseId.includes("javascript") ? (
      <Code className="h-10 w-10 text-yellow-500" />
    ) : courseId.includes("html") || courseId.includes("css") ? (
      <BookOpen className="h-10 w-10 text-blue-500" />
    ) : (
      <Brain className="h-10 w-10 text-cyan-500" />
    ),
  }

  // Mock modules and lessons
  const modules = [
    {
      id: "module-1",
      title: "Getting Started",
      description: "Introduction to the course and setup",
      lessons: [
        {
          id: "lesson-1-1",
          title: "Course Overview",
          duration: "10 min",
          type: "video",
          completed: true,
        },
        {
          id: "lesson-1-2",
          title: "Setting Up Your Environment",
          duration: "15 min",
          type: "video",
          completed: true,
        },
        {
          id: "lesson-1-3",
          title: "Your First Code",
          duration: "20 min",
          type: "interactive",
          completed: true,
        },
      ],
    },
    {
      id: "module-2",
      title: "Core Concepts",
      description: "Learn the fundamental concepts",
      lessons: [
        {
          id: "lesson-2-1",
          title: "Variables and Data Types",
          duration: "25 min",
          type: "video",
          completed: course.progress >= 45,
        },
        {
          id: "lesson-2-2",
          title: "Functions and Scope",
          duration: "30 min",
          type: "video",
          completed: course.progress >= 45,
        },
        {
          id: "lesson-2-3",
          title: "Control Flow",
          duration: "25 min",
          type: "video",
          completed: false,
        },
        {
          id: "lesson-2-4",
          title: "Practice: Building a Calculator",
          duration: "45 min",
          type: "project",
          completed: false,
        },
      ],
    },
    {
      id: "module-3",
      title: "Advanced Topics",
      description: "Dive deeper into advanced concepts",
      lessons: [
        {
          id: "lesson-3-1",
          title: "Arrays and Objects",
          duration: "35 min",
          type: "video",
          completed: false,
        },
        {
          id: "lesson-3-2",
          title: "DOM Manipulation",
          duration: "40 min",
          type: "video",
          completed: false,
        },
        {
          id: "lesson-3-3",
          title: "Asynchronous JavaScript",
          duration: "45 min",
          type: "video",
          completed: false,
        },
        {
          id: "lesson-3-4",
          title: "Final Project: Interactive Web App",
          duration: "90 min",
          type: "project",
          completed: false,
        },
      ],
    },
  ]

  // Calculate total lessons and completed lessons
  const totalLessons = modules.reduce((acc, module) => acc + module.lessons.length, 0)
  const completedLessons = modules.reduce(
    (acc, module) => acc + module.lessons.filter((lesson) => lesson.completed).length,
    0,
  )

  const reviews = [
    {
      name: "Sarah Chen",
      date: "2 months ago",
      rating: 5,
      comment:
        "This course was exactly what I needed to get started with frontend development. The instructor explains concepts clearly and the projects are very practical.",
    },
    {
      name: "Michael Rodriguez",
      date: "3 months ago",
      rating: 5,
      comment:
        "As a career switcher, I found this course incredibly helpful. The step-by-step approach made complex concepts easy to understand.",
    },
    {
      name: "Emily Johnson",
      date: "1 month ago",
      rating: 4,
      comment:
        "Great content and well-structured lessons. I would have liked more advanced exercises, but overall it was an excellent introduction.",
    },
  ]

  // Add AI mentor dialog component
  const AiMentorDialog = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-2xl rounded-lg bg-background p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">AI Mentor</h2>
          <Button variant="ghost" size="icon" onClick={() => setShowAiMentor(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-4 space-y-4">
          <p className="text-muted-foreground">
            Ask me anything about {course.title}. I'm here to help you learn and understand the concepts better.
          </p>
          <div className="space-y-2">
            <Textarea
              placeholder="Type your question here..."
              className="min-h-[100px]"
            />
            <Button className="w-full">
              <Send className="mr-2 h-4 w-4" />
              Send Question
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

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
          <div className="mb-6">
            <Button variant="ghost" className="mb-4 pl-0" asChild>
              <Link href="/courses">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Courses
              </Link>
            </Button>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <h1 className="text-3xl font-bold">{course.title}</h1>
                <p className="mt-2 text-muted-foreground">{course.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary">{course.category}</Badge>
                  <Badge variant="outline">{course.level}</Badge>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{course.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="mr-2 h-4 w-4 text-yellow-500" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      {completedLessons} of {totalLessons} lessons completed
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <Button className="w-full" asChild>
                  <Link href={`/courses/${courseId}/lessons/lesson-2-3`}>
                    {course.progress > 0 ? "Continue Learning" : "Start Course"}
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="mt-2 w-full"
                  onClick={() => setShowAiMentor(true)}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Ask AI Mentor
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="curriculum" value={activeTab} onValueChange={setActiveTab} className="mt-8">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="curriculum" className="mt-6">
              <div className="space-y-6">
                {modules.map((module, moduleIndex) => (
                  <Card key={module.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>
                            Module {moduleIndex + 1}: {module.title}
                          </CardTitle>
                          <CardDescription>{module.description}</CardDescription>
                        </div>
                        <Badge variant="outline">
                          {module.lessons.filter((lesson) => lesson.completed).length} / {module.lessons.length}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div key={lesson.id} className="flex items-center justify-between rounded-lg border p-4">
                            <div className="flex items-center space-x-4">
                              <div
                                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                  lesson.completed
                                    ? "bg-primary text-primary-foreground"
                                    : "border border-muted-foreground text-muted-foreground"
                                }`}
                              >
                                {lesson.completed ? (
                                  <CheckCircle className="h-4 w-4" />
                                ) : (
                                  <span>
                                    {moduleIndex + 1}.{lessonIndex + 1}
                                  </span>
                                )}
                              </div>
                              <div>
                                <p className="font-medium">{lesson.title}</p>
                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                  <div className="flex items-center">
                                    <Clock className="mr-1 h-3 w-3" />
                                    <span>{lesson.duration}</span>
                                  </div>
                                  <Badge variant="outline" className="font-normal">
                                    {lesson.type === "video" && "Video"}
                                    {lesson.type === "interactive" && "Interactive"}
                                    {lesson.type === "project" && "Project"}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/courses/${courseId}/lessons/${lesson.id}`}>
                                {lesson.type === "video" && <Play className="h-4 w-4" />}
                                {lesson.type === "interactive" && <Code className="h-4 w-4" />}
                                {lesson.type === "project" && <FileText className="h-4 w-4" />}
                              </Link>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">What You'll Learn</h3>
                    <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                      {[
                        "Understand the core concepts of the language",
                        "Build interactive web applications",
                        "Implement best practices for clean code",
                        "Debug and troubleshoot common issues",
                        "Work with APIs and external data",
                        "Create responsive and accessible interfaces",
                        "Optimize performance for better user experience",
                        "Deploy your applications to production",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium">Prerequisites</h3>
                    <p className="mt-2 text-muted-foreground">
                      {course.category === "HTML"
                        ? "No prior experience required. This course is designed for absolute beginners."
                        : course.category === "CSS"
                          ? "Basic understanding of HTML is recommended."
                          : course.category === "JavaScript"
                            ? "Familiarity with HTML and CSS is recommended."
                            : "Solid understanding of HTML, CSS, and JavaScript is required."}
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium">Target Audience</h3>
                    <ul className="mt-2 space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                        <span>Beginners who want to learn frontend development</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                        <span>Designers looking to expand their technical skills</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                        <span>Backend developers wanting to understand frontend</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                        <span>Career switchers preparing for technical interviews</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Resources</CardTitle>
                  <CardDescription>Download supplementary materials for this course</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <FileText className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-medium">Course Slides</p>
                          <p className="text-sm text-muted-foreground">PDF, 2.4 MB</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Code className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-medium">Starter Code</p>
                          <p className="text-sm text-muted-foreground">ZIP, 1.8 MB</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <FileText className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-medium">Cheat Sheet</p>
                          <p className="text-sm text-muted-foreground">PDF, 1.2 MB</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <FileText className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-medium">Additional Reading</p>
                          <p className="text-sm text-muted-foreground">PDF, 3.5 MB</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Student Reviews</CardTitle>
                    <div className="flex items-center">
                      <Star className="mr-2 h-5 w-5 text-yellow-500" />
                      <span className="font-bold">{course.rating}</span>
                      <span className="ml-2 text-muted-foreground">({course.students} students)</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {reviews.map((review, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>
                              {review.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{review.name}</p>
                            <p className="text-sm text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? "text-yellow-500" : "text-muted-foreground"}`}
                              fill={i < review.rating ? "currentColor" : "none"}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-4 text-sm">{review.comment}</p>
                    </div>
                  ))}

                  <Button variant="outline" className="w-full">
                    Load More Reviews
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      {showAiMentor && <AiMentorDialog />}
    </div>
  )
}

