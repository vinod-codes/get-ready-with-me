"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/app/actions/auth-actions"
import DashboardHeader from "@/app/dashboard/dashboard-header"
import { motion } from "framer-motion"
import { use } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Code2,
  FileText,
  Lightbulb,
  List,
  MessageSquare,
  Play,
  Video,
  FileCode,
} from "lucide-react"

type User = {
  id: string
  name: string
  email: string
  image: string
}

// Define lesson content for different lessons
const LESSON_DATA = {
  "lesson-1-1": {
    title: "Course Overview",
    type: "content",
    duration: "10 min",
    description: "Introduction to the JavaScript programming course",
    videoUrl: "https://www.youtube.com/embed/W6NZfCO5SIk", // JavaScript Tutorial for Beginners
    content: `
      <h1>Welcome to JavaScript Programming</h1>
      <p>In this course, you'll learn:</p>
      <ul>
        <li>Basic programming concepts</li>
        <li>JavaScript fundamentals</li>
        <li>Modern JavaScript features</li>
        <li>Building real-world applications</li>
      </ul>
      
      <h2>Course Structure</h2>
      <p>The course is divided into three main modules:</p>
      <ol>
        <li><strong>Getting Started</strong> - Basic setup and fundamentals</li>
        <li><strong>Core Concepts</strong> - Key programming concepts</li>
        <li><strong>Advanced Topics</strong> - Building real applications</li>
      </ol>
    `,
    quiz: [
      {
        question: "What are the three main modules of this course?",
        options: [
          "Getting Started, Core Concepts, Advanced Topics",
          "HTML, CSS, JavaScript",
          "Frontend, Backend, Database",
          "Basics, Intermediate, Expert"
        ],
        correctAnswer: 0
      },
      {
        question: "What will you learn in this course?",
        options: [
          "Only HTML and CSS",
          "Only Database management",
          "JavaScript fundamentals and building real applications",
          "Mobile app development"
        ],
        correctAnswer: 2
      }
    ],
    resources: [
      {
        title: "JavaScript Roadmap",
        url: "https://roadmap.sh/javascript",
        type: "documentation",
        icon: "BookOpen"
      },
      {
        title: "Course Overview PDF",
        url: "https://javascript.info/intro",
        type: "pdf",
        icon: "FileText"
      },
      {
        title: "Getting Started Guide",
        url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript",
        type: "documentation",
        icon: "BookOpen"
      }
    ],
    additionalResources: {
      websites: [
        {
          title: "Learning Platforms",
          links: [
            { name: "MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
            { name: "JavaScript.info", url: "https://javascript.info/" },
            { name: "W3Schools", url: "https://www.w3schools.com/js/" },
            { name: "freeCodeCamp", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/" }
          ]
        }
      ],
      tools: [
        { name: "VS Code", url: "https://code.visualstudio.com/" },
        { name: "Node.js", url: "https://nodejs.org/" },
        { name: "Git", url: "https://git-scm.com/" }
      ],
      cheatSheets: [
        { name: "JavaScript CheatSheet", url: "https://htmlcheatsheet.com/js/" },
        { name: "Modern JS CheatSheet", url: "https://mbeaudru.github.io/modern-js-cheatsheet/" }
      ]
    }
  },
  "lesson-1-2": {
    title: "Setting Up Your Environment",
    type: "setup",
    duration: "15 min",
    description: "Set up your development environment for JavaScript programming",
    videoUrl: "https://www.youtube.com/embed/gD50kjJ_lAY", // VS Code Setup for JavaScript
    content: `
      <h1>Development Environment Setup</h1>
      <h2>Required Tools</h2>
      <ul>
        <li>Visual Studio Code</li>
        <li>Node.js</li>
        <li>Git</li>
        <li>Browser Developer Tools</li>
      </ul>

      <h2>Installation Steps</h2>
      <ol>
        <li>Download and install VS Code</li>
        <li>Install Node.js LTS version</li>
        <li>Install Git for version control</li>
        <li>Configure VS Code extensions</li>
      </ol>

      <h2>VS Code Extensions</h2>
      <ul>
        <li>ESLint - For code quality</li>
        <li>Prettier - For code formatting</li>
        <li>Live Server - For local development</li>
      </ul>
    `,
    quiz: [
      {
        question: "Which tool is used for code editing in this course?",
        options: [
          "Notepad",
          "Visual Studio Code",
          "Sublime Text",
          "Atom"
        ],
        correctAnswer: 1
      },
      {
        question: "What is Node.js used for?",
        options: [
          "Writing HTML",
          "Styling web pages",
          "Running JavaScript outside the browser",
          "Creating databases"
        ],
        correctAnswer: 2
      }
    ],
    additionalResources: {
      websites: [
        {
          title: "Setup Guides",
          links: [
            { name: "VS Code Setup", url: "https://code.visualstudio.com/docs/setup/setup-overview" },
            { name: "Node.js Installation", url: "https://nodejs.org/en/download/package-manager" },
            { name: "Git Setup", url: "https://git-scm.com/book/en/v2/Getting-Started-Installing-Git" }
          ]
        }
      ],
      tools: [
        { name: "VS Code", url: "https://code.visualstudio.com/" },
        { name: "Node.js", url: "https://nodejs.org/" },
        { name: "Git", url: "https://git-scm.com/" }
      ],
      cheatSheets: [
        { name: "VS Code Shortcuts", url: "https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf" },
        { name: "Git Commands", url: "https://github.github.com/training-kit/downloads/github-git-cheat-sheet/" }
      ]
    }
  },
  "lesson-1-3": {
    title: "Your First Code",
    type: "hands-on",
    duration: "20 min",
    description: "Write your first JavaScript program",
    videoUrl: "https://www.youtube.com/embed/PkZNo7MFNFg", // Learn JavaScript - Full Course for Beginners
    content: `
      <h1>Writing Your First JavaScript Code</h1>
      <h2>Hello World Program</h2>
      <pre><code>
console.log("Hello, World!");
      </code></pre>

      <h2>Basic Syntax</h2>
      <pre><code>
// This is a comment
let message = "Welcome to JavaScript!";
console.log(message);
      </code></pre>

      <h2>Practice Exercise</h2>
      <p>Try creating variables and printing them:</p>
      <pre><code>
let name = "Your Name";
let age = 25;
console.log("My name is " + name + " and I am " + age + " years old.");
      </code></pre>
    `
  },
  "lesson-2-1": {
    title: "Variables and Data Types",
    type: "concept",
    duration: "25 min",
    description: "Learn about variables and different data types in JavaScript",
    videoUrl: "https://www.youtube.com/embed/edaYw9UhQ4M", // JavaScript Variables
    content: `
      <h1>Variables and Data Types</h1>
      <h2>Declaring Variables</h2>
      <pre><code>
let name = "John";      // String
const age = 30;         // Number
var isStudent = true;   // Boolean
      </code></pre>

      <h2>Data Types</h2>
      <ul>
        <li>String - Text values</li>
        <li>Number - Numeric values</li>
        <li>Boolean - true/false</li>
        <li>Object - Complex data structures</li>
        <li>Array - Lists of values</li>
        <li>Null - Intentional absence of value</li>
        <li>Undefined - Unassigned value</li>
      </ul>
    `,
    quiz: [
      {
        question: "Which of the following is NOT a valid way to declare a variable in JavaScript?",
        options: [
          "let x = 5;",
          "const y = 10;",
          "var z = 15;",
          "string name = 'John';"
        ],
        correctAnswer: 3
      },
      {
        question: "What is the output of: typeof [1, 2, 3]",
        options: [
          "'array'",
          "'object'",
          "'number'",
          "'undefined'"
        ],
        correctAnswer: 1
      },
      {
        question: "Which data type is used for decimal numbers in JavaScript?",
        options: [
          "int",
          "float",
          "number",
          "decimal"
        ],
        correctAnswer: 2
      }
    ],
    resources: [
      {
        title: "MDN - Variables",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Variables",
        type: "documentation",
        icon: "BookOpen"
      },
      {
        title: "Data Types Practice",
        url: "https://javascript.info/types",
        type: "playground",
        icon: "Code2"
      },
      {
        title: "Variables Cheat Sheet",
        url: "https://www.codecademy.com/learn/introduction-to-javascript/modules/learn-javascript-introduction/cheatsheet",
        type: "cheatsheet",
        icon: "FileCode"
      }
    ],
    additionalResources: {
      websites: [
        {
          title: "Learning Resources",
          links: [
            { name: "JavaScript Variables", url: "https://javascript.info/variables" },
            { name: "Data Types Guide", url: "https://javascript.info/types" },
            { name: "Type Conversion", url: "https://javascript.info/type-conversions" }
          ]
        }
      ],
      tools: [
        { name: "JavaScript Visualizer", url: "https://www.jsv9000.app/" },
        { name: "TypeOf Tester", url: "https://typeof.net/" }
      ],
      cheatSheets: [
        { name: "Data Types Cheat Sheet", url: "https://websitesetup.org/javascript-cheat-sheet/" },
        { name: "ES6+ Features", url: "https://github.com/lukehoban/es6features" }
      ]
    }
  },
  "lesson-2-2": {
    title: "Functions and Scope",
    type: "concept",
    duration: "30 min",
    description: "Understanding functions and variable scope",
    videoUrl: "https://www.youtube.com/embed/xUI5Tsl2JpY", // JavaScript Functions
    content: `
      <h1>Functions and Scope</h1>
      <h2>Function Declaration</h2>
      <pre><code>
function greet(name) {
  return "Hello, " + name + "!";
}

const sayHello = (name) => {
  return "Hello, " + name + "!";
};
      </code></pre>

      <h2>Variable Scope</h2>
      <pre><code>
let globalVar = "I'm global";

function scopeExample() {
  let localVar = "I'm local";
  console.log(globalVar);  // Accessible
  console.log(localVar);   // Accessible
}

console.log(globalVar);    // Accessible
console.log(localVar);     // Error!
      </code></pre>
    `,
    quiz: [
      {
        question: "What is the difference between let and var?",
        options: [
          "let is block-scoped, var is function-scoped",
          "var is block-scoped, let is function-scoped",
          "They are exactly the same",
          "let cannot be reassigned"
        ],
        correctAnswer: 0
      },
      {
        question: "What will be the output of this code?\nconst x = 1;\nfunction test() {\n  console.log(x);\n  const x = 2;\n}",
        options: [
          "1",
          "2",
          "undefined",
          "ReferenceError"
        ],
        correctAnswer: 3
      }
    ],
    resources: [
      {
        title: "Functions Guide",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
        type: "documentation",
        icon: "BookOpen"
      },
      {
        title: "Scope Practice",
        url: "https://javascript.info/closure",
        type: "playground",
        icon: "Code2"
      }
    ],
    additionalResources: {
      websites: [
        {
          title: "Function Resources",
          links: [
            { name: "Function Basics", url: "https://javascript.info/function-basics" },
            { name: "Arrow Functions", url: "https://javascript.info/arrow-functions-basics" },
            { name: "Scope Chain", url: "https://javascript.info/closure" }
          ]
        }
      ],
      tools: [
        { name: "Scope Visualizer", url: "https://tylermcginnis.com/javascript-visualizer/" },
        { name: "Function Playground", url: "https://playcode.io/javascript" }
      ],
      cheatSheets: [
        { name: "Functions Cheat Sheet", url: "https://devhints.io/js-functions" },
        { name: "Scope Cheat Sheet", url: "https://devhints.io/js-scope" }
      ]
    }
  },
  "lesson-2-3": {
    title: "Control Flow",
    type: "concept",
    duration: "25 min",
    description: "Learn about conditional statements and loops",
    videoUrl: "https://www.youtube.com/embed/Lp-Du2fKoug", // JavaScript Control Flow
    content: `
      <h1>Control Flow in JavaScript</h1>
      <h2>Conditional Statements</h2>
      <pre><code>
if (condition) {
  // code to execute if true
} else {
  // code to execute if false
}

switch (value) {
  case 1:
    // code
    break;
  default:
    // code
}
      </code></pre>

      <h2>Loops</h2>
      <pre><code>
for (let i = 0; i < 5; i++) {
  console.log(i);
}

while (condition) {
  // code
}
      </code></pre>
    `,
    quiz: [
      {
        question: "Which loop is best used when you don't know how many iterations you need?",
        options: [
          "for loop",
          "while loop",
          "do...while loop",
          "for...of loop"
        ],
        correctAnswer: 1
      },
      {
        question: "What is the correct syntax for an if statement?",
        options: [
          "if condition { }",
          "if (condition) { }",
          "if [condition] { }",
          "if condition then { }"
        ],
        correctAnswer: 1
      }
    ],
    resources: [
      {
        title: "Control Flow Guide",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling",
        type: "documentation",
        icon: "BookOpen"
      },
      {
        title: "Loops Practice",
        url: "https://javascript.info/while-for",
        type: "playground",
        icon: "Code2"
      }
    ],
    additionalResources: {
      websites: [
        {
          title: "Control Flow Resources",
          links: [
            { name: "Conditional Branching", url: "https://javascript.info/ifelse" },
            { name: "Loops", url: "https://javascript.info/while-for" },
            { name: "Switch Statement", url: "https://javascript.info/switch" }
          ]
        }
      ],
      tools: [
        { name: "Loop Visualizer", url: "https://pythontutor.com/javascript.html" },
        { name: "Control Flow Playground", url: "https://playcode.io/javascript" }
      ],
      cheatSheets: [
        { name: "Control Flow Cheat Sheet", url: "https://devhints.io/js-control-flow" },
        { name: "Loops Cheat Sheet", url: "https://devhints.io/js-loops" }
      ]
    }
  }
}

export default function LessonDetailPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>
}) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showSidebar, setShowSidebar] = useState(true)
  const [showAiMentor, setShowAiMentor] = useState(false)
  const [lessonCompleted, setLessonCompleted] = useState(false)
  const [activeTab, setActiveTab] = useState("content")

  // Unwrap params using React.use()
  const { courseId, lessonId } = use(params)

  // Reset state when lessonId changes
  useEffect(() => {
    setLessonCompleted(false)
    setActiveTab("content")
  }, [lessonId])

  // Handle navigation with proper state updates
  const navigateToLesson = (newLessonId: string) => {
    setIsLoading(true)
    try {
      router.push(`/courses/${courseId}/lessons/${newLessonId}`)
    } catch (error) {
      console.error('Navigation error:', error)
      setIsLoading(false)
    }
  }

  // Add effect to handle scroll and loading state after navigation
  useEffect(() => {
    if (isLoading) {
      window.scrollTo(0, 0)
      // Add a small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isLoading, lessonId])

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

  // Get the current lesson data
  const currentLesson = LESSON_DATA[lessonId] || {
    title: "Lesson Not Found",
    type: "error",
    duration: "0 min",
    description: "This lesson could not be found",
    videoUrl: "",
    content: "<p>The requested lesson content is not available.</p>"
  }

  // Update lesson data to use currentLesson
  const lesson = {
    ...currentLesson,
    id: lessonId,
    resources: currentLesson.resources || [
      {
        title: "MDN Documentation",
        url: `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/${
          lessonId.includes("control") ? "Control_flow" : 
          lessonId.includes("function") ? "Functions" :
          lessonId.includes("variable") ? "Grammar_and_types" :
          "Introduction"
        }`,
        type: "documentation",
        icon: "BookOpen"
      }
    ],
    quiz: currentLesson.quiz || [],
    additionalResources: currentLesson.additionalResources || {
      websites: [],
      tools: [],
      cheatSheets: []
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  // Mock course structure for sidebar
  const courseStructure = [
    {
      id: "module-1",
      title: "Getting Started",
      lessons: [
        {
          id: "lesson-1-1",
          title: "Course Overview",
          completed: true,
        },
        {
          id: "lesson-1-2",
          title: "Setting Up Your Environment",
          completed: true,
        },
        {
          id: "lesson-1-3",
          title: "Your First Code",
          completed: true,
        },
      ],
    },
    {
      id: "module-2",
      title: "Core Concepts",
      lessons: [
        {
          id: "lesson-2-1",
          title: "Variables and Data Types",
          completed: true,
        },
        {
          id: "lesson-2-2",
          title: "Functions and Scope",
          completed: true,
        },
        {
          id: "lesson-2-3",
          title: "Control Flow",
          completed: lessonCompleted,
        },
        {
          id: "lesson-2-4",
          title: "Practice: Building a Calculator",
          completed: false,
        },
      ],
    },
    {
      id: "module-3",
      title: "Advanced Topics",
      lessons: [
        {
          id: "lesson-3-1",
          title: "Arrays and Objects",
          completed: false,
        },
        {
          id: "lesson-3-2",
          title: "DOM Manipulation",
          completed: false,
        },
        {
          id: "lesson-3-3",
          title: "Asynchronous JavaScript",
          completed: false,
        },
        {
          id: "lesson-3-4",
          title: "Final Project: Interactive Web App",
          completed: false,
        },
      ],
    },
  ]

  // Find current lesson index and next/previous lessons
  let currentModuleIndex = -1
  let currentLessonIndex = -1
  let nextLesson = null
  let prevLesson = null

  courseStructure.forEach((module, moduleIndex) => {
    module.lessons.forEach((lesson, lessonIndex) => {
      if (lesson.id === lessonId) {
        currentModuleIndex = moduleIndex
        currentLessonIndex = lessonIndex
      }
    })
  })

  if (currentModuleIndex !== -1 && currentLessonIndex !== -1) {
    const currentModule = courseStructure[currentModuleIndex]

    // Previous lesson
    if (currentLessonIndex > 0) {
      prevLesson = currentModule.lessons[currentLessonIndex - 1]
    } else if (currentModuleIndex > 0) {
      const prevModule = courseStructure[currentModuleIndex - 1]
      prevLesson = prevModule.lessons[prevModule.lessons.length - 1]
    }

    // Next lesson
    if (currentLessonIndex < currentModule.lessons.length - 1) {
      nextLesson = currentModule.lessons[currentLessonIndex + 1]
    } else if (currentModuleIndex < courseStructure.length - 1) {
      const nextModule = courseStructure[currentModuleIndex + 1]
      nextLesson = nextModule.lessons[0]
    }
  }

  function handleMarkAsComplete() {
    setLessonCompleted(true)
    if (nextLesson) {
      router.push(`/courses/${courseId}/lessons/${nextLesson.id}`)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={user} />

      <main className="flex-1 p-4 lg:p-6">
        {isLoading ? (
          <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <motion.div
            key={lessonId}
            className="mx-auto max-w-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h1 className="text-2xl font-bold">{lesson.title}</h1>
                  <p className="text-muted-foreground">{lesson.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                  </div>
                  <Button
                    variant={lessonCompleted ? "outline" : "default"}
                    onClick={handleMarkAsComplete}
                  >
                    {lessonCompleted ? (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        Completed
                      </>
                    ) : (
                      "Mark as Complete"
                    )}
                  </Button>
                </div>
              </div>

              <div className="mt-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="content" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Content
                    </TabsTrigger>
                    <TabsTrigger value="video" className="flex items-center gap-2">
                      <Video className="h-4 w-4" />
                      Video
                    </TabsTrigger>
                    <TabsTrigger value="exercises" className="flex items-center gap-2">
                      <Code2 className="h-4 w-4" />
                      Exercises
                    </TabsTrigger>
                    <TabsTrigger value="resources" className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Resources
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="content" className="mt-6">
                    <Card>
                      <CardContent className="p-8">
                        <div
                          className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-headings:text-black dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:text-gray-900 dark:prose-pre:text-gray-100 prose-code:text-gray-900 dark:prose-code:text-gray-100 prose-ul:text-gray-700 dark:prose-ul:text-gray-300 prose-li:text-gray-700 dark:prose-li:text-gray-300"
                          dangerouslySetInnerHTML={{ __html: lesson.content }}
                        />
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="video" className="mt-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="aspect-video rounded-lg overflow-hidden">
                          <iframe
                            src={lesson.videoUrl}
                            title={lesson.title}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="exercises" className="mt-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Practice Exercises</h3>
                          <div className="space-y-4">
                            {lesson.quiz.map((question, index) => (
                              <div key={index} className="space-y-2">
                                <p className="font-medium">{question.question}</p>
                                <div className="space-y-2">
                                  {question.options.map((option, optionIndex) => (
                                    <div
                                      key={optionIndex}
                                      className="flex items-center gap-2 rounded-lg border p-4 transition-colors hover:bg-muted"
                                    >
                                      <input
                                        type="radio"
                                        name={`question-${index}`}
                                        id={`question-${index}-option-${optionIndex}`}
                                      />
                                      <label
                                        htmlFor={`question-${index}-option-${optionIndex}`}
                                        className="flex-1 cursor-pointer"
                                      >
                                        {option}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="resources" className="mt-6">
                    <div className="grid gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Learning Resources</CardTitle>
                          <CardDescription>Documentation, exercises, and helpful tools</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Essential Resources</h3>
                            <div className="grid gap-4 md:grid-cols-2">
                              {lesson.resources.map((resource, index) => (
                                <a
                                  key={index}
                                  href={resource.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted"
                                >
                                  <div className="flex items-center gap-3">
                                    {resource.type === "documentation" && <BookOpen className="h-4 w-4" />}
                                    {resource.type === "pdf" && <FileText className="h-4 w-4" />}
                                    {resource.type === "cheatsheet" && <FileCode className="h-4 w-4" />}
                                    {resource.type === "playground" && <Code2 className="h-4 w-4" />}
                                    {resource.type === "notes" && <FileText className="h-4 w-4" />}
                                    {resource.type === "react" && <Code2 className="h-4 w-4" />}
                                    {resource.type === "video" && <Video className="h-4 w-4" />}
          <div>
                                      <div className="font-medium">{resource.title}</div>
                                      <div className="text-sm text-muted-foreground">
                                        {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                                      </div>
                                    </div>
                                  </div>
                                  <ChevronRight className="h-4 w-4" />
                                </a>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Recommended Websites</h3>
                            {lesson.additionalResources.websites.map((category, index) => (
                              <div key={index} className="space-y-2">
                                <h4 className="font-medium text-muted-foreground">{category.title}</h4>
                                <div className="grid gap-2 md:grid-cols-2">
                                  {category.links.map((link, linkIndex) => (
                                    <a
                                      key={linkIndex}
                                      href={link.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 rounded-lg border p-3 transition-colors hover:bg-muted"
                                    >
                                      <span>{link.name}</span>
                                      <ChevronRight className="h-4 w-4 ml-auto" />
                                    </a>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Online Tools</h3>
                            <div className="grid gap-2 md:grid-cols-2">
                              {lesson.additionalResources.tools.map((tool, index) => (
                                <a
                                  key={index}
                                  href={tool.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 rounded-lg border p-3 transition-colors hover:bg-muted"
                                >
                                  <Code2 className="h-4 w-4" />
                                  <span>{tool.name}</span>
                                  <ChevronRight className="h-4 w-4 ml-auto" />
                                </a>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Cheat Sheets</h3>
                            <div className="grid gap-2 md:grid-cols-2">
                              {lesson.additionalResources.cheatSheets.map((sheet, index) => (
                                <a
                                  key={index}
                                  href={sheet.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 rounded-lg border p-3 transition-colors hover:bg-muted"
                                >
                                  <FileCode className="h-4 w-4" />
                                  <span>{sheet.name}</span>
                                  <ChevronRight className="h-4 w-4 ml-auto" />
                                </a>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t">
                <div className="mx-auto max-w-7xl p-4 flex items-center justify-between">
                  {prevLesson ? (
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 hover:bg-accent"
                      onClick={() => navigateToLesson(prevLesson.id)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span className="hidden sm:inline">{prevLesson.title}</span>
                      <span className="sm:hidden">Previous</span>
                    </Button>
                  ) : (
                    <div />
                  )}

                  {nextLesson && (
                    <Button
                      className="flex items-center gap-2"
                      onClick={() => navigateToLesson(nextLesson.id)}
                    >
                      <span className="hidden sm:inline">{nextLesson.title}</span>
                      <span className="sm:hidden">Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="h-20" />
          </div>
        </motion.div>
        )}
      </main>
    </div>
  )
}

