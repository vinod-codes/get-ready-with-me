import { createClient } from '@supabase/supabase-js'
import type { User, CommunityPost, Comment, ChatMessage, Chat, Certificate, Progress } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// User functions
export const getUser = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data as User
}

export const updateUser = async (userId: string, updates: Partial<User>) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data as User
}

// Community functions
export const getCommunityPosts = async () => {
  const { data, error } = await supabase
    .from('community_posts')
    .select(`
      *,
      user:users(*)
    `)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as CommunityPost[]
}

export const createCommunityPost = async (post: Omit<CommunityPost, 'id' | 'created_at' | 'updated_at' | 'likes_count' | 'comments_count' | 'user'>) => {
  const { data, error } = await supabase
    .from('community_posts')
    .insert(post)
    .select(`
      *,
      user:users(*)
    `)
    .single()

  if (error) throw error
  return data as CommunityPost
}

// Chat functions
export const getChats = async (userId: string) => {
  const { data, error } = await supabase
    .from('chats')
    .select(`
      *,
      user:users(*)
    `)
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })

  if (error) throw error
  return data as Chat[]
}

export const getChatMessages = async (chatId: string) => {
  const { data, error } = await supabase
    .from('chat_messages')
    .select(`
      *,
      user:users(*)
    `)
    .eq('chat_id', chatId)
    .order('created_at', { ascending: true })

  if (error) throw error
  return data as ChatMessage[]
}

export const createChatMessage = async (message: Omit<ChatMessage, 'id' | 'created_at' | 'user'>) => {
  const { data, error } = await supabase
    .from('chat_messages')
    .insert(message)
    .select(`
      *,
      user:users(*)
    `)
    .single()

  if (error) throw error
  return data as ChatMessage
}

// Certificate functions
export const getCertificates = async (userId: string) => {
  const { data, error } = await supabase
    .from('certificates')
    .select(`
      *,
      user:users(*)
    `)
    .eq('user_id', userId)
    .order('issued_at', { ascending: false })

  if (error) throw error
  return data as Certificate[]
}

export const createCertificate = async (certificate: Omit<Certificate, 'id' | 'created_at' | 'user'>) => {
  const { data, error } = await supabase
    .from('certificates')
    .insert(certificate)
    .select(`
      *,
      user:users(*)
    `)
    .single()

  if (error) throw error
  return data as Certificate
}

// Progress functions
export const getProgress = async (userId: string) => {
  const { data, error } = await supabase
    .from('progress')
    .select(`
      *,
      user:users(*)
    `)
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })

  if (error) throw error
  return data as Progress[]
}

export const updateProgress = async (progressId: string, updates: Partial<Progress>) => {
  const { data, error } = await supabase
    .from('progress')
    .update(updates)
    .eq('id', progressId)
    .select(`
      *,
      user:users(*)
    `)
    .single()

  if (error) throw error
  return data as Progress
}

// Real-time subscriptions
export const subscribeToCommunityUpdates = (callback: (data: any) => void) => {
  const subscription = supabase
    .channel('community-updates')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'community_posts' }, callback)
    .subscribe()

  return () => {
    subscription.unsubscribe()
  }
}

export const subscribeToChatMessages = (chatId: string, callback: (data: any) => void) => {
  const subscription = supabase
    .channel(`chat-${chatId}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'chat_messages' }, callback)
    .subscribe()

  return () => {
    subscription.unsubscribe()
  }
}

export const subscribeToProgress = (userId: string, callback: (data: any) => void) => {
  const subscription = supabase
    .channel(`progress-${userId}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'progress' }, callback)
    .subscribe()

  return () => {
    subscription.unsubscribe()
  }
} 