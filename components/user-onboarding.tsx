"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createUser } from "@/lib/database"
import { useToast } from "@/hooks/use-toast"
import { User, ArrowRight } from "lucide-react"

interface UserOnboardingProps {
  onComplete: () => void
  redirectMessage?: string
}

export function UserOnboarding({ onComplete, redirectMessage }: UserOnboardingProps) {
  const [userName, setUserName] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!userName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to continue.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      console.log("Creating user with name:", userName.trim())
      const user = await createUser(userName.trim())

      if (!user || !user.id) {
        throw new Error("User creation failed")
      }

      toast({
        title: "Welcome!",
        description: `Hello ${userName.trim()}! You can now explore the site.`,
      })

      onComplete()
    } catch (error) {
      console.error("Error creating user:", error)
      toast({
        title: "Error",
        description: `Failed to create account: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <User className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Welcome to Philosophy Tracker</CardTitle>
          <CardDescription>
            {redirectMessage || "First, let's get to know you. What should we call you?"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateUser} className="space-y-4">
            <div>
              <Label htmlFor="name">Your First Name</Label>
              <Input
                id="name"
                placeholder="Enter your first name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                autoFocus
              />
              <p className="text-xs text-muted-foreground mt-1">This is how you'll appear on your posts and comments</p>
            </div>
            <Button type="submit" className="w-full" disabled={loading || !userName.trim()}>
              {loading ? "Creating Account..." : "Continue"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
