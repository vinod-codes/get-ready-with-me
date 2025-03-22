"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BookOpen, Code, Award, MessageSquare, Brain, CheckCircle } from "lucide-react"
import { motion } from "framer-motion" // Import Framer Motion

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8 } },
}

const cardVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-6">
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
              <Link href="/auth/login" className="text-sm font-medium transition-colors hover:text-primary">
                Log in
              </Link>
              <Button asChild>
                <Link href="/auth/signup">Sign up free</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <motion.div className="flex flex-col justify-center space-y-4" {...fadeIn}>
                <div className="space-y-2">
                  <Badge variant="outline" className="w-fit">
                    Launch Offer: 30% Off Pro Plan
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Master Frontend Development with AI-Powered Learning
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Interactive courses, coding labs, and AI mentorship to take you from beginner to job-ready frontend
                    developer.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild className="w-full sm:w-auto">
                    <Link href="/auth/signup">
                      Start Learning for Free <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                    <Link href="/ai-mentor">Try AI Mentor</Link>
                  </Button>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </motion.div>
              <motion.div className="relative mx-auto lg:mx-0 w-full max-w-lg" {...fadeIn}>
                <div className="relative rounded-lg border bg-background p-4 shadow-lg">
                  <div className="rounded bg-muted p-4">
                    <pre className="text-sm text-primary font-mono overflow-x-auto">
                      <code>{`function Welcome() {
  return (
    <div className="app">
      <h1>Hello, Developer!</h1>
      <p>Ready to start your journey?</p>
      <button>Let's Code</button>
    </div>
  );
}`}</code>
                    </pre>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 rounded-lg border bg-background p-4 shadow-lg">
                  <div className="text-sm font-medium">AI Mentor</div>
                  <p className="text-xs text-muted-foreground">
                    Try using React.useState to make your button interactive!
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What You'll Learn Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-4 inline-block">Comprehensive Curriculum</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">What You'll Learn</h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our structured learning path takes you from the basics to advanced frontend concepts
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-16">
              {[
                {
                  icon: <BookOpen className="h-10 w-10 text-primary" />,
                  title: "HTML & CSS",
                  description: "Master the fundamentals of web structure and styling",
                },
                {
                  icon: <Code className="h-10 w-10 text-primary" />,
                  title: "JavaScript",
                  description: "Learn programming concepts and DOM manipulation",
                },
                {
                  icon: <Brain className="h-10 w-10 text-primary" />,
                  title: "React",
                  description: "Build dynamic user interfaces with components",
                },
                {
                  icon: <Award className="h-10 w-10 text-primary" />,
                  title: "Job Ready Skills",
                  description: "Prepare for technical interviews and real projects",
                },
              ].map((item, index) => (
                <motion.div key={index} variants={cardVariants} initial="initial" animate="animate">
                  <Card className="relative h-full overflow-hidden">
                    <CardHeader className="text-center pb-4">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        {item.icon}
                      </div>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-4 inline-block">Simple Process</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">How It Works</h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our proven four-step method to help you become a frontend developer
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mt-16">
              {[
                {
                  step: "01",
                  title: "Learn",
                  description: "Study interactive lessons with examples and explanations",
                },
                {
                  step: "02",
                  title: "Code",
                  description: "Practice in our browser-based code editor with real-time feedback",
                },
                {
                  step: "03",
                  title: "Practice",
                  description: "Build projects and solve challenges to reinforce your skills",
                },
                {
                  step: "04",
                  title: "Get Certified",
                  description: "Earn certificates and prepare for job interviews",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center"
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    {item.step}
                  </div>
                  <h3 className="mt-6 text-xl font-bold">{item.title}</h3>
                  <p className="mt-2 text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-4 inline-block">Success Stories</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Student Testimonials</h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from our students who transformed their careers with our platform
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-16">
              {[
                {
                  quote:
                    "I went from knowing nothing about coding to landing a junior developer role in just 6 months. The AI mentor was like having a personal tutor 24/7.",
                  name: "Alex Johnson",
                  role: "Frontend Developer at TechCorp",
                },
                {
                  quote:
                    "The interactive coding labs made all the difference. Being able to practice and get immediate feedback accelerated my learning tremendously.",
                  name: "Sarah Chen",
                  role: "UI Developer at StartupX",
                },
                {
                  quote:
                    "As a career switcher, I was worried about the learning curve. The structured curriculum and supportive community made the transition smooth.",
                  name: "Michael Rodriguez",
                  role: "React Developer at DesignStudio",
                },
              ].map((item, index) => (
                <motion.div key={index} variants={cardVariants} initial="initial" animate="animate">
                  <Card className="h-full text-center">
                    <CardHeader>
                      <div className="mx-auto h-12 w-12 rounded-full bg-muted"></div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">"{item.quote}"</p>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.role}</p>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Mentor Showcase */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge variant="outline" className="w-fit">
                    AI-Powered Learning
                  </Badge>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Meet Your AI Mentor</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                    Get personalized guidance, code reviews, and instant answers to your questions 24/7.
                  </p>
                </div>
                <ul className="space-y-2">
                  {[
                    "Personalized learning recommendations",
                    "Code explanations in simple terms",
                    "Debugging assistance when you're stuck",
                    "Project ideas tailored to your skill level",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div>
                  <Button size="lg" asChild>
                    <Link href="/ai-mentor">Try AI Mentor Now</Link>
                  </Button>
                </div>
              </div>
              <div className="mx-auto lg:mx-0">
                <div className="rounded-lg border bg-background p-4 shadow-lg">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="text-lg font-medium">AI Mentor Chat</div>
                  </div>
                  <div className="py-4 space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <MessageSquare className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">You</p>
                        <p className="text-sm">I'm confused about React hooks. When should I use useEffect?</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Brain className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">AI Mentor</p>
                        <p className="text-sm">
                          Great question! The useEffect hook is used for side effects in your components. Think of it as
                          a way to synchronize your component with external systems.
                        </p>
                        <p className="text-sm mt-2">You should use it when you need to:</p>
                        <ul className="text-sm list-disc pl-5 mt-1">
                          <li>Fetch data from an API</li>
                          <li>Set up subscriptions or event listeners</li>
                          <li>Manually change the DOM</li>
                        </ul>
                        <p className="text-sm mt-2">Would you like to see a practical example?</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Ask your coding question..."
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      />
                      <Button size="sm" className="absolute right-1 top-1">
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-4 inline-block">Flexible Plans</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Pricing Plans</h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Choose the plan that fits your learning goals
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 mt-16">
              {[
                {
                  title: "Free",
                  price: "$0",
                  description: "Perfect for beginners to explore the basics",
                  features: [
                    "Access to HTML & CSS courses",
                    "Basic coding challenges",
                    "Community forum access",
                    "Limited AI mentor queries (5/day)",
                  ],
                  cta: "Get Started",
                  popular: false,
                },
                {
                  title: "Pro",
                  price: "$19",
                  period: "/month",
                  description: "Ideal for serious learners committed to mastery",
                  features: [
                    "All Free features",
                    "Full access to all courses",
                    "Unlimited coding labs",
                    "Project-based learning",
                    "Job readiness resources",
                    "Course certificates",
                  ],
                  cta: "Upgrade to Pro",
                  popular: true,
                },
                {
                  title: "AI Mentor",
                  price: "$39",
                  period: "/month",
                  description: "For those who want personalized guidance",
                  features: [
                    "All Pro features",
                    "Unlimited AI mentor access",
                    "Personalized learning path",
                    "Code reviews & feedback",
                    "Mock interview preparation",
                    "Priority support",
                  ],
                  cta: "Get AI Mentor",
                  popular: false,
                },
              ].map((plan, index) => (
                <Card key={index} className={`flex flex-col ${plan.popular ? "border-primary shadow-lg" : ""}`}>
                  {plan.popular && (
                    <div className="absolute top-0 right-0 translate-x-2 -translate-y-2">
                      <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.title}</CardTitle>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2 text-sm">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                      {plan.cta}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Ready to Start Your Coding Journey?
              </h2>
              <p className="text-xl/relaxed mb-8">
                Join thousands of students who have transformed their careers with our platform
              </p>
              <Button size="lg" variant="secondary" asChild className="w-full sm:w-auto">
                <Link href="/auth/signup">
                  Start Learning for Free <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-6 md:py-0">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-24 items-center justify-between">
            <div className="flex items-center gap-4">
              <Code className="h-6 w-6 text-primary" />
              <p className="text-sm leading-loose">© 2023 CodeReady. All rights reserved.</p>
            </div>
            <nav className="flex gap-4">
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}

