"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Heart,
  MessageSquare,
  BookmarkPlus,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Flag,
  CheckCircle,
  Clock,
} from "lucide-react"
import { getCurrentUser } from "@/app/actions/auth-actions"
import DashboardHeader from "@/app/dashboard/dashboard-header"

type User = {
  id: string
  name: string
  email: string
  image: string
}

type Comment = {
  id: string
  content: string
  author: {
    id: string
    name: string
    image: string
    role: string
  }
  createdAt: string
  likes: number
  isLiked: boolean
  isAcceptedAnswer: boolean
}

export default function PostDetailPage({ params }: { params: { postId: string } }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [post, setPost] = useState<any>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    async function loadUser() {
      try {
        const userData = await getCurrentUser()\
          => {
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
    // Mock post data
    const mockPost = {
      id: params.postId,
      title: "How to structure a React project for scalability?",
      content: "I'm starting a new React project and want to make sure I structure it in a way that will scale well as the project grows. What are some best practices for organizing components, state management, and API calls?\n\nI've been reading about different approaches like feature-based organization, atomic design, and the container/presentational pattern. I'm also considering different state management solutions like Redux, Context API, or Zustand.\n\nWhat has worked well for you in large-scale projects? Any pitfalls to avoid?",
      author: {
        id: "user-1",
        name: "Sarah Johnson",
        image: "/placeholder.svg?height=40&width=40",
        role: "Frontend Developer"
      },
      category: "React",
      tags: ["project-structure", "best-practices", "scalability"],
      createdAt: "2 hours ago",
      likes: 24,
      comments: 12,
      views: 156,
      isLiked: false,
      isBookmarked: false
    }

    // Mock comments data
    const mockComments: Comment[] = [
      {
        id: "c1",
        content: "I've found that organizing by features rather than by type (components, reducers, etc.) works best for scalability. Each feature folder contains all the components, hooks, and state management related to that feature.",
        author: {
          id: "user-2",
          name: "Michael Chen",
          image: "/placeholder.svg?height=40&width=40",
          role: "Senior Frontend Developer"
        },
        createdAt: "1 hour ago",
        likes: 8,
        isLiked: false,
        isAcceptedAnswer: true
      },
      {
        id: "c2",
        content: "For state management, I'd recommend starting with React's built-in Context API and hooks. Only reach for Redux or other solutions when you have a clear need for it. Premature optimization can lead to unnecessary complexity.",
        author: {
          id: "user-3",
          name: "Alex Rodriguez",
          image: "/placeholder.svg?height=40&width=40",
          role: "Full Stack Developer"
        },
        createdAt: "45 minutes ago",
        likes: 5,
        isLiked: true,
        isAcceptedAnswer: false
      },
      {
        id: "c3",
        content: "Don't forget about testing! Structure your project in a way that makes it easy to test components in isolation. This usually means smaller, more focused components with clear responsibilities.",
        author: {
          id: "user-4",
          name: "Emily Wilson",
          image: "/placeholder.svg?height=40&width=40",
          role: "QA Engineer"
        },
        createdAt: "30 minutes ago",
        likes: 3,
        isLiked: false,
        isAcceptedAnswer: false
      }
    ]

    setPost(mockPost)
    setComments(mockComments)
  }, [params.postId])

  if (isLoading || !post) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  function handleLikePost() {
    setPost({
      ...post,
      isLiked: !post.isLiked,
      likes: post.isLiked ? post.likes - 1 : post.likes + 1
    })
  }

  function handleBookmarkPost() {
    setPost({
      ...post,
      isBookmarked: !post.isBookmarked
    })
  }

  function handleLikeComment(commentId: string) {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
            }
          : comment
      )
    )
  }

  function handleAcceptAnswer(commentId: string) {
    setComments((prevComments) =>
      prevComments.map((comment) => ({
        ...comment,
        isAcceptedAnswer: comment.id === commentId
      }))
    )
  }

  function handleSubmitComment(e: React.FormEvent) {
    e.preventDefault()
    if (!newComment.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const newCommentObj: Comment = {
        id: `c${comments.length + 1}`,
        content: newComment,
        author: {
          id: user?.id || "user-current",
          name: user?.name || "Current User",
          image: user?.image || "/placeholder.svg?height=40&width=40",
          role: "Member"
        },
        createdAt: "Just now",
        likes: 0,
        isLiked: false,
        isAcceptedAnswer: false
      }

      setComments((prevComments) => [...prevComments, newCommentObj])
      setNewComment("")
      setIsSubmitting(false)
      setPost({
        ...post,
        comments: post.comments + 1
      })
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={user} />

      <main className="flex-1 p-6 lg:p-8">
        <div className="mx-auto max-w-4xl">
          <Button variant="ghost" className="mb-6 pl-0" asChild>
            <Link href="/community">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Community
            </Link>
          </Button>

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={post.author.image} alt={post.author.name} />
                    <AvatarFallback>
                      {post.author.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{post.author.name}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>{post.author.role}</span>
                      <span className="mx-2">•</span>
                      <span>{post.createdAt}</span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline">{post.category}</Badge>
              </div>
              <CardTitle className="text-2xl">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="whitespace-pre-line">{post.content}</div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={handleLikePost}
                  >
                    <Heart className={`h-4 w-4 ${post.isLiked ? "fill-red-500 text-red-500" : ""}`} />
                    <span>{post.likes}</span>
                  </Button>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <span>{post.comments}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={post.isBookmarked ? "text-primary" : ""}
                    onClick={handleBookmarkPost}
                  >
                    <BookmarkPlus className="mr-2 h-4 w-4" />
                    {post.isBookmarked ? "Bookmarked" : "Bookmark"}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Flag className="mr-2 h-4 w-4" />
                    Report
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>

          <div className="mt-8">
            <h2 className="mb-4 text-xl font-bold">
              {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
            </h2>

            <div className="space-y-6">
              {comments.map((comment) => (
                <Card key={comment.id} className={comment.isAcceptedAnswer ? "border-green-500" : ""}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={comment.author.image} alt={comment.author.name} />
                          <AvatarFallback>
                            {comment.author.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{comment.author.name}</div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>{comment.author.role}</span>
                            <span className="mx-2">•</span>
                            <span>{comment.createdAt}</span>
                          </div>
                        </div>
                      </div>
                      {comment.isAcceptedAnswer && (
                        <Badge variant="outline" className="bg-green-500/10 text-green-500">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Accepted Answer
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p>{comment.content}</p>
                  </CardContent>
                  <CardFooter className="border-t pt-3">
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => handleLikeComment(comment.id)}
                        >
                          <ThumbsUp
                            className={`h-4 w-4 ${comment.isLiked ? "fill-primary text-primary" : ""}`}
                          />
                          <span>{comment.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          Reply
                        </Button>
                        {post.author.id === user?.id && !comment.isAcceptedAnswer && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-500"
                            onClick={() => handleAcceptAnswer(comment.id)}
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Accept as Answer
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Add Your Comment</CardTitle>
                <CardDescription>Share your thoughts or answer the question</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitComment}>
                  <Textarea
                    placeholder="Write your comment here..."
                    className="min-h-[120px]"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                  />
                  <div className="mt-4 flex justify-end">
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Clock className="mr-2 h-4 w-4 animate-spin" />
                          Posting...
                        </>
                      ) : (
                        "Post Comment"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

