"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, MessageSquare, Heart, Eye, BookmarkPlus, Share2, ThumbsUp, User, Users } from "lucide-react"
import { getCurrentUser } from "@/app/actions/auth-actions"
import DashboardHeader from "@/app/dashboard/dashboard-header"

type CommunityUser = {
  id: string
  name: string
  email: string
  image: string
}

type Post = {
  id: string
  title: string
  content: string
  author: {
    id: string
    name: string
    image: string
    role: string
  }
  category: string
  tags: string[]
  createdAt: string
  likes: number
  comments: number
  views: number
  isLiked: boolean
  isBookmarked: boolean
}

export default function CommunityPage() {
  const router = useRouter()
  const [user, setUser] = useState<CommunityUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("discussions")
  const [showFilters, setShowFilters] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    async function loadUser() {
      try {
        const userData = await getCurrentUser()
        if (!userData) {
          router.push("/auth/login")
          return
        }
        setUser(userData as CommunityUser)
      } catch (error) {
        console.error("Failed to load user data", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [router])

  useEffect(() => {
    // Mock posts data
    const mockPosts: Post[] = [
      {
        id: "1",
        title: "How to structure a React project for scalability?",
        content:
          "I'm starting a new React project and want to make sure I structure it in a way that will scale well as the project grows. What are some best practices for organizing components, state management, and API calls?",
        author: {
          id: "user-1",
          name: "Sarah Johnson",
          image: "/placeholder.svg?height=40&width=40",
          role: "Frontend Developer",
        },
        category: "React",
        tags: ["project-structure", "best-practices", "scalability"],
        createdAt: "2 hours ago",
        likes: 24,
        comments: 12,
        views: 156,
        isLiked: false,
        isBookmarked: false,
      },
      {
        id: "2",
        title: "Understanding CSS Grid vs Flexbox",
        content:
          "I'm trying to understand when to use CSS Grid versus Flexbox. Can someone explain the key differences and when each one is more appropriate?",
        author: {
          id: "user-2",
          name: "Michael Chen",
          image: "/placeholder.svg?height=40&width=40",
          role: "UI Designer",
        },
        category: "CSS",
        tags: ["grid", "flexbox", "layout"],
        createdAt: "5 hours ago",
        likes: 18,
        comments: 8,
        views: 112,
        isLiked: true,
        isBookmarked: true,
      },
      {
        id: "3",
        title: "JavaScript Promise.all vs Promise.allSettled",
        content:
          "I'm working with multiple API calls and need to understand the difference between Promise.all and Promise.allSettled. When should I use each one?",
        author: {
          id: "user-3",
          name: "Alex Rodriguez",
          image: "/placeholder.svg?height=40&width=40",
          role: "Full Stack Developer",
        },
        category: "JavaScript",
        tags: ["promises", "async", "api"],
        createdAt: "1 day ago",
        likes: 32,
        comments: 15,
        views: 203,
        isLiked: false,
        isBookmarked: true,
      },
      {
        id: "4",
        title: "Best resources for learning React Hooks?",
        content:
          "I'm transitioning from class components to functional components with hooks. What are the best resources (tutorials, courses, articles) for mastering React Hooks?",
        author: {
          id: "user-4",
          name: "Emily Wilson",
          image: "/placeholder.svg?height=40&width=40",
          role: "Junior Developer",
        },
        category: "React",
        tags: ["hooks", "learning", "resources"],
        createdAt: "2 days ago",
        likes: 45,
        comments: 22,
        views: 310,
        isLiked: true,
        isBookmarked: false,
      },
      {
        id: "5",
        title: "How to optimize website performance?",
        content:
          "My website is loading slowly, especially on mobile devices. What are some techniques to improve performance and page load times?",
        author: {
          id: "user-5",
          name: "David Kim",
          image: "/placeholder.svg?height=40&width=40",
          role: "Performance Engineer",
        },
        category: "Performance",
        tags: ["optimization", "speed", "web-vitals"],
        createdAt: "3 days ago",
        likes: 56,
        comments: 28,
        views: 425,
        isLiked: false,
        isBookmarked: false,
      },
    ]

    setPosts(mockPosts)
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  function handleLikePost(postId: string) {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
  }

  function handleBookmarkPost(postId: string) {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isBookmarked: !post.isBookmarked,
            }
          : post,
      ),
    )
  }

  function getFilteredPosts() {
    let filtered = [...posts]

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Filter by category based on active tab
    if (activeTab === "react") {
      filtered = filtered.filter((post) => post.category === "React")
    } else if (activeTab === "javascript") {
      filtered = filtered.filter((post) => post.category === "JavaScript")
    } else if (activeTab === "css") {
      filtered = filtered.filter((post) => post.category === "CSS")
    } else if (activeTab === "bookmarks") {
      filtered = filtered.filter((post) => post.isBookmarked)
    }

    return filtered
  }

  const popularTags = [
    { name: "react", count: 128 },
    { name: "javascript", count: 95 },
    { name: "css", count: 82 },
    { name: "html", count: 76 },
    { name: "typescript", count: 64 },
    { name: "next.js", count: 58 },
    { name: "tailwind", count: 47 },
    { name: "api", count: 42 },
  ]

  const topContributors = [
    {
      id: "user-1",
      name: "Sarah Johnson",
      image: "/placeholder.svg?height=40&width=40",
      role: "Frontend Developer",
      posts: 32,
      likes: 245,
    },
    {
      id: "user-2",
      name: "Michael Chen",
      image: "/placeholder.svg?height=40&width=40",
      role: "UI Designer",
      posts: 28,
      likes: 210,
    },
    {
      id: "user-3",
      name: "Alex Rodriguez",
      image: "/placeholder.svg?height=40&width=40",
      role: "Full Stack Developer",
      posts: 25,
      likes: 198,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={user} />

      <main className="flex-1 p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Community</h1>
              <p className="text-muted-foreground">Connect with other developers, ask questions, and share knowledge</p>
            </div>
            <Button asChild>
              <Link href="/community/new-post">
                <MessageSquare className="mr-2 h-4 w-4" />
                New Post
              </Link>
            </Button>
          </div>

          <div className="grid gap-8 lg:grid-cols-4">
            <div className="lg:col-span-3">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1 sm:w-[300px]">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search discussions..."
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

                <Tabs defaultValue="discussions" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="discussions">All</TabsTrigger>
                    <TabsTrigger value="react">React</TabsTrigger>
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    <TabsTrigger value="css">CSS</TabsTrigger>
                    <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {showFilters && (
                <div className="mb-6 rounded-lg border p-4">
                  <h3 className="mb-2 font-medium">Filters</h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Sort By</label>
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option value="recent">Most Recent</option>
                        <option value="popular">Most Popular</option>
                        <option value="comments">Most Comments</option>
                        <option value="views">Most Views</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Time Period</label>
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option value="all">All Time</option>
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="year">This Year</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Tags</label>
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option value="">All Tags</option>
                        <option value="react">React</option>
                        <option value="javascript">JavaScript</option>
                        <option value="css">CSS</option>
                        <option value="html">HTML</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Status</label>
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option value="all">All Posts</option>
                        <option value="answered">Answered</option>
                        <option value="unanswered">Unanswered</option>
                        <option value="solved">Solved</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearchQuery("")
                        setActiveTab("discussions")
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

              <div className="space-y-4">
                {getFilteredPosts().length > 0 ? (
                  getFilteredPosts().map((post) => (
                    <Card key={post.id} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarImage src={post.author.image} alt={post.author.name} />
                              <AvatarFallback>
                                {post.author.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{post.author.name}</div>
                              <div className="text-xs text-muted-foreground">{post.author.role}</div>
                            </div>
                          </div>
                          <Badge variant="outline">{post.category}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <Link href={`/community/post/${post.id}`} className="hover:underline">
                          <h3 className="text-xl font-bold">{post.title}</h3>
                        </Link>
                        <p className="mt-2 line-clamp-2 text-muted-foreground">{post.content}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="font-normal">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-3">
                        <div className="flex w-full items-center justify-between">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <span>{post.createdAt}</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleLikePost(post.id)}
                              >
                                <Heart className={`h-4 w-4 ${post.isLiked ? "fill-red-500 text-red-500" : ""}`} />
                                <span className="sr-only">Like</span>
                              </Button>
                              <span className="text-xs">{post.likes}</span>
                            </div>
                            <div className="flex items-center">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MessageSquare className="h-4 w-4" />
                                <span className="sr-only">Comments</span>
                              </Button>
                              <span className="text-xs">{post.comments}</span>
                            </div>
                            <div className="flex items-center">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">Views</span>
                              </Button>
                              <span className="text-xs">{post.views}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleBookmarkPost(post.id)}
                            >
                              <BookmarkPlus
                                className={`h-4 w-4 ${post.isBookmarked ? "fill-primary text-primary" : ""}`}
                              />
                              <span className="sr-only">Bookmark</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Share2 className="h-4 w-4" />
                              <span className="sr-only">Share</span>
                            </Button>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No discussions found</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Try adjusting your search or filter to find what you're looking for.
                    </p>
                    <Button className="mt-4" asChild>
                      <Link href="/community/new-post">Start a New Discussion</Link>
                    </Button>
                  </div>
                )}
              </div>

              {getFilteredPosts().length > 0 && (
                <div className="mt-6 flex justify-center">
                  <Button variant="outline">Load More</Button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Popular Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <Badge key={tag.name} variant="secondary" className="flex items-center gap-1">
                        {tag.name}
                        <span className="rounded-full bg-muted px-1.5 text-xs">{tag.count}</span>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Contributors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topContributors.map((contributor) => (
                      <div key={contributor.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={contributor.image} alt={contributor.name} />
                            <AvatarFallback>
                              {contributor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{contributor.name}</div>
                            <div className="text-xs text-muted-foreground">{contributor.role}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <MessageSquare className="mr-1 h-3 w-3" />
                            <span>{contributor.posts}</span>
                          </div>
                          <div className="flex items-center">
                            <ThumbsUp className="mr-1 h-3 w-3" />
                            <span>{contributor.likes}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full" asChild>
                    <Link href="/community/contributors">View All Contributors</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Community Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>Members</span>
                      </div>
                      <span className="font-medium">12,458</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <MessageSquare className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>Discussions</span>
                      </div>
                      <span className="font-medium">8,642</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>Online Now</span>
                      </div>
                      <span className="font-medium">243</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

