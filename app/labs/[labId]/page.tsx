"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  FileCode,
  MessageSquare,
  Play,
  BookOpen,
  Timer,
  Users,
  Star,
  Download,
  Share2,
  Bookmark,
  HelpCircle,
  RefreshCw,
  Terminal,
  Layout,
  AlertCircle,
  Code2,
  PlayCircle,
  Save,
} from "lucide-react"
import { getCurrentUser } from "@/app/actions/auth-actions"
import DashboardHeader from "@/app/dashboard/dashboard-header"
import { motion } from "framer-motion"
import { use } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

type User = {
  id: string
  name: string
  email: string
  image: string
}

export default function LabDetailPage({
  params,
}: {
  params: Promise<{ labId: string }>
}) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showAiMentor, setShowAiMentor] = useState(false)
  const [activeTab, setActiveTab] = useState("instructions")
  const [code, setCode] = useState("")
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [labCompleted, setLabCompleted] = useState(false)
  const [viewMode, setViewMode] = useState<"split" | "full">("split")
  const [showHints, setShowHints] = useState(false)

  // Unwrap params using React.use()
  const { labId } = use(params)

  // Mock resources data
  const resources = [
    {
      title: "MDN Documentation",
      url: "https://developer.mozilla.org",
      type: "documentation",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      title: "Stack Overflow Solutions",
      url: "https://stackoverflow.com",
      type: "community",
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      title: "GitHub Examples",
      url: "https://github.com",
      type: "code",
      icon: <FileCode className="h-4 w-4" />,
    },
  ]

  // Mock hints data
  const hints = [
    "Try breaking down the problem into smaller steps",
    "Remember to handle edge cases",
    "Consider using array methods like map() or filter()",
    "Don't forget to add error handling",
  ]

  // Add example solutions
  const exampleSolutions = {
    "interactive-todo-list": `// Complete Todo List Implementation
document.addEventListener('DOMContentLoaded', () => {
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');
  
  // Load existing todos
  let todos = JSON.parse(localStorage.getItem('todos') || '[]');
  
  // Render existing todos
  todos.forEach(todo => addTodoToDOM(todo));
  
  // Add new todo
  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    
    if (text) {
      const todo = { id: Date.now(), text, completed: false };
      todos.push(todo);
      addTodoToDOM(todo);
      saveTodos();
      todoInput.value = '';
    }
  });
  
  function addTodoToDOM(todo) {
    const li = document.createElement('li');
    li.dataset.id = todo.id;
    li.innerHTML = \`
      <input type="checkbox" \${todo.completed ? 'checked' : ''}>
      <span class="\${todo.completed ? 'completed' : ''}">\${todo.text}</span>
      <button class="delete">Delete</button>
    \`;
    
    // Toggle completion
    const checkbox = li.querySelector('input');
    checkbox.addEventListener('change', () => {
      todo.completed = checkbox.checked;
      li.querySelector('span').classList.toggle('completed');
      saveTodos();
    });
    
    // Delete todo
    const deleteBtn = li.querySelector('.delete');
    deleteBtn.addEventListener('click', () => {
      li.remove();
      todos = todos.filter(t => t.id !== todo.id);
      saveTodos();
    });
    
    todoList.appendChild(li);
  }
  
  function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }
});`,
    "weather-app": `// Complete Weather App Implementation
document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('search-btn');
  const cityInput = document.getElementById('city-input');
  const weatherInfo = document.getElementById('weather-info');
  
  const API_KEY = 'YOUR_API_KEY'; // Replace with your API key
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
  
  searchBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    
    if (!city) return;
    
    try {
      weatherInfo.innerHTML = 'Loading...';
      const data = await getWeatherData(city);
      displayWeatherData(data);
    } catch (error) {
      weatherInfo.innerHTML = \`
        <div class="error">
          \${error.message}
        </div>
      \`;
    }
  });
  
  async function getWeatherData(city) {
    const response = await fetch(
      \`\${BASE_URL}?q=\${city}&units=metric&appid=\${API_KEY}\`
    );
    
    if (!response.ok) {
      throw new Error('City not found or API error');
    }
    
    return response.json();
  }
  
  function displayWeatherData(data) {
    const temp = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    
    weatherInfo.innerHTML = \`
      <div class="weather-card">
        <h2>\${data.name}, \${data.sys.country}</h2>
        <div class="temp">\${temp}°C</div>
        <div class="description">
          <img src="https://openweathermap.org/img/wn/\${data.weather[0].icon}.png">
          \${data.weather[0].description}
        </div>
        <div class="details">
          <p>Feels like: \${feelsLike}°C</p>
          <p>Humidity: \${data.main.humidity}%</p>
          <p>Wind: \${data.wind.speed} m/s</p>
        </div>
      </div>
    \`;
  }
});`
  }

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
    // Set initial code based on lab
    if (labId === "interactive-todo-list") {
      setCode(`// Todo List App

// HTML Structure (already set up for you)
// <div id="app">
//   <h1>Todo List</h1>
//   <form id="todo-form">
//     <input type="text" id="todo-input" placeholder="Add a new task...">
//     <button type="submit">Add</button>
//   </form>
//   <ul id="todo-list"></ul>
// </div>

// Your JavaScript code goes here
document.addEventListener('DOMContentLoaded', () => {
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');
  
  // TODO: Add event listener to the form
  
  // TODO: Create function to add a new todo
  
  // TODO: Create function to delete a todo
  
  // TODO: Load todos from localStorage (bonus)
  
  // TODO: Save todos to localStorage (bonus)
});`)
    } else if (labId === "weather-app") {
      setCode(`// Weather App

// HTML Structure (already set up for you)
// <div id="app">
//   <h1>Weather App</h1>
//   <div class="search">
//     <input type="text" id="city-input" placeholder="Enter city name...">
//     <button id="search-btn">Search</button>
//   </div>
//   <div id="weather-info"></div>
// </div>

// Your JavaScript code goes here
document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('search-btn');
  const cityInput = document.getElementById('city-input');
  const weatherInfo = document.getElementById('weather-info');
  
  // TODO: Add API key (use a free weather API)
  const apiKey = 'YOUR_API_KEY';
  
  // TODO: Add event listener to the search button
  
  // TODO: Create function to fetch weather data
  
  // TODO: Create function to display weather data
  
  // TODO: Handle errors
});`)
    } else {
      setCode(`// Your code here`)
    }
  }, [labId])

  const handleRunCode = () => {
    setIsRunning(true)
    setOutput("")

    // Simulate code execution with more detailed output
    setTimeout(() => {
      if (labId === "interactive-todo-list") {
        setOutput(`
=== Execution Results ===
✓ HTML structure initialized
✓ Event listeners attached
✓ Local storage configured
> Console output:
  - Todo list mounted
  - Ready to add tasks
  - Storage synced

No errors detected.
        `)
      } else if (labId === "weather-app") {
        setOutput(`
=== Execution Results ===
✓ API configuration loaded
⚠ Warning: API key not set
✓ UI components mounted
> Console output:
  - Weather app initialized
  - Search functionality ready
  - Display components prepared

Action required: Add API key to proceed.
        `)
      }
      setIsRunning(false)
    }, 1500)
  }

  const handleReset = () => {
    // Reset code to initial state
    if (window.confirm("Are you sure you want to reset your code? All changes will be lost.")) {
      setCode(getInitialCode(labId))
    }
  }

  const handleSave = () => {
    // Save code progress
    localStorage.setItem(`lab-${labId}-progress`, code)
    alert("Progress saved successfully!")
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={user} />

      <main className="flex-1 p-4 lg:p-6">
        <motion.div
          className="mx-auto max-w-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="pl-0" asChild>
                <Link href="/labs">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Labs
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{labId === "interactive-todo-list" ? "JavaScript" : "React"}</Badge>
                <Badge variant="outline">{labId === "interactive-todo-list" ? "Beginner" : "Intermediate"}</Badge>
                <Badge variant="outline">
                  <Timer className="mr-1 h-3 w-3" />
                  {labId === "interactive-todo-list" ? "45 min" : "90 min"}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowHints(!showHints)}>
                <HelpCircle className="mr-2 h-4 w-4" />
                Hints
              </Button>
              <Button variant="outline" size="sm" onClick={() => setViewMode(viewMode === "split" ? "full" : "split")}>
                <Layout className="mr-2 h-4 w-4" />
                {viewMode === "split" ? "Full View" : "Split View"}
              </Button>
            </div>
          </div>

          <div className={`grid gap-6 ${viewMode === "split" ? "lg:grid-cols-2" : "grid-cols-1"}`}>
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">{labId === "interactive-todo-list" ? "Interactive To-Do List" : "Weather App"}</CardTitle>
                      <CardDescription className="mt-2">
                        {labId === "interactive-todo-list"
                          ? "Build a functional to-do list with JavaScript"
                          : "Create a weather app using a public API"}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>2.5k students</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span>4.8 (420 reviews)</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>89% completion rate</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Your Progress</span>
                        <span>45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="instructions" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="instructions">Instructions</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                  <TabsTrigger value="discussion">Discussion</TabsTrigger>
                </TabsList>

                <TabsContent value="instructions" className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="prose max-w-none dark:prose-invert">
                        <h3>Task Overview</h3>
                        <p>In this lab, you'll create a {labId === "interactive-todo-list" ? "functional to-do list application" : "weather application"} using modern web technologies.</p>
                        
                        <h4>Requirements</h4>
                        <ul>
                          {labId === "interactive-todo-list" ? (
                            <>
                              <li>Create a form to add new tasks</li>
                              <li>Implement task deletion functionality</li>
                              <li>Add task completion toggling</li>
                              <li>Persist tasks using localStorage</li>
                            </>
                          ) : (
                            <>
                              <li>Implement city search functionality</li>
                              <li>Display current weather conditions</li>
                              <li>Show 5-day weather forecast</li>
                              <li>Handle API errors gracefully</li>
                            </>
                          )}
                        </ul>

                        <h4>Bonus Challenges</h4>
                        <ul>
                          {labId === "interactive-todo-list" ? (
                            <>
                              <li>Add task categories</li>
                              <li>Implement task priority levels</li>
                              <li>Add due dates to tasks</li>
                            </>
                          ) : (
                            <>
                              <li>Add temperature unit conversion</li>
                              <li>Show weather maps</li>
                              <li>Add location auto-complete</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  {showHints && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Helpful Hints</CardTitle>
                        <CardDescription>Use these hints if you get stuck</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {hints.map((hint, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                              <span>{hint}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="resources" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Learning Resources</CardTitle>
                      <CardDescription>Helpful documentation and examples</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {resources.map((resource, index) => (
                          <a
                            key={index}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted"
                          >
                            <div className="flex items-center gap-3">
                              {resource.icon}
                              <div>
                                <div className="font-medium">{resource.title}</div>
                                <div className="text-sm text-muted-foreground">{resource.type}</div>
                              </div>
                            </div>
                            <ArrowRight className="h-4 w-4" />
                          </a>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Starter Files</CardTitle>
                      <CardDescription>Download the starter files to begin</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Download Files
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="discussion" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Community Discussion</CardTitle>
                      <CardDescription>Ask questions and share solutions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Add discussion component here */}
                      <div className="text-center text-muted-foreground">
                        Join the discussion to get help and share your solutions
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileCode className="h-5 w-5 text-primary" />
                      <span className="font-medium">Code Editor</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={handleReset}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Reset
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleSave}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Progress
                      </Button>
                      <Button size="sm" onClick={handleRunCode} disabled={isRunning}>
                        {isRunning ? (
                          <>
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            Running...
                          </>
                        ) : (
                          <>
                            <PlayCircle className="mr-2 h-4 w-4" />
                            Run Code
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Editor Guidelines</AlertTitle>
                      <AlertDescription>
                        1. Write your code in the editor below
                        2. Use the "Run Code" button to test your solution
                        3. Save your progress regularly
                        4. Check the console output for errors
                      </AlertDescription>
                    </Alert>

                    <Accordion type="single" collapsible>
                      <AccordionItem value="syntax">
                        <AccordionTrigger>
                          <div className="flex items-center gap-2">
                            <Code2 className="h-4 w-4" />
                            Syntax Guide
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 text-sm">
                            <p><code>document.querySelector()</code> - Select elements</p>
                            <p><code>addEventListener()</code> - Handle events</p>
                            <p><code>localStorage</code> - Store data locally</p>
                            <p><code>fetch()</code> - Make API requests</p>
                            <p><code>async/await</code> - Handle asynchronous code</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="example">
                        <AccordionTrigger>
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4" />
                            Example Solution
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 text-sm">
                            <p className="text-muted-foreground">Click to reveal a complete solution example:</p>
                            <Button 
                              variant="outline" 
                              className="w-full"
                              onClick={() => {
                                if (confirm("Are you sure you want to see the solution? Try solving it yourself first!")) {
                                  setCode(exampleSolutions[labId] || "// No example solution available")
                                }
                              }}
                            >
                              Show Solution
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <Textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="font-mono min-h-[400px] resize-none"
                      placeholder="Write your code here..."
                      spellCheck={false}
                      style={{
                        tabSize: 2,
                        fontFamily: "monospace",
                      }}
                    />

                    {output && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Terminal className="h-4 w-4" />
                          <span className="font-medium">Console Output</span>
                        </div>
                        <pre className="bg-muted p-4 rounded-md overflow-x-auto whitespace-pre-wrap text-sm font-mono">
                          {output}
                        </pre>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Button
                className="w-full"
                size="lg"
                onClick={() => setLabCompleted(true)}
                disabled={!code.trim()}
              >
                {labCompleted ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Completed
                  </>
                ) : (
                  "Mark as Complete"
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

