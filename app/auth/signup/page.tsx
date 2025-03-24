"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Github, Mail } from "lucide-react"
import { registerUser } from "@/app/actions/auth-actions"
import { motion } from "framer-motion" // Import Framer Motion
import MetaBalls from "@/components/MetaBalls"

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
}

export default function SignUpPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isGithubLoading, setIsGithubLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError("")

    try {
      const result = await registerUser(formData)

      if (result.success) {
        router.push("/dashboard")
      } else {
        setError(result.message || "Registration failed. Please try again.")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    setError("")
    try {
      console.log("Starting Google sign-in process...")
      const result = await signIn("google", {
        callbackUrl: "/dashboard",
        redirect: true,
        state: "signup"
      })
      console.log("Google sign-in result:", result)
      
      if (result?.error) {
        console.error("Google sign-in error:", result.error)
        setError(`Failed to sign in with Google: ${result.error}`)
      }
    } catch (err) {
      console.error("Unexpected error during Google sign-in:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsGoogleLoading(false)
    }
  }

  const handleGithubSignIn = async () => {
    setIsGithubLoading(true)
    setError("")
    try {
      console.log("Starting GitHub sign-in process...")
      const result = await signIn("github", {
        callbackUrl: "/dashboard",
        redirect: false,
        state: "signup"
      })
      console.log("GitHub sign-in result:", result)
      
      if (result?.error) {
        console.error("GitHub sign-in error:", result.error)
        setError(`Failed to sign in with GitHub: ${result.error}`)
      } else if (result?.ok) {
        console.log("GitHub sign-in successful")
        router.push("/dashboard")
      }
    } catch (err) {
      console.error("Unexpected error during GitHub sign-in:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsGithubLoading(false)
    }
  }

  return (
    <div className="container relative flex min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link href="/" className="absolute left-4 top-4 flex items-center text-sm font-medium md:left-8 md:top-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to home
      </Link>

      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900">
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
          <h2 className="text-2xl font-bold mb-4">Join CodeReady</h2>
          <p className="text-lg text-gray-300">
            Start your journey to becoming a better developer today.
          </p>
        </div>
      </div>

      <div className="lg:p-8">
        <motion.div // Wrap the content with motion.div
          className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
          {...fadeIn}
        >
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">Enter your details to create your account</p>
          </div>

          <div className="grid gap-6">
            <form action={handleSubmit}>
              {error && <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">{error}</div>}

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    disabled={isLoading}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </div>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                disabled={isGithubLoading}
                onClick={handleGithubSignIn}
              >
                <Github className="mr-2 h-4 w-4" />
                {isGithubLoading ? "Signing in..." : "GitHub"}
              </Button>
              <Button 
                variant="outline" 
                disabled={isGoogleLoading}
                onClick={handleGoogleSignIn}
                className="bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                {isGoogleLoading ? "Signing in..." : "Google"}
              </Button>
            </div>
          </div>

          <p className="px-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/login" className="underline underline-offset-4 hover:text-primary">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

