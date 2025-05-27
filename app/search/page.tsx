"use client"

import type React from "react"

import { MainLayout } from "@/components/layout/main-layout"
import { PostCard } from "@/components/post-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAllPosts, getAllCategories, type Post } from "@/lib/database"
import { Search, Filter, Calendar } from "lucide-react"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [posts, setPosts] = useState<Post[]>([])
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<string>("all")
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getAllCategories()
        setCategories(categoriesData)

        // If there's a query parameter, perform initial search
        if (searchParams.get("q")) {
          await handleSearch()
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
        toast({
          title: "Error",
          description: "Failed to load categories.",
          variant: "destructive",
        })
      }
    }

    fetchCategories()
  }, [searchParams])

  const handleSearch = async () => {
    console.log("=== PERFORMING SEARCH ===")
    console.log("Search query:", searchQuery)
    console.log("Category filter:", selectedCategory)
    console.log("Date filter:", dateFilter)

    setLoading(true)
    setHasSearched(true)

    try {
      // Get all posts first
      let filtered = await getAllPosts({ archived: false })
      console.log("Total posts found:", filtered.length)

      // Apply search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        console.log("Applying search filter for:", query)

        filtered = filtered.filter(
          (post) =>
            post.beforeBelief.toLowerCase().includes(query) ||
            post.afterBelief.toLowerCase().includes(query) ||
            post.categories.some((cat) => cat.toLowerCase().includes(query)) ||
            post.userName.toLowerCase().includes(query),
        )
        console.log("Posts after search filter:", filtered.length)
      }

      // Apply category filter
      if (selectedCategory !== "all") {
        console.log("Applying category filter for:", selectedCategory)
        filtered = filtered.filter((post) => post.categories.includes(selectedCategory))
        console.log("Posts after category filter:", filtered.length)
      }

      // Apply date filter
      if (dateFilter !== "all") {
        console.log("Applying date filter for:", dateFilter)
        const now = new Date()
        let dateThreshold: Date

        switch (dateFilter) {
          case "today":
            dateThreshold = new Date(now.getFullYear(), now.getMonth(), now.getDate())
            break
          case "week":
            dateThreshold = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
            break
          case "month":
            dateThreshold = new Date(now.getFullYear(), now.getMonth(), 1)
            break
          case "year":
            dateThreshold = new Date(now.getFullYear(), 0, 1)
            break
          default:
            dateThreshold = new Date(0)
        }

        filtered = filtered.filter((post) => new Date(post.createdAt) >= dateThreshold)
        console.log("Posts after date filter:", filtered.length)
      }

      console.log("Final filtered posts:", filtered.length)
      setPosts(filtered)
    } catch (error) {
      console.error("Error searching posts:", error)
      toast({
        title: "Error",
        description: "Failed to search posts. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch()
  }

  const handleClear = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setDateFilter("all")
    setPosts([])
    setHasSearched(false)
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Search className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Search Evolutions</h1>
          </div>
          <p className="text-muted-foreground">
            Discover philosophical evolutions and belief transformations from the community
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search thoughts, beliefs, categories, or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
            <Button type="button" variant="outline" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </form>

        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Searching...</p>
            </div>
          </div>
        ) : hasSearched ? (
          posts.length > 0 ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Search Results ({posts.length})</h2>
              </div>
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </div>
          )
        ) : (
          <div className="text-center py-16">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">Start your search</h3>
            <p className="text-muted-foreground">
              Enter keywords, select categories, or choose a date range to find philosophical evolutions.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
