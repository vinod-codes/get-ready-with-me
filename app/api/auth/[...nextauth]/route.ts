import NextAuth, { User, Account, Profile } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          console.log("Starting credentials authorization:", { email: credentials?.email })
          
          if (!credentials?.email || !credentials?.password) {
            console.error("Missing credentials")
            throw new Error('Missing credentials')
          }

          // Sign in with Supabase
          const { data: { user }, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          })

          if (error) {
            console.error('Supabase auth error:', error)
            throw new Error(error.message)
          }

          if (!user) {
            console.error('No user returned from Supabase')
            return null
          }

          console.log("Supabase auth successful:", { userId: user.id, email: user.email })

          // Get user data from users table
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', user.id)
            .single()

          if (userError) {
            console.error('Error fetching user data:', userError)
            // Create user if not exists
            const { data: newUser, error: createError } = await supabase
              .from('users')
              .insert({
                id: user.id,
                email: user.email,
                name: user.user_metadata?.name || '',
                image: user.user_metadata?.avatar_url || '',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              })
              .select()
              .single()

            if (createError) {
              console.error('Error creating user:', createError)
              return null
            }

            console.log("Created new user:", newUser)
            return {
              id: user.id,
              email: user.email,
              name: user.user_metadata?.name || '',
              image: user.user_metadata?.avatar_url || '',
            }
          }

          console.log("Retrieved user data:", userData)
          return {
            id: user.id,
            email: user.email,
            name: userData?.name || '',
            image: userData?.image || '',
          }
        } catch (error) {
          console.error('Error in authorize:', error)
          throw error
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      },
      httpOptions: {
        timeout: 10000,
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
    error: "/auth/login",
    newUser: "/dashboard",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        console.log("SignIn callback:", { user, account, profile })
        
        if (!user.id || !user.email) {
          console.error("Missing user data:", user)
          return false
        }

        // Check if user exists in Supabase
        const { data: existingUser, error: fetchError } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single()

        if (fetchError && fetchError.code !== 'PGRST116') {
          console.error('Error fetching user:', fetchError)
          return false
        }

        if (!existingUser) {
          console.log("Creating new user in Supabase")
          // Create new user in Supabase
          const { error: insertError } = await supabase
            .from('users')
            .insert({
              id: user.id,
              email: user.email,
              name: user.name || '',
              image: user.image || '',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })

          if (insertError) {
            console.error('Error creating user:', insertError)
            return false
          }
          console.log("Successfully created new user")
        }
      } catch (error) {
        console.error('Error in signIn callback:', error)
        return false
      }
      return true
    },
    async session({ session, token }) {
      if (session.user) {
        try {
          const { data: userData, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', token.sub)
            .single()

          if (error) {
            console.error('Error fetching user data:', error)
            return session
          }

          session.user = {
            ...session.user,
            ...userData,
          }
        } catch (error) {
          console.error('Error in session callback:', error)
        }
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async redirect({ url, baseUrl }) {
      console.log("Redirect callback:", { url, baseUrl })
      
      // If the url is relative, prefix it with the base URL
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`
      }
      
      // If the url is from the same origin, allow it
      try {
        const urlObj = new URL(url)
        if (urlObj.origin === baseUrl || urlObj.origin === siteUrl) {
          return url
        }
      } catch (error) {
        console.error('Error parsing URL:', error)
      }
      
      // Default to dashboard
      return `${baseUrl}/dashboard`
    },
  },
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  events: {
    async signIn(message: { user: User; account: Account | null; profile?: Profile; isNewUser?: boolean }) {
      console.log("SignIn event:", message)
    },
    async signOut(message: { session: any; token: any }) {
      console.log("SignOut event:", message)
    },
    async session(message: { session: any; token: any }) {
      console.log("Session event:", message)
    },
  },
})

export { handler as GET, handler as POST } 