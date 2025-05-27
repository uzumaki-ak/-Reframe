"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { getCurrentUser } from "@/lib/database"
import { UserOnboarding } from "./user-onboarding"

interface AuthGuardProps {
  children: React.ReactNode
  redirectMessage?: string
}

export function AuthGuard({ children, redirectMessage }: AuthGuardProps) {
  const [user, setUser] = useState(getCurrentUser())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for user after component mounts
    const checkUser = () => {
      const currentUser = getCurrentUser()
      setUser(currentUser)
      setLoading(false)
    }

    const timer = setTimeout(checkUser, 100)
    return () => clearTimeout(timer)
  }, [])

  const handleUserCreated = () => {
    const newUser = getCurrentUser()
    setUser(newUser)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <UserOnboarding onComplete={handleUserCreated} redirectMessage={redirectMessage} />
  }

  return <>{children}</>
}
