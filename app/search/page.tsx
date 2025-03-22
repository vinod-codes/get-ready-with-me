"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Filter, SearchIcon, User, Video } from "lucide-react"
import DashboardHeader from "@/app/dashboard/dashboard-header"
import { getCurrentUser } from "@/app/actions/auth-actions"

type UserType = {
  id: string
  name: string
  email: string
  image: string
} | null

type SearchResult = {
  id: string
  type: "tutorial" | "routine" | "post" | "user"
  title: string
  description: string
  author: {
    name: string
    image: string
    initials: string
  }
  category: string
  date: string
  duration?: string
  image?: string
}

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const [user, setUser] = useState<UserType>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(query)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
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
        setUser(userData)
      } catch (error) {
        console.error("Failed to load user data", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [router])

  useEffect(() => {
    // Simulate search results
    if (query) {
      setIsLoading(true)

      // Mock API call
      setTimeout(() => {
        const mockResults: SearchResult[] = [
          {
            id: "1",
            type: "tutorial",
            title: "5-Minute Everyday Makeup Tutorial",
            description: "Quick and easy makeup routine for busy mornings",
            author: {
              name: "Sarah Johnson",
              image: "/placeholder.svg?height=40&width=40",
              initials: "SJ",
            },
            category: "Makeup",
            date: "2 weeks ago",
            duration: "5 min",
          },
          {
            id: "2",
            type: "routine",
            title: "Morning Skincare Routine for Dry Skin",
            description: "Hydrating morning routine for dry and sensitive skin",
            author: {
              name: "Michael Chen",
              image: "/placeholder.svg?height=40&width=40",
              initials: "MC",
            },
            category: "Skincare",
            date: "3 days ago",
            duration: "15 min",
          },
          {
            id: "3",
            type: "post",
            title: "My Favorite Summer Products",
            description: "The best products to keep you looking fresh all summer",
            author: {
              name: "Alicia Rodriguez",
              image: "/placeholder.svg?height=40&width=40",
              initials: "AR",
            },
            category: "Product Review",
            date: "1 week ago",
          },
          {
            id: "4",
            type: "user",
            title: "BeautyGuru123",
            description: "Makeup artist and skincare enthusiast",
            author: {
              name: "BeautyGuru123",
              image: "/placeholder.svg?height=40&width=40",
              initials: "BG",
            },
            category: "User",
            date: "Member since 2022",
          },
        ]

        setSearchResults(mockResults)
        setIsLoading(false)
      }, 1000)
    }
  }, [query])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
  }

  function getFilteredResults() {
    if (activeTab === "all") {
      return searchResults
    }
    return searchResults.filter((result) => result.type === activeTab)
  }

  if (isLoading && !searchResults.length) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={user} />

      <main className="flex-1 p-6 lg:p-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <h1 className="mb-4 text-3xl font-bold">Search</h1>

            <form onSubmit={handleSearch} className="flex w-full items-center space-x-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for tutorials, routines, posts, or users..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit">Search</Button>
              <Button type="button" variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-4 w-4" />
                <span className="sr-only">Toggle filters</span>
              </Button>
            </form>

            {showFilters && (
              <div className="mt-4 rounded-lg border p-4">
                <h3 className="mb-2 font-medium">Filters</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option value="">All Categories</option>
                      <option value="skincare">Skincare</option>
                      <option value="makeup">Makeup</option>
                      <option value="hair">Hair</option>
                      <option value="fashion">Fashion</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Duration</label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option value="">Any Duration</option>
                      <option value="short">Under 5 minutes</option>
                      <option value="medium">5-15 minutes</option>
                      <option value="long">Over 15 minutes</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date</label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option value="">Any Time</option>
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                      <option value="year">This Year</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sort By</label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option value="relevance">Relevance</option>
                      <option value="date">Date (Newest)</option>
                      <option value="popular">Popularity</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    Reset
                  </Button>
                  <Button size="sm">Apply Filters</Button>
                </div>
              </div>
            )}
          </div>

          {query ? (
            <>
              <div className="mb-6">
                <h2 className="text-lg font-medium">
                  {searchResults.length} results for "{query}"
                </h2>
              </div>

              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="tutorial">Tutorials</TabsTrigger>
                  <TabsTrigger value="routine">Routines</TabsTrigger>
                  <TabsTrigger value="post">Posts</TabsTrigger>
                  <TabsTrigger value="user">Users</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-6">
                  {getFilteredResults().map((result) => (
                    <SearchResultCard key={result.id} result={result} />
                  ))}
                </TabsContent>

                <TabsContent value="tutorial" className="space-y-6">
                  {getFilteredResults().map((result) => (
                    <SearchResultCard key={result.id} result={result} />
                  ))}
                </TabsContent>

                <TabsContent value="routine" className="space-y-6">
                  {getFilteredResults().map((result) => (
                    <SearchResultCard key={result.id} result={result} />
                  ))}
                </TabsContent>

                <TabsContent value="post" className="space-y-6">
                  {getFilteredResults().map((result) => (
                    <SearchResultCard key={result.id} result={result} />
                  ))}
                </TabsContent>

                <TabsContent value="user" className="space-y-6">
                  {getFilteredResults().map((result) => (
                    <SearchResultCard key={result.id} result={result} />
                  ))}
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border p-8 text-center">
              <SearchIcon className="h-12 w-12 text-muted-foreground" />
              <h2 className="text-xl font-medium">Search for content</h2>
              <p className="text-muted-foreground">Enter a search term to find tutorials, routines, posts, and users</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

function SearchResultCard({ result }: { result: SearchResult }) {
  const TypeIcon = () => {
    switch (result.type) {
      case "tutorial":
        return <Video className="h-4 w-4" />
      case "routine":
        return <Clock className="h-4 w-4" />
      case "post":
        return <SearchIcon className="h-4 w-4" />
      case "user":
        return <User className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="flex items-center space-x-1">
                <TypeIcon />
                <span className="capitalize">{result.type}</span>
              </Badge>
              <Badge variant="secondary">{result.category}</Badge>
            </div>
            <CardTitle className="mt-2">
              <Link href={`/${result.type}s/${result.id}`} className="hover:text-primary hover:underline">
                {result.title}
              </Link>
            </CardTitle>
            <CardDescription className="mt-1">{result.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={result.author.image} alt={result.author.name} />
              <AvatarFallback>{result.author.initials}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{result.author.name}</span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            {result.duration && (
              <div className="flex items-center">
                <Clock className="mr-1 h-3 w-3" />
                <span>{result.duration}</span>
              </div>
            )}
            <span>{result.date}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link href={`/${result.type}s/${result.id}`}>View {result.type}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

