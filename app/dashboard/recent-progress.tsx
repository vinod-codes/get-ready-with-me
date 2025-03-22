import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const recentProgress = [
  {
    id: "1",
    title: "Evening Skincare Routine",
    description: "A comprehensive nighttime skincare routine",
    progress: 75,
    lastActivity: "2 days ago",
    totalLessons: 4,
    completedLessons: 3,
  },
  {
    id: "2",
    title: "Natural Makeup Look",
    description: "Create a fresh, natural makeup look for everyday wear",
    progress: 40,
    lastActivity: "1 week ago",
    totalLessons: 5,
    completedLessons: 2,
  },
  {
    id: "3",
    title: "Quick Hairstyles for Work",
    description: "Professional hairstyles you can do in under 10 minutes",
    progress: 100,
    lastActivity: "3 days ago",
    totalLessons: 3,
    completedLessons: 3,
  },
]

export default function RecentProgress() {
  return (
    <div className="space-y-4">
      {recentProgress.map((course) => (
        <Card key={course.id}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription className="mt-1">{course.description}</CardDescription>
              </div>
              {course.progress === 100 && (
                <div className="flex items-center text-sm text-green-500">
                  <CheckCircle2 className="mr-1 h-4 w-4" />
                  <span>Completed</span>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{course.progress}%</span>
                </div>
                <Progress value={course.progress} />
              </div>
              <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <div className="text-sm text-muted-foreground">
                  <span>
                    {course.completedLessons} of {course.totalLessons} lessons completed
                  </span>
                  <span className="mx-2">•</span>
                  <span>Last activity: {course.lastActivity}</span>
                </div>
                <Button variant="outline" size="sm" className="gap-1">
                  Continue <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

