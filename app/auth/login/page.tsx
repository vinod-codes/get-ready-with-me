"use client"

import { useState } from "react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import MetaBalls from "@/components/MetaBalls"
import { loginUser } from "@/app/actions/auth-actions"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isGithubLoading, setIsGithubLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      console.log("Attempting login with NextAuth...")
      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (signInResult?.error) {
        console.error("NextAuth sign in error:", signInResult.error)
        setError(signInResult.error)
      } else if (signInResult?.ok) {
        console.log("NextAuth sign in successful, redirecting to dashboard")
        router.push("/dashboard")
        router.refresh()
      } else {
        console.error("Unexpected NextAuth result:", signInResult)
        setError("An unexpected error occurred. Please try again.")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    setError("")
    try {
      await signIn("google", {
        callbackUrl: "/dashboard",
        redirect: true,
      })
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsGoogleLoading(false)
    }
  }

  const handleGithubSignIn = async () => {
    setIsGithubLoading(true)
    setError("")
    try {
      await signIn("github", {
        callbackUrl: "/dashboard",
        redirect: true,
      })
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsGithubLoading(false)
    }
  }

  return (
    <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-black p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-black">
          <MetaBalls
            color="#ffffff"
            cursorBallColor="#ffffff"
            cursorBallSize={2}
            ballCount={15}
            animationSize={30}
            enableMouseInteraction={true}
            enableTransparency={true}
            hoverSmoothness={0.05}
            clumpFactor={1}
            speed={0.3}
          />
        </div>
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          CodeReady
        </div>
        <div className="relative z-20 mt-auto">
          <h2 className="text-2xl font-bold mb-4">Welcome to CodeReady</h2>
          <p className="text-lg text-gray-300">
            Your journey to becoming a better developer starts here.
          </p>
        </div>
      </div>
      <div className="p-4 lg:p-8 h-full flex items-center bg-white">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Card className="border-gray-200">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Sign in</CardTitle>
              <CardDescription className="text-center">
                Enter your email below to sign in to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-6">
                <Button variant="outline" onClick={handleGoogleSignIn} disabled={isGoogleLoading}>
                  {isGoogleLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Icons.google className="mr-2 h-4 w-4" />
                  )}
                  Google
                </Button>
                <Button variant="outline" onClick={handleGithubSignIn} disabled={isGithubLoading}>
                  {isGithubLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Icons.gitHub className="mr-2 h-4 w-4" />
                  )}
                  GitHub
                </Button>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" name="remember" />
                    <Label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </Label>
                  </div>
                  {error && (
                    <div className="text-sm text-red-500 text-center">{error}</div>
                  )}
                  <Button disabled={isLoading}>
                    {isLoading && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Sign In
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <p className="px-8 text-center text-sm text-muted-foreground">
                <Link
                  href="/auth/signup"
                  className="hover:text-brand underline underline-offset-4"
                >
                  Don&apos;t have an account? Sign up
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

