export interface User {
  id: string
  email: string
  name: string | null
  image: string | null
  created_at: string
  updated_at: string
  bio: string | null
  github_username: string | null
  twitter_username: string | null
  linkedin_username: string | null
  website: string | null
  is_mentor: boolean
  mentor_bio: string | null
  mentor_topics: string[]
  mentor_rating: number | null
  mentor_reviews_count: number
}

export interface CommunityPost {
  id: string
  user_id: string
  title: string
  content: string
  created_at: string
  updated_at: string
  likes_count: number
  comments_count: number
  tags: string[]
  is_pinned: boolean
  is_archived: boolean
  user: User
}

export interface Comment {
  id: string
  post_id: string
  user_id: string
  content: string
  created_at: string
  updated_at: string
  likes_count: number
  user: User
}

export interface ChatMessage {
  id: string
  chat_id: string
  user_id: string
  content: string
  created_at: string
  is_ai: boolean
  user: User
}

export interface Chat {
  id: string
  user_id: string
  title: string
  created_at: string
  updated_at: string
  last_message: string | null
  last_message_at: string | null
  is_archived: boolean
  user: User
}

export interface Certificate {
  id: string
  user_id: string
  title: string
  description: string
  issued_at: string
  issuer: string
  certificate_url: string
  created_at: string
  user: User
}

export interface Progress {
  id: string
  user_id: string
  course_id: string
  lesson_id: string
  completed: boolean
  completed_at: string | null
  score: number | null
  created_at: string
  updated_at: string
  user: User
} 