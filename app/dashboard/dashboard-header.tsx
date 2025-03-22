"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Menu,
  Search,
  Bell,
  Plus,
  Settings,
  LogOut,
  User,
  LayoutDashboard,
  BookOpen,
  Code,
  MessageSquare,
  Brain,
} from "lucide-react"

type UserType = {
  id: string
  name: string
  email: string
  image: string
}

export default function DashboardHeader({ user }: { user: UserType | null }) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 768)
    }
    
    // Initial check
    checkMobile()
    
    // Add event listener
    window.addEventListener('resize', checkMobile)
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="icon" className="mr-2 md:hidden" onClick={toggleMobileMenu}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
            <Link href="/" className="flex items-center space-x-2">
              <Code className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">CodeReady</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/courses" className="text-sm font-medium transition-colors hover:text-primary">
                Courses
              </Link>
              <Link href="/labs" className="text-sm font-medium transition-colors hover:text-primary">
                Coding Labs
              </Link>
              <Link href="/community" className="text-sm font-medium transition-colors hover:text-primary">
                Community
              </Link>
              <Link href="/pricing" className="text-sm font-medium transition-colors hover:text-primary">
                Pricing
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative max-w-sm w-full hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search courses and more..."
                className="flex h-10 w-full rounded-md border border-input bg-background px-8 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Plus className="h-5 w-5" />
              <span className="sr-only">Add</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.image} alt={user?.name || "Avatar"} />
                    <AvatarFallback>{user?.name?.slice(0, 2).toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/auth/logout" className="flex items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ModeToggle />
          </div>
        </div>
      </div>

      {isMobileMenuOpen && isMobileView && (
        <div className="border-b py-4 md:hidden">
          <div className="container flex flex-col space-y-4 px-4">
            <div className="relative mb-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search courses and more..."
                className="flex h-10 w-full rounded-md border border-input bg-background px-8 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <Button variant="ghost" className="justify-start" asChild>
              <Link href="/courses" className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4" />
                <span>Courses</span>
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start" asChild>
              <Link href="/labs" className="flex items-center">
                <Code className="mr-2 h-4 w-4" />
                <span>Coding Labs</span>
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start" asChild>
              <Link href="/community" className="flex items-center">
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>Community</span>
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start" asChild>
              <Link href="/pricing" className="flex items-center">
                <Brain className="mr-2 h-4 w-4" />
                <span>Pricing</span>
              </Link>
            </Button>
            <div className="border-t pt-4">
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/settings" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/auth/logout" className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

