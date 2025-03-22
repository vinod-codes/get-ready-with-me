import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"

const upcomingLessons = [
  {
    id: "1",
    title: "Morning Skincare Routine",
    description: "Learn the perfect morning skincare routine for glowing skin",
    instructor: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SJ",
    },
    date: "Tomorrow",
    time: "9:00 AM",
    duration: "45 min",
    category: "Skincare",
  },
  {
    id: "2",
    title: "Everyday Makeup Essentials",
    description: "Master the basics of everyday makeup application",
    instructor: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MC",
    },
    date: "Wed, Mar 27",
    time: "2:00 PM",
    duration: "60 min",
    category: "Makeup",
  },
  {
    id: "3",
    title: "Hair Styling Techniques",
    description: "Quick and easy hair styling techniques for busy mornings",
    instructor: {
      name: "Alicia Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AR",
    },
    date: "Fri, Mar 29",
    time: "11:00 AM",
    duration: "50 min",
    category: "Hair",
  },
]

export default function UpcomingLessons() {
  return (
    <div className="space-y-4">
      {upcomingLessons.map((lesson) => (
        <Card key={lesson.id}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{lesson.title}</CardTitle>
                <CardDescription className="mt-1">{lesson.description}</CardDescription>
              </div>
              <Badge variant="outline">{lesson.category}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={lesson.instructor.avatar} alt={lesson.instructor.name} />
                  <AvatarFallback>{lesson.instructor.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{lesson.instructor.name}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    <span>{lesson.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  <span>
                    {lesson.time} • {lesson.duration}
                  </span>
                </div>
                <Button size="sm">Join</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

