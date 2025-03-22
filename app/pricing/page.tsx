"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CheckCircle, Code, Star, Zap } from "lucide-react"
import DashboardHeader from "@/app/dashboard/dashboard-header"
import { motion } from "framer-motion"

export default function PricingPage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      period: "/month",
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
      id: "pro",
      name: "Pro",
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
      id: "ai-mentor",
      name: "AI Mentor",
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
  ]

  const handleSubscribe = (planId: string) => {
    setSelectedPlan(planId)
    setShowPaymentDialog(true)
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setShowPaymentDialog(false)
    // Redirect to success page or show success message
    router.push("/dashboard?subscription=success")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={null} />

      <main className="flex-1 p-6 lg:p-8">
        <motion.div
          className="mx-auto max-w-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Pricing Plans</Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-4">Choose the Perfect Plan</h1>
            <p className="text-xl text-muted-foreground">
              Start your coding journey today with our flexible pricing options
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: plans.indexOf(plan) * 0.1 }}
              >
                <Card className={`relative h-full flex flex-col ${plan.popular ? "border-primary shadow-lg" : ""}`}>
                  {plan.popular && (
                    <div className="absolute top-0 right-0 translate-x-2 -translate-y-2">
                      <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
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
                    <Button
                      className="w-full"
                      variant={plan.popular ? "default" : "outline"}
                      onClick={() => handleSubscribe(plan.id)}
                    >
                      {plan.cta}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Complete Your Subscription</DialogTitle>
                <DialogDescription>
                  Enter your payment details to subscribe to the {selectedPlan?.toUpperCase()} plan
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Card Number</label>
                  <Input placeholder="4242 4242 4242 4242" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Expiry Month</label>
                    <Input placeholder="MM" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Expiry Year</label>
                    <Input placeholder="YY" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">CVC</label>
                    <Input placeholder="123" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handlePayment} disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                      Processing...
                    </>
                  ) : (
                    "Subscribe Now"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">100% Satisfaction Guarantee</h2>
            <p className="text-muted-foreground">
              Try any paid plan risk-free for 30 days. If you're not completely satisfied,
              we'll refund your payment. No questions asked.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  )
} 