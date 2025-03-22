"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle,
  Code,
  FileCode,
  Lightbulb,
  Sparkles,
  BookOpen,
  Zap,
  BarChart,
} from "lucide-react"
import { getCurrentUser } from "@/app/actions/auth-actions"
import DashboardHeader from "@/app/dashboard/dashboard-header"

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

type LearningPath = {
  id: string
  title: string
  description: string
  progress: number
  modules: LearningModule[]
}

type LearningModule = {
  id: string
  title: string
  description: string
  progress: number
  completed: boolean
  topics: LearningTopic[]
}

type LearningTopic = {
  id: string
  title: string
  description: string
  type: "lesson" | "quiz" | "project" | "challenge"
  duration: string
  completed: boolean
  link: string
}

export default function LearningPathPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([])
  const [activePath, setActivePath] = useState<string>("frontend")

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

  useEffect(() => {
    // Mock learning paths data
    const mockLearningPaths: LearningPath[] = [
      {
        id: "frontend",
        title: "Frontend Developer",
        description: "Master HTML, CSS, JavaScript, and React to build modern web applications",
        progress: 35,
        modules: [
          {
            id: "html-css",
            title: "HTML & CSS Fundamentals",
            description: "Learn the building blocks of the web",
            progress: 80,
            completed: false,
            topics: [
              {
                id: "html-basics",
                title: "HTML Basics",
                description: "Learn the structure of web pages",
                type: "lesson",
                duration: "2 hours",
                completed: true,
                link: "/courses/html-basics",
              },
              {
                id: "css-basics",
                title: "CSS Basics",
                description: "Style your web pages",
                type: "lesson",
                duration: "3 hours",
                completed: true,
                link: "/courses/css-basics",
              },
              {
                id: "responsive-design",
                title: "Responsive Design",
                description: "Make your websites work on all devices",
                type: "lesson",
                duration: "2 hours",
                completed: false,
                link: "/courses/responsive-design",
              },
              {
                id: "html-css-project",
                title: "Portfolio Website",
                description: "Build a personal portfolio website",
                type: "project",
                duration: "4 hours",
                completed: false,
                link: "/labs/portfolio-website",
              },
            ],
          },
          {
            id: "javascript",
            title: "JavaScript Essentials",
            description: "Learn programming fundamentals with JavaScript",
            progress: 45,
            completed: false,
            topics: [
              {
                id: "js-basics",
                title: "JavaScript Basics",
                description: "Variables, data types, and operators",
                type: "lesson",
                duration: "3 hours",
                completed: true,
                link: "/courses/javascript-basics",
              },
              {
                id: "js-functions",
                title: "Functions & Scope",
                description: "Create reusable code blocks",
                type: "lesson",
                duration: "2 hours",
                completed: true,
                link: "/courses/javascript-functions",
              },
              {
                id: "js-arrays-objects",
                title: "Arrays & Objects",
                description: "Work with complex data structures",
                type: "lesson",
                duration: "2 hours",
                completed: false,
                link: "/courses/javascript-arrays-objects",
              },
              {
                id: "js-dom",
                title: "DOM Manipulation",
                description: "Interact with web pages using JavaScript",
                type: "lesson",
                duration: "3 hours",
                completed: false,
                link: "/courses/javascript-dom",
              },
              {
                id: "js-project",
                title: "Interactive To-Do List",
                description: "Build a functional to-do list application",
                type: "project",
                duration: "4 hours",
                completed: false,
                link: "/labs/interactive-todo-list",
              },
            ],
          },
          {
            id: "react",
            title: "React Fundamentals",
            description: "Build modern user interfaces with React",
            progress: 0,
            completed: false,
            topics: [
              {
                id: "react-basics",
                title: "React Basics",
                description: "Components, props, and JSX",
                type: "lesson",
                duration: "3 hours",
                completed: false,
                link: "/courses/react-basics",
              },
              {
                id: "react-state",
                title: "State & Lifecycle",
                description: "Manage component state and lifecycle",
                type: "lesson",
                duration: "2 hours",
                completed: false,
                link: "/courses/react-state",
              },
              {
                id: "react-hooks",
                title: "React Hooks",
                description: "Use hooks for state and side effects",
                type: "lesson",
                duration: "3 hours",
                completed: false,
                link: "/courses/react-hooks",
              },
              {
                id: "react-project",
                title: "Weather App",
                description: "Build a weather application with React",
                type: "project",
                duration: "5 hours",
                completed: false,
                link: "/labs/weather-app",
              },
            ],
          },
        ],
      },
      {
        id: "fullstack",
        title: "Full Stack Developer",
        description: "Master both frontend and backend development",
        progress: 15,
        modules: [
          {
            id: "frontend-basics",
            title: "Frontend Basics",
            description: "HTML, CSS, and JavaScript fundamentals",
            progress: 60,
            completed: false,
            topics: [
              {
                id: "html-css-js",
                title: "HTML, CSS & JavaScript",
                description: "Learn the core web technologies",
                type: "lesson",
                duration: "6 hours",
                completed: true,
                link: "/courses/html-css-js",
              },
              {
                id: "responsive-web-design",
                title: "Responsive Web Design",
                description: "Create websites that work on all devices",
                type: "lesson",
                duration: "3 hours",
                completed: false,
                link: "/courses/responsive-web-design",
              },
            ],
          },
          {
            id: "backend-basics",
            title: "Backend Basics",
            description: "Server-side programming with Node.js",
            progress: 0,
            completed: false,
            topics: [
              {
                id: "nodejs-basics",
                title: "Node.js Basics",
                description: "Server-side JavaScript",
                type: "lesson",
                duration: "4 hours",
                completed: false,
                link: "/courses/nodejs-basics",
              },
              {
                id: "express-basics",
                title: "Express.js Basics",
                description: "Build web servers with Express",
                type: "lesson",
                duration: "3 hours",
                completed: false,
                link: "/courses/express-basics",
              },
            ],
          },
        ],
      },
    ]

    setLearningPaths(mockLearningPaths)
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  const currentPath = learningPaths.find((path) => path.id === activePath)

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={user} />

      <main className="flex-1 p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <Button variant="ghost" className="pl-0" asChild>
                <Link href="/ai-mentor">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to AI Mentor
                </Link>
              </Button>
              <h1 className="mt-4 text-3xl font-bold">Personalized Learning Path</h1>
              <p className="text-muted-foreground">AI-powered learning paths tailored to your goals and skill level</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Brain className="h-4 w-4 text-primary" />
                <span>AI Recommended</span>
              </Badge>
            </div>
          </div>

          <Tabs defaultValue={activePath} value={activePath} onValueChange={setActivePath}>
            <TabsList className="mb-8">
              {learningPaths.map((path) => (
                <TabsTrigger key={path.id} value={path.id}>
                  {path.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {currentPath && (
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl">{currentPath.title}</CardTitle>
                        <CardDescription>{currentPath.description}</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{currentPath.progress}%</div>
                        <div className="text-sm text-muted-foreground">Overall Progress</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Progress value={currentPath.progress} className="h-2" />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      <span>
                        {currentPath.modules.filter((m) => m.completed).length} of {currentPath.modules.length} modules
                        completed
                      </span>
                    </div>
                    <Button>
                      Continue Learning
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>

                <div className="grid gap-8 md:grid-cols-3">
                  <div className="md:col-span-2 space-y-6">
                    <h2 className="text-2xl font-bold">Learning Modules</h2>

                    {currentPath.modules.map((module, index) => (
                      <Card key={module.id} className={module.completed ? "border-green-500" : ""}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                              <div
                                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                  module.completed ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {module.completed ? <CheckCircle className="h-5 w-5" /> : <span>{index + 1}</span>}
                              </div>
                              <div>
                                <CardTitle>{module.title}</CardTitle>
                                <CardDescription>{module.description}</CardDescription>
                              </div>
                            </div>
                            <Badge variant="outline">{module.progress}% Complete</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <Progress value={module.progress} className="h-2 mb-4" />

                          <div className="space-y-3">
                            {module.topics.map((topic) => (
                              <div
                                key={topic.id}
                                className={`flex items-center justify-between rounded-lg border p-3 ${
                                  topic.completed ? "bg-muted/50" : ""
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                      topic.completed ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
                                    }`}
                                  >
                                    {topic.type === "lesson" && <BookOpen className="h-4 w-4" />}
                                    {topic.type === "quiz" && <FileCode className="h-4 w-4" />}
                                    {topic.type === "project" && <Code className="h-4 w-4" />}
                                    {topic.type === "challenge" && <Zap className="h-4 w-4" />}
                                  </div>
                                  <div>
                                    <div className="font-medium">{topic.title}</div>
                                    <div className="flex items-center text-xs text-muted-foreground">
                                      <Badge variant="outline" className="mr-2 font-normal capitalize">
                                        {topic.type}
                                      </Badge>
                                      <span>{topic.duration}</span>
                                    </div>
                                  </div>
                                </div>
                                <Button variant={topic.completed ? "outline" : "default"} size="sm" asChild>
                                  <Link href={topic.link}>{topic.completed ? "Review" : "Start"}</Link>
                                </Button>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Sparkles className="mr-2 h-5 w-5 text-primary" />
                          AI Recommendations
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="rounded-lg border p-4">
                          <h3 className="flex items-center font-medium">
                            <Lightbulb className="mr-2 h-4 w-4 text-yellow-500" />
                            Next Steps
                          </h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Based on your progress, I recommend focusing on JavaScript DOM manipulation next to build
                            interactive websites.
                          </p>
                          <Button className="mt-3" size="sm" asChild>
                            <Link href="/courses/javascript-dom">Start Lesson</Link>
                          </Button>
                        </div>

                        <div className="rounded-lg border p-4">
                          <h3 className="flex items-center font-medium">
                            <BarChart className="mr-2 h-4 w-4 text-blue-500" />
                            Skill Analysis
                          </h3>
                          <div className="mt-3 space-y-2">
                            <div>
                              <div className="flex items-center justify-between text-sm">
                                <span>HTML</span>
                                <span className="font-medium">{user?.progress.html}%</span>
                              </div>
                              <Progress value={user?.progress.html} className="h-2" />
                            </div>
                            <div>
                              <div className="flex items-center justify-between text-sm">
                                <span>CSS</span>
                                <span className="font-medium">{user?.progress.css}%</span>
                              </div>
                              <Progress value={user?.progress.css} className="h-2" />
                            </div>
                            <div>
                              <div className="flex items-center justify-between text-sm">
                                <span>JavaScript</span>
                                <span className="font-medium">{user?.progress.javascript}%</span>
                              </div>
                              <Progress value={user?.progress.javascript} className="h-2" />
                            </div>
                            <div>
                              <div className="flex items-center justify-between text-sm">
                                <span>React</span>
                                <span className="font-medium">{user?.progress.react}%</span>
                              </div>
                              <Progress value={user?.progress.react} className="h-2" />
                            </div>
                          </div>
                        </div>

                        <div className="rounded-lg border p-4">
                          <h3 className="flex items-center font-medium">
                            <Brain className="mr-2 h-4 w-4 text-purple-500" />
                            Learning Insights
                          </h3>
                          <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start">
                              <CheckCircle className="mr-2 h-4 w-4 text-green-500 shrink-0" />
                              <span>You're making good progress with HTML and CSS fundamentals</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="mr-2 h-4 w-4 text-green-500 shrink-0" />
                              <span>Your JavaScript skills are developing well</span>
                            </li>
                            <li className="flex items-start">
                              <Lightbulb className="mr-2 h-4 w-4 text-yellow-500 shrink-0" />
                              <span>Consider practicing more with practical projects to reinforce your learning</span>
                            </li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Need Help?</CardTitle>
                        <CardDescription>Get personalized assistance from your AI mentor</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full" asChild>
                          <Link href="/ai-mentor">
                            <Brain className="mr-2 h-4 w-4" />
                            Chat with AI Mentor
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}
          </Tabs>
        </div>
      </main>
    </div>
  )
}

