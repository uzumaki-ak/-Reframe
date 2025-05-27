"use client"

import { useState, useEffect } from "react"
import { getCurrentUser, type User } from "@/lib/database"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for user after component mounts
    const checkUser = () => {
      const currentUser = getCurrentUser()
      setUser(currentUser)
      setLoading(false)
    }

    const timer = setTimeout(checkUser, 100)

    // Listen for storage changes (user creation in other tabs)
    const handleStorageChange = () => {
      const currentUser = getCurrentUser()
      setUser(currentUser)
    }

    window.addEventListener("storage", handleStorageChange)

    // Also check periodically in case user was created in same tab
    const interval = setInterval(() => {
      const currentUser = getCurrentUser()
      if (currentUser && !user) {
        setUser(currentUser)
      }
    }, 1000)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("storage", handleStorageChange)
      clearInterval(interval)
    }
  }, [user])

  const refreshUser = () => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
  }

  const requireAuth = (callback: () => void, options?: { title?: string; description?: string }) => {
    if (user) {
      callback()
      return { needsAuth: false }
    }
    return {
      needsAuth: true,
      title: options?.title || "Create Account to Continue",
      description: options?.description || "Please enter your name to interact with posts",
    }
  }

  return {
    user,
    loading,
    refreshUser,
    requireAuth,
    isAuthenticated: !!user,
  }
}
