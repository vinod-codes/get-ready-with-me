"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

type AuthResult = {
  success: boolean
  message?: string
  userId?: string
}

type Progress = {
  html: number
  css: number
  javascript: number
  react: number
}

type User = {
  id: string
  name: string
  email: string
  image: string
  progress: Progress
  streak: number
  xp: number
  level: number
}

export async function registerUser(formData: FormData): Promise<AuthResult> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string

  if (!email || !password || !name) {
    return {
      success: false,
      message: "All fields are required",
    }
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    })

    if (error) {
      return {
        success: false,
        message: error.message,
      }
    }

    return {
      success: true,
      userId: data.user?.id,
    }
  } catch (error) {
    return {
      success: false,
      message: "Failed to create account. Please try again.",
    }
  }
}

export async function loginUser(formData: FormData): Promise<AuthResult> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return {
      success: false,
      message: "Email and password are required",
    }
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return {
        success: false,
        message: error.message,
      }
    }

    return {
      success: true,
      userId: data.user?.id,
    }
  } catch (error) {
    return {
      success: false,
      message: "Invalid email or password",
    }
  }
}

export async function logoutUser(): Promise<void> {
  await supabase.auth.signOut()
  redirect("/auth/login")
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return null
    }

    // Get user progress from Supabase
    const { data: progressData } = await supabase
      .from('progress')
      .select('*')
      .eq('user_id', user.id)
      .single()

    // Default progress values if none exist
    const progress: Progress = progressData || {
      html: 75,
      css: 60,
      javascript: 45,
      react: 20,
    }

    // Calculate XP and level based on progress
    const totalProgress = Object.values(progress).reduce((a: number, b: number) => a + b, 0)
    const xp = Math.floor(totalProgress * 10) // 10 XP per percentage point
    const level = Math.floor(xp / 1000) + 1 // Level up every 1000 XP

    return {
      id: user.id,
      name: user.user_metadata.name,
      email: user.email || '',
      image: user.user_metadata.avatar_url,
      progress,
      streak: 7, // This should be fetched from a separate table
      xp,
      level,
    }
  } catch (error) {
    console.error('Error in getCurrentUser:', error)
    return null
  }
}

