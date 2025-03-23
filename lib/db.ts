import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Real-time subscription setup
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Community features
export const subscribeToCommunityUpdates = (callback: (data: any) => void) => {
  const subscription = supabase
    .channel('community-updates')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'community_posts' }, callback)
    .subscribe()

  return () => {
    subscription.unsubscribe()
  }
}

// AI Mentor chat
export const subscribeToChatMessages = (chatId: string, callback: (data: any) => void) => {
  const subscription = supabase
    .channel(`chat-${chatId}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'chat_messages' }, callback)
    .subscribe()

  return () => {
    subscription.unsubscribe()
  }
} 