"use client"

import type React from "react"

import { Sidebar } from "./sidebar"
import { TopBar } from "./top-bar"
import { useSiteSettings } from "@/components/site-provider"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const { settings } = useSiteSettings()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="flex h-screen bg-background">
        <div className="flex-1 flex flex-col">
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    )
  }

  // Determine if we should use custom colors
  const isDefaultBackground = settings.backgroundColor === "#ffffff"
  const isDefaultText = settings.textColor === "#000000"
  const shouldUseCustomColors = !isDefaultBackground || !isDefaultText

  // Only apply custom colors in light mode or if explicitly customized
  const useCustomBackground = shouldUseCustomColors && (resolvedTheme === "light" || !isDefaultBackground)
  const useCustomText = shouldUseCustomColors && (resolvedTheme === "light" || !isDefaultText)

  return (
    <div
      className="flex h-screen bg-background text-foreground"
      style={{
        fontSize: `${settings.fontSize}px`,
        lineHeight: settings.lineHeight,
        letterSpacing:
          settings.letterSpacing === "normal"
            ? "0"
            : settings.letterSpacing === "tight"
              ? "-0.025em"
              : settings.letterSpacing === "wide"
                ? "0.025em"
                : "0.05em",
        fontFamily: settings.fontFamily,
        backgroundColor: useCustomBackground ? settings.backgroundColor : undefined,
        color: useCustomText ? settings.textColor : undefined,
      }}
    >
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
