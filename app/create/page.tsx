"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Camera, Clock, Image, Link, Plus, Upload, Video } from "lucide-react"
import DashboardHeader from "@/app/dashboard/dashboard-header"
import { getCurrentUser } from "@/app/actions/auth-actions"
import { useEffect } from "react"

type User = {
  id: string
  name: string
  email: string
  image: string
} | null

export default function CreatePage() {
  const router = useRouter()
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [contentType, setContentType] = useState("tutorial")
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={user} />

      <main className="flex-1 p-6 lg:p-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-3xl font-bold">Create New Content</h1>

          <Tabs defaultValue={contentType} onValueChange={setContentType}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tutorial">Tutorial</TabsTrigger>
              <TabsTrigger value="routine">Routine</TabsTrigger>
              <TabsTrigger value="post">Post</TabsTrigger>
            </TabsList>

            <TabsContent value="tutorial" className="mt-6">
              <Card>
                <form onSubmit={handleSubmit}>
                  <CardHeader>
                    <CardTitle>Create a Tutorial</CardTitle>
                    <CardDescription>Share your expertise with step-by-step instructions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input id="title" placeholder="e.g., 5-Minute Everyday Makeup Tutorial" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe what your tutorial is about and what viewers will learn"
                        className="min-h-[100px]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select defaultValue="makeup">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="skincare">Skincare</SelectItem>
                          <SelectItem value="makeup">Makeup</SelectItem>
                          <SelectItem value="hair">Hair</SelectItem>
                          <SelectItem value="fashion">Fashion</SelectItem>
                          <SelectItem value="wellness">Wellness</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Difficulty Level</Label>
                      <div className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="beginner"
                            name="difficulty"
                            value="beginner"
                            className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                            defaultChecked
                          />
                          <Label htmlFor="beginner" className="font-normal">
                            Beginner
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="intermediate"
                            name="difficulty"
                            value="intermediate"
                            className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                          />
                          <Label htmlFor="intermediate" className="font-normal">
                            Intermediate
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="advanced"
                            name="difficulty"
                            value="advanced"
                            className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                          />
                          <Label htmlFor="advanced" className="font-normal">
                            Advanced
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Duration</Label>
                      <div className="flex items-center space-x-2">
                        <Input type="number" id="duration" min="1" max="180" defaultValue="15" className="w-20" />
                        <span>minutes</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>Tutorial Content</Label>

                      <div className="rounded-lg border border-dashed p-8">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                          <div className="rounded-full bg-primary/10 p-4">
                            <Video className="h-8 w-8 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-lg font-medium">Upload Video</h3>
                            <p className="text-sm text-muted-foreground">
                              Drag and drop your video file or click to browse
                            </p>
                          </div>
                          <Button variant="outline" className="gap-2">
                            <Upload className="h-4 w-4" />
                            Upload Video
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">Steps</h3>
                          <Button variant="outline" size="sm" className="gap-1">
                            <Plus className="h-4 w-4" />
                            Add Step
                          </Button>
                        </div>

                        <div className="space-y-4">
                          <div className="rounded-lg border p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-2">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                                  1
                                </div>
                                <h4 className="font-medium">Prep Your Skin</h4>
                              </div>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <span className="sr-only">Edit step</span>
                                <Image className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="mt-2 pl-8">
                              <p className="text-sm text-muted-foreground">
                                Start with a clean, moisturized face. Apply primer to create a smooth base.
                              </p>
                            </div>
                          </div>

                          <div className="rounded-lg border p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-2">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                                  2
                                </div>
                                <h4 className="font-medium">Foundation & Concealer</h4>
                              </div>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <span className="sr-only">Edit step</span>
                                <Image className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="mt-2 pl-8">
                              <p className="text-sm text-muted-foreground">
                                Apply a light layer of foundation and spot conceal where needed.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Products Used</Label>
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="h-10 w-10 rounded-md bg-gray-100"></div>
                            <div>
                              <p className="font-medium">Moisturizer</p>
                              <p className="text-sm text-muted-foreground">Brand Name</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">Remove product</span>
                            <Link className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-2 gap-1">
                        <Plus className="h-4 w-4" />
                        Add Product
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label>Tags</Label>
                      <Input placeholder="e.g., makeup, beginner, quick, natural" />
                      <p className="text-xs text-muted-foreground">Separate tags with commas</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="publish" />
                      <Label htmlFor="publish" className="font-normal">
                        Publish immediately
                      </Label>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => router.back()}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Creating..." : "Create Tutorial"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="routine" className="mt-6">
              <Card>
                <form onSubmit={handleSubmit}>
                  <CardHeader>
                    <CardTitle>Create a Routine</CardTitle>
                    <CardDescription>Share your daily or special occasion routines</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="routine-title">Title</Label>
                      <Input id="routine-title" placeholder="e.g., My Morning Skincare Routine" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="routine-description">Description</Label>
                      <Textarea
                        id="routine-description"
                        placeholder="Describe your routine and what makes it special"
                        className="min-h-[100px]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="routine-type">Routine Type</Label>
                      <Select defaultValue="morning">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a routine type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning</SelectItem>
                          <SelectItem value="evening">Evening</SelectItem>
                          <SelectItem value="special">Special Occasion</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="seasonal">Seasonal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Time Required</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          id="routine-duration"
                          min="1"
                          max="180"
                          defaultValue="20"
                          className="w-20"
                        />
                        <span>minutes</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Routine Steps</Label>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Plus className="h-4 w-4" />
                          Add Step
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <div className="rounded-lg border p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                                1
                              </div>
                              <div>
                                <h4 className="font-medium">Cleanse</h4>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Clock className="mr-1 h-3 w-3" />
                                  <span>2 minutes</span>
                                </div>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <span className="sr-only">Edit step</span>
                              <Camera className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="mt-2 pl-8">
                            <p className="text-sm text-muted-foreground">
                              Wash face with gentle cleanser and lukewarm water.
                            </p>
                            <div className="mt-2 flex items-center space-x-2">
                              <div className="h-8 w-8 rounded-md bg-gray-100"></div>
                              <p className="text-xs">CeraVe Hydrating Cleanser</p>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-lg border p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                                2
                              </div>
                              <div>
                                <h4 className="font-medium">Tone</h4>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Clock className="mr-1 h-3 w-3" />
                                  <span>1 minute</span>
                                </div>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <span className="sr-only">Edit step</span>
                              <Camera className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="mt-2 pl-8">
                            <p className="text-sm text-muted-foreground">Apply toner with a cotton pad or hands.</p>
                            <div className="mt-2 flex items-center space-x-2">
                              <div className="h-8 w-8 rounded-md bg-gray-100"></div>
                              <p className="text-xs">Thayers Witch Hazel Toner</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Tags</Label>
                      <Input placeholder="e.g., skincare, morning, hydration" />
                      <p className="text-xs text-muted-foreground">Separate tags with commas</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="routine-publish" />
                      <Label htmlFor="routine-publish" className="font-normal">
                        Publish immediately
                      </Label>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => router.back()}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Creating..." : "Create Routine"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="post" className="mt-6">
              <Card>
                <form onSubmit={handleSubmit}>
                  <CardHeader>
                    <CardTitle>Create a Post</CardTitle>
                    <CardDescription>Share your thoughts, tips, or product reviews</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="post-title">Title</Label>
                      <Input id="post-title" placeholder="e.g., My Favorite Summer Products" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="post-content">Content</Label>
                      <Textarea
                        id="post-content"
                        placeholder="Write your post content here..."
                        className="min-h-[200px]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Cover Image</Label>
                      <div className="rounded-lg border border-dashed p-8">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                          <div className="rounded-full bg-primary/10 p-4">
                            <Image className="h-8 w-8 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-lg font-medium">Upload Image</h3>
                            <p className="text-sm text-muted-foreground">Drag and drop your image or click to browse</p>
                          </div>
                          <Button variant="outline" className="gap-2">
                            <Upload className="h-4 w-4" />
                            Upload Image
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="post-category">Category</Label>
                      <Select defaultValue="review">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="review">Product Review</SelectItem>
                          <SelectItem value="tips">Tips & Tricks</SelectItem>
                          <SelectItem value="story">Personal Story</SelectItem>
                          <SelectItem value="news">News & Updates</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Tags</Label>
                      <Input placeholder="e.g., review, summer, skincare" />
                      <p className="text-xs text-muted-foreground">Separate tags with commas</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="post-publish" />
                      <Label htmlFor="post-publish" className="font-normal">
                        Publish immediately
                      </Label>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => router.back()}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Creating..." : "Create Post"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

