"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createUser } from "@/lib/database"
import { useToast } from "@/hooks/use-toast"
import { User, ArrowRight } from "lucide-react"

interface AuthPromptProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  title?: string
  description?: string
}

export function AuthPrompt({
  isOpen,
  onClose,
  onSuccess,
  title = "Create Account",
  description = "Please enter your name to continue",
}: AuthPromptProps) {
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
        description: `Hello ${userName.trim()}! You can now interact with posts.`,
      })

      setUserName("")
      onSuccess()
      onClose()
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <User className="h-6 w-6 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center">{title}</DialogTitle>
          <DialogDescription className="text-center">{description}</DialogDescription>
        </DialogHeader>
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
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={loading || !userName.trim()}>
              {loading ? "Creating..." : "Continue"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
