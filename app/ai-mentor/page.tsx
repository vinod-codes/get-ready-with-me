"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRight, Brain, Copy, MessageSquare, RefreshCw, ThumbsUp, ThumbsDown } from "lucide-react"
import { getCurrentUser } from "@/app/actions/auth-actions"
import DashboardHeader from "@/app/dashboard/dashboard-header"

type User = {
  id: string
  name: string
  email: string
  image: string
}

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
  code?: string
  language?: string
}

type Conversation = {
  id: string
  title: string
  lastMessage: string
  timestamp: string
  messages: Message[]
}

export default function AIMentorPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [message, setMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

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
    // Mock conversations data
    const mockConversations: Conversation[] = [
      {
        id: "c1",
        title: "React Hooks Help",
        lastMessage: "How do I use useEffect with dependencies?",
        timestamp: "2 hours ago",
        messages: [
          {
            id: "m1",
            role: "user",
            content: "I'm confused about React hooks. How do I use useEffect with dependencies?",
            timestamp: "2 hours ago",
          },
          {
            id: "m2",
            role: "assistant",
            content:
              "The useEffect hook in React allows you to perform side effects in your functional components. When you specify dependencies, the effect will only run when those dependencies change.",
            timestamp: "2 hours ago",
            code: `// This effect runs only when count changes
useEffect(() => {
  document.title = \`You clicked \${count} times\`;
}, [count]); // Only re-run if count changes

// This effect runs only once (on mount)
useEffect(() => {
  console.log('Component mounted');
}, []); // Empty dependency array

// This effect runs on every render
useEffect(() => {
  console.log('Component updated');
}); // No dependency array`,
            language: "javascript",
          },
        ],
      },
      {
        id: "c2",
        title: "CSS Grid Layout",
        lastMessage: "How do I create a responsive grid?",
        timestamp: "1 day ago",
        messages: [
          {
            id: "m1",
            role: "user",
            content: "I'm trying to create a responsive grid layout. What's the best approach with CSS Grid?",
            timestamp: "1 day ago",
          },
          {
            id: "m2",
            role: "assistant",
            content:
              "CSS Grid is perfect for creating responsive layouts. Here's a simple example of a responsive grid that adjusts the number of columns based on the available space:",
            timestamp: "1 day ago",
            code: `.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.grid-item {
  background-color: #f0f0f0;
  padding: 1rem;
  border-radius: 4px;
}`,
            language: "css",
          },
        ],
      },
    ]

    setConversations(mockConversations)
    setActiveConversation(mockConversations[0])
  }, [])

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [activeConversation?.messages])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  function handleSendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!message.trim() || !activeConversation) return

    // Add user message
    const userMessage: Message = {
      id: `m${activeConversation.messages.length + 1}`,
      role: "user",
      content: message,
      timestamp: "Just now",
    }

    const updatedConversation = {
      ...activeConversation,
      messages: [...activeConversation.messages, userMessage],
      lastMessage: message,
      timestamp: "Just now",
    }

    setActiveConversation(updatedConversation)
    setConversations((prev) => prev.map((conv) => (conv.id === activeConversation.id ? updatedConversation : conv)))
    setMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: `m${updatedConversation.messages.length + 1}`,
        role: "assistant",
        content: "",
        timestamp: "Just now",
      }

      // Generate response based on user message
      if (message.toLowerCase().includes("javascript") || message.toLowerCase().includes("js")) {
        aiResponse.content =
          "JavaScript is a versatile programming language primarily used for web development. Here's a simple example of a JavaScript function:"
        aiResponse.code = `function greet(name) {
  return \`Hello, \${name}! Welcome to JavaScript.\`;
}

// Example usage
const greeting = greet('John');
console.log(greeting); // Output: Hello, John! Welcome to JavaScript.`
        aiResponse.language = "javascript"
      } else if (message.toLowerCase().includes("css") || message.toLowerCase().includes("style")) {
        aiResponse.content =
          "CSS (Cascading Style Sheets) is used to style HTML elements. Here's an example of a simple CSS rule:"
        aiResponse.code = `.button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #45a049;
}`
        aiResponse.language = "css"
      } else if (message.toLowerCase().includes("react") || message.toLowerCase().includes("component")) {
        aiResponse.content =
          "React is a JavaScript library for building user interfaces. Here's an example of a simple React functional component:"
        aiResponse.code = `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
    </div>
  );
}

export default Counter;`
        aiResponse.language = "jsx"
      } else {
        aiResponse.content =
          "I'm here to help with your coding questions! Feel free to ask about JavaScript, React, CSS, HTML, or any other web development topic. I can provide explanations, code examples, and best practices to help you learn and solve problems."
      }

      const finalConversation = {
        ...updatedConversation,
        messages: [...updatedConversation.messages, aiResponse],
      }

      setActiveConversation(finalConversation)
      setConversations((prev) => prev.map((conv) => (conv.id === activeConversation.id ? finalConversation : conv)))
      setIsTyping(false)
    }, 1500)
  }

  function handleNewConversation() {
    const newConversation: Conversation = {
      id: `c${conversations.length + 1}`,
      title: "New Conversation",
      lastMessage: "",
      timestamp: "Just now",
      messages: [
        {
          id: "m1",
          role: "assistant",
          content: "Hi there! I'm your AI mentor. How can I help you with coding or learning today?",
          timestamp: "Just now",
        },
      ],
    }

    setConversations([newConversation, ...conversations])
    setActiveConversation(newConversation)
    setMessage("")
  }

  function handleSelectConversation(conversationId: string) {
    const selected = conversations.find((conv) => conv.id === conversationId)
    if (selected) {
      setActiveConversation(selected)
    }
  }

  function renderMessageContent(message: Message) {
    if (!message.code) {
      return <p className="whitespace-pre-wrap">{message.content}</p>
    }

    return (
      <div>
        <p className="whitespace-pre-wrap">{message.content}</p>
        <div className="mt-3 rounded-md bg-muted">
          <div className="flex items-center justify-between border-b bg-muted px-4 py-2">
            <div className="text-sm font-medium">{message.language || "code"}</div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy code</span>
            </Button>
          </div>
          <pre className="overflow-x-auto p-4">
            <code>{message.code}</code>
          </pre>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={user} />

      <main className="flex-1">
        <div className="grid h-[calc(100vh-4rem)] grid-cols-1 md:grid-cols-4">
          {/* Sidebar */}
          <div className="border-r md:col-span-1">
            <div className="flex h-14 items-center justify-between border-b px-4">
              <h2 className="font-medium">Conversations</h2>
              <Button size="sm" onClick={handleNewConversation}>
                <MessageSquare className="mr-2 h-4 w-4" />
                New Chat
              </Button>
            </div>

            <div className="h-[calc(100vh-8rem)] overflow-y-auto">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`cursor-pointer border-b p-4 hover:bg-accent/50 ${
                    activeConversation?.id === conversation.id ? "bg-accent" : ""
                  }`}
                  onClick={() => handleSelectConversation(conversation.id)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{conversation.title}</h3>
                      <p className="line-clamp-1 text-sm text-muted-foreground">
                        {conversation.lastMessage || "New conversation"}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main chat area */}
          <div className="flex flex-col md:col-span-3">
            {activeConversation ? (
              <>
                <div className="flex h-14 items-center justify-between border-b px-4">
                  <div className="flex items-center">
                    <Avatar className="mr-2 h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Mentor" />
                      <AvatarFallback>
                        <Brain className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="font-medium">{activeConversation.title}</h2>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Regenerate
                    </Button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                  {activeConversation.messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        {renderMessageContent(msg)}
                        <div className="mt-2 flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">{msg.timestamp}</span>
                          {msg.role === "assistant" && (
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <ThumbsUp className="h-3 w-3" />
                                <span className="sr-only">Helpful</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <ThumbsDown className="h-3 w-3" />
                                <span className="sr-only">Not helpful</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Copy className="h-3 w-3" />
                                <span className="sr-only">Copy</span>
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-lg bg-muted p-4">
                        <div className="flex space-x-2">
                          <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"></div>
                          <div
                            className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                <div className="border-t p-4">
                  <form onSubmit={handleSendMessage} className="flex space-x-2">
                    <Textarea
                      placeholder="Ask me anything about coding..."
                      className="min-h-[60px] flex-1"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button type="submit" className="self-end" disabled={isTyping}>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                <Brain className="h-16 w-16 text-muted-foreground" />
                <h2 className="mt-4 text-2xl font-bold">AI Mentor</h2>
                <p className="mt-2 text-muted-foreground">Your personal coding assistant and learning companion</p>
                <Button className="mt-6" onClick={handleNewConversation}>
                  Start a New Conversation
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

