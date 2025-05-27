"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useTheme } from "next-themes"

interface SiteSettings {
  fontSize: string
  lineHeight: string
  letterSpacing: string
  fontFamily: string
  primaryColor: string
  backgroundColor: string
  textColor: string
  theme: string
  sidebarCollapsed: boolean
}

interface SiteContextType {
  settings: SiteSettings
  updateSettings: (newSettings: Partial<SiteSettings>) => void
  toggleSidebar: () => void
}

const defaultSettings: SiteSettings = {
  fontSize: "16",
  lineHeight: "1.5",
  letterSpacing: "normal",
  fontFamily: "Inter",
  primaryColor: "#000000",
  backgroundColor: "#ffffff",
  textColor: "#000000",
  theme: "system",
  sidebarCollapsed: false,
}

const SiteContext = createContext<SiteContextType | undefined>(undefined)

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before accessing theme
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem("site-settings")
    if (saved) {
      setSettings({ ...defaultSettings, ...JSON.parse(saved) })
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    localStorage.setItem("site-settings", JSON.stringify(settings))

    // Apply CSS custom properties
    document.documentElement.style.setProperty("--custom-font-size", `${settings.fontSize}px`)
    document.documentElement.style.setProperty("--custom-line-height", settings.lineHeight)
    document.documentElement.style.setProperty("--custom-letter-spacing", settings.letterSpacing)
    document.documentElement.style.setProperty("--custom-primary", settings.primaryColor)

    // Only apply custom background and text colors if they're different from defaults
    // and if the user hasn't set them to theme-aware values
    const isDefaultBackground = settings.backgroundColor === "#ffffff"
    const isDefaultText = settings.textColor === "#000000"

    // Don't override theme colors unless user has specifically customized them
    if (!isDefaultBackground && !isDefaultText) {
      // Only apply custom colors in light mode, or if user has explicitly set custom colors
      if (resolvedTheme === "light" || !isDefaultBackground || !isDefaultText) {
        document.documentElement.style.setProperty("--custom-background", settings.backgroundColor)
        document.documentElement.style.setProperty("--custom-text", settings.textColor)
      } else {
        // Remove custom properties to let theme handle colors
        document.documentElement.style.removeProperty("--custom-background")
        document.documentElement.style.removeProperty("--custom-text")
      }
    } else {
      // Remove custom properties to let theme handle colors
      document.documentElement.style.removeProperty("--custom-background")
      document.documentElement.style.removeProperty("--custom-text")
    }
  }, [settings, resolvedTheme, mounted])

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }))
  }

  const toggleSidebar = () => {
    setSettings((prev) => ({ ...prev, sidebarCollapsed: !prev.sidebarCollapsed }))
  }

  return <SiteContext.Provider value={{ settings, updateSettings, toggleSidebar }}>{children}</SiteContext.Provider>
}

export function useSiteSettings() {
  const context = useContext(SiteContext)
  if (context === undefined) {
    throw new Error("useSiteSettings must be used within a SiteProvider")
  }
  return context
}
