"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Check, Heart, MessageSquare, Star, User } from "lucide-react"
import DashboardHeader from "@/app/dashboard/dashboard-header"
import { getCurrentUser } from "@/app/actions/auth-actions"

type UserType = {
  id: string
  name: string
  email: string
  image: string
} | null

type Notification = {
  id: string
  type: "like" | "comment" | "follow" | "mention" | "system"
  title: string
  message: string
  time: string
  read: boolean
  user?: {
    name: string
    image: string
    initials: string
  }
  link: string
}

export default function NotificationsPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserType>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [activeTab, setActiveTab] = useState("all")

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
    // Simulate loading notifications
    setIsLoading(true)

    // Mock API call
    setTimeout(() => {
      const mockNotifications: Notification[] = [
        {
          id: "1",
          type: "like",
          title: "New Like",
          message: 'Sarah Johnson liked your "5-Minute Everyday Makeup Tutorial"',
          time: "2 hours ago",
          read: false,
          user: {
            name: "Sarah Johnson",
            image: "/placeholder.svg?height=40&width=40",
            initials: "SJ",
          },
          link: "/tutorials/1",
        },
        {
          id: "2",
          type: "comment",
          title: "New Comment",
          message: 'Michael Chen commented on your "Morning Skincare Routine"',
          time: "1 day ago",
          read: true,
          user: {
            name: "Michael Chen",
            image: "/placeholder.svg?height=40&width=40",
            initials: "MC",
          },
          link: "/routines/2",
        },
        {
          id: "3",
          type: "follow",
          title: "New Follower",
          message: "Alicia Rodriguez started following you",
          time: "3 days ago",
          read: false,
          user: {
            name: "Alicia Rodriguez",
            image: "/placeholder.svg?height=40&width=40",
            initials: "AR",
          },
          link: "/profile/alicia",
        },
        {
          id: "4",
          type: "mention",
          title: "New Mention",
          message: "BeautyGuru123 mentioned you in a comment",
          time: "1 week ago",
          read: true,
          user: {
            name: "BeautyGuru123",
            image: "/placeholder.svg?height=40&width=40",
            initials: "BG",
          },
          link: "/posts/4",
        },
        {
          id: "5",
          type: "system",
          title: "Welcome to Get Ready With Me",
          message: "Thanks for joining our community! Complete your profile to get started.",
          time: "2 weeks ago",
          read: true,
          link: "/profile",
        },
      ]

      setNotifications(mockNotifications)
      setIsLoading(false)
    }, 1000)
  }, [])

  function getFilteredNotifications() {
    if (activeTab === "all") {
      return notifications
    } else if (activeTab === "unread") {
      return notifications.filter((notification) => !notification.read)
    }
    return notifications.filter((notification) => notification.type === activeTab)
  }

  function markAllAsRead() {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  function markAsRead(id: string) {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
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

      <main className="flex-1 p-6 lg:p-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Notifications</h1>
            <Button variant="outline" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="like">Likes</TabsTrigger>
              <TabsTrigger value="comment">Comments</TabsTrigger>
              <TabsTrigger value="follow">Follows</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {getFilteredNotifications().length > 0 ? (
                getFilteredNotifications().map((notification) => (
                  <NotificationCard key={notification.id} notification={notification} onMarkAsRead={markAsRead} />
                ))
              ) : (
                <EmptyNotifications />
              )}
            </TabsContent>

            <TabsContent value="unread" className="space-y-4">
              {getFilteredNotifications().length > 0 ? (
                getFilteredNotifications().map((notification) => (
                  <NotificationCard key={notification.id} notification={notification} onMarkAsRead={markAsRead} />
                ))
              ) : (
                <EmptyNotifications />
              )}
            </TabsContent>

            <TabsContent value="like" className="space-y-4">
              {getFilteredNotifications().length > 0 ? (
                getFilteredNotifications().map((notification) => (
                  <NotificationCard key={notification.id} notification={notification} onMarkAsRead={markAsRead} />
                ))
              ) : (
                <EmptyNotifications />
              )}
            </TabsContent>

            <TabsContent value="comment" className="space-y-4">
              {getFilteredNotifications().length > 0 ? (
                getFilteredNotifications().map((notification) => (
                  <NotificationCard key={notification.id} notification={notification} onMarkAsRead={markAsRead} />
                ))
              ) : (
                <EmptyNotifications />
              )}
            </TabsContent>

            <TabsContent value="follow" className="space-y-4">
              {getFilteredNotifications().length > 0 ? (
                getFilteredNotifications().map((notification) => (
                  <NotificationCard key={notification.id} notification={notification} onMarkAsRead={markAsRead} />
                ))
              ) : (
                <EmptyNotifications />
              )}
            </TabsContent>

            <TabsContent value="system" className="space-y-4">
              {getFilteredNotifications().length > 0 ? (
                getFilteredNotifications().map((notification) => (
                  <NotificationCard key={notification.id} notification={notification} onMarkAsRead={markAsRead} />
                ))
              ) : (
                <EmptyNotifications />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

function NotificationCard({
  notification,
  onMarkAsRead,
}: {
  notification: Notification
  onMarkAsRead: (id: string) => void
}) {
  const router = useRouter()

  function getNotificationIcon() {
    switch (notification.type) {
      case "like":
        return <Heart className="h-4 w-4 text-red-500" />
      case "comment":
        return <MessageSquare className="h-4 w-4 text-blue-500" />
      case "follow":
        return <User className="h-4 w-4 text-green-500" />
      case "mention":
        return <Star className="h-4 w-4 text-yellow-500" />
      case "system":
        return <Bell className="h-4 w-4 text-purple-500" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  function handleClick() {
    if (!notification.read) {
      onMarkAsRead(notification.id)
    }
    router.push(notification.link)
  }

  return (
    <Card
      className={`cursor-pointer transition-colors hover:bg-accent/50 ${
        !notification.read ? "border-l-4 border-l-primary" : ""
      }`}
      onClick={handleClick}
    >
      <CardContent className="flex items-start gap-4 p-4">
        {notification.user ? (
          <Avatar className="h-10 w-10">
            <AvatarImage src={notification.user.image} alt={notification.user.name} />
            <AvatarFallback>{notification.user.initials}</AvatarFallback>
          </Avatar>
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            {getNotificationIcon()}
          </div>
        )}

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium">{notification.title}</p>
              <p className="text-sm text-muted-foreground">{notification.message}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{notification.time}</span>
              {!notification.read && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation()
                    onMarkAsRead(notification.id)
                  }}
                >
                  <Check className="h-4 w-4" />
                  <span className="sr-only">Mark as read</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function EmptyNotifications() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border p-8 text-center">
      <Bell className="h-12 w-12 text-muted-foreground" />
      <h2 className="text-xl font-medium">No notifications</h2>
      <p className="text-muted-foreground">You don&apos;t have any notifications in this category</p>
    </div>
  )
}

