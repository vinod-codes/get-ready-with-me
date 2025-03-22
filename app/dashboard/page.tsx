"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Code,
  Award,
  Flame,
  Star,
  ArrowRight,
  CheckCircle,
  Clock,
  Github,
  Linkedin,
  Brain,
  Briefcase,
} from "lucide-react"
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
  streak: number
  xp: number
  level: number
}

const cardVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

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

  if (!user) {
    return null
  }

  const recentActivity = [
    {
      type: "quiz",
      title: "JavaScript Basics Quiz",
      score: "8/10",
      date: "2 hours ago",
      icon: <Star className="h-4 w-4 text-yellow-500" />,
    },
    {
      type: "project",
      title: "Interactive To-Do List",
      status: "Completed",
      date: "1 day ago",
      icon: <CheckCircle className="h-4 w-4 text-green-500" />,
    },
    {
      type: "lesson",
      title: "CSS Flexbox Layout",
      progress: "100%",
      date: "2 days ago",
      icon: <BookOpen className="h-4 w-4 text-blue-500" />,
    },
    {
      type: "challenge",
      title: "JavaScript Array Methods",
      status: "Completed",
      date: "3 days ago",
      icon: <Code className="h-4 w-4 text-purple-500" />,
    },
  ]

  const recommendedCourses = [
    {
      title: "JavaScript DOM Manipulation",
      description: "Learn how to interact with the Document Object Model",
      progress: 0,
      level: "Intermediate",
      duration: "2 hours",
      icon: <Code className="h-10 w-10 text-yellow-500" />,
    },
    {
      title: "CSS Grid Mastery",
      description: "Create complex layouts with CSS Grid",
      progress: 0,
      level: "Intermediate",
      duration: "1.5 hours",
      icon: <BookOpen className="h-10 w-10 text-blue-500" />,
    },
    {
      title: "React Hooks in Depth",
      description: "Master the use of React Hooks in functional components",
      progress: 0,
      level: "Advanced",
      duration: "3 hours",
      icon: <Brain className="h-10 w-10 text-cyan-500" />,
    },
  ]

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
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Track your progress and continue your learning journey</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <motion.div variants={cardVariants} initial="initial" animate="animate">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Daily Streak</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Flame className="mr-2 h-5 w-5 text-orange-500" />
                    <div className="text-2xl font-bold">{user.streak} days</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Keep it up! You're building a habit.</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants} initial="initial" animate="animate">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">XP Points</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Star className="mr-2 h-5 w-5 text-yellow-500" />
                    <div className="text-2xl font-bold">{user.xp}</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Level {user.level} • {1000 - (user.xp % 1000)} XP to next level
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants} initial="initial" animate="animate">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Award className="mr-2 h-5 w-5 text-green-500" />
                    <div className="text-2xl font-bold">2/8</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">HTML, CSS completed</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants} initial="initial" animate="animate">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Job Readiness</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Briefcase className="mr-2 h-5 w-5 text-blue-500" />
                    <div className="text-2xl font-bold">45%</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Complete JavaScript to improve</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <motion.div variants={cardVariants} initial="initial" animate="animate">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Learning Path</CardTitle>
                  <CardDescription>Your progress through the frontend curriculum</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-2 h-4 w-4 rounded-full bg-orange-500"></div>
                        <span className="font-medium">HTML</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{user.progress.html}%</span>
                    </div>
                    <Progress value={user.progress.html} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-2 h-4 w-4 rounded-full bg-blue-500"></div>
                        <span className="font-medium">CSS</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{user.progress.css}%</span>
                    </div>
                    <Progress value={user.progress.css} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-2 h-4 w-4 rounded-full bg-yellow-500"></div>
                        <span className="font-medium">JavaScript</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{user.progress.javascript}%</span>
                    </div>
                    <Progress value={user.progress.javascript} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-2 h-4 w-4 rounded-full bg-cyan-500"></div>
                        <span className="font-medium">React</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{user.progress.react}%</span>
                    </div>
                    <Progress value={user.progress.react} className="h-2" />
                  </div>

                  <Button className="w-full" asChild>
                    <Link href="/courses">
                      Continue Learning <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants} initial="initial" animate="animate">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Your Profile</CardTitle>
                  <CardDescription>Manage your profile and connections</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center text-center sm:flex-row sm:text-left">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="mt-4 sm:mt-0 sm:ml-4">
                      <h3 className="text-lg font-medium">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <div className="mt-2 flex justify-center space-x-2 sm:justify-start">
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <Github className="h-4 w-4" />
                          <span className="sr-only">GitHub</span>
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <Linkedin className="h-4 w-4" />
                          <span className="sr-only">LinkedIn</span>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div>
                      <h4 className="text-sm font-medium">Bio</h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Frontend developer in training. Passionate about creating beautiful and functional user
                        interfaces.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium">Skills</h4>
                      <div className="mt-1 flex flex-wrap gap-2">
                        <Badge variant="secondary">HTML</Badge>
                        <Badge variant="secondary">CSS</Badge>
                        <Badge variant="secondary">JavaScript</Badge>
                        <Badge variant="secondary">React Basics</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/profile">Edit Profile</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="mt-8">
            <Tabs defaultValue="activity">
              <TabsList>
                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
                <TabsTrigger value="certificates">Certificates</TabsTrigger>
              </TabsList>

              <TabsContent value="activity" className="mt-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {recentActivity.map((activity, index) => (
                    <motion.div variants={cardVariants} initial="initial" animate="animate" key={index}>
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="font-normal capitalize">
                              {activity.type}
                            </Badge>
                            {activity.icon}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <h3 className="font-medium">{activity.title}</h3>
                          <div className="mt-1 flex items-center justify-between text-sm text-muted-foreground">
                            <div>
                              {activity.score && <span>{activity.score}</span>}
                              {activity.status && <span>{activity.status}</span>}
                              {activity.progress && <span>{activity.progress}</span>}
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              <span>{activity.date}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="ghost" size="sm" className="w-full" asChild>
                            <Link href={`/${activity.type}s/${activity.title.toLowerCase().replace(/\s+/g, "-")}`}>
                              View Details
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="recommended" className="mt-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {recommendedCourses.map((course, index) => (
                    <motion.div variants={cardVariants} initial="initial" animate="animate" key={index}>
                      <Card>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            {course.icon}
                            <Badge variant="outline">{course.level}</Badge>
                          </div>
                          <CardTitle className="mt-4">{course.title}</CardTitle>
                          <CardDescription>{course.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="mr-1 h-4 w-4" />
                            <span>{course.duration}</span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full" asChild>
                            <Link href={`/courses/${course.title.toLowerCase().replace(/\s+/g, "-")}`}>
                              Start Course
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="certificates" className="mt-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <motion.div variants={cardVariants} initial="initial" animate="animate">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Award className="h-8 w-8 text-primary" />
                          <Badge>Completed</Badge>
                        </div>
                        <CardTitle className="mt-4">HTML Fundamentals</CardTitle>
                        <CardDescription>Mastery of HTML structure and semantics</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">Issued on: March 15, 2023</p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>

                  <motion.div variants={cardVariants} initial="initial" animate="animate">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Award className="h-8 w-8 text-primary" />
                          <Badge>Completed</Badge>
                        </div>
                        <CardTitle className="mt-4">CSS Styling & Layout</CardTitle>
                        <CardDescription>Proficiency in CSS styling techniques</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">Issued on: April 22, 2023</p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>

                  <motion.div variants={cardVariants} initial="initial" animate="animate">
                    <Card className="border-dashed">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Award className="h-8 w-8 text-muted-foreground" />
                          <Badge variant="outline">In Progress</Badge>
                        </div>
                        <CardTitle className="mt-4 text-muted-foreground">JavaScript Essentials</CardTitle>
                        <CardDescription>Complete the course to earn this certificate</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Progress</span>
                            <span>{user.progress.javascript}%</span>
                          </div>
                          <Progress value={user.progress.javascript} className="h-2" />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" asChild>
                          <Link href="/courses/javascript-essentials">Continue Course</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

