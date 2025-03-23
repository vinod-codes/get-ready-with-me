import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { supabase } from "@/lib/supabase/client"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
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
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        console.log("SignIn callback:", { user, account, profile })
        
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
          // Create new user in Supabase
          const { error: insertError } = await supabase
            .from('users')
            .insert({
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.image,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })

          if (insertError) {
            console.error('Error creating user:', insertError)
            return false
          }
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
      // Allow relative URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allow URLs from the same origin
      else if (new URL(url).origin === baseUrl) return url
      // Default to base URL
      return baseUrl
    },
  },
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
})

export { handler as GET, handler as POST } 