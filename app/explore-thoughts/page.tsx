"use client"

import type React from "react"

import { MainLayout } from "@/components/layout/main-layout"
import { PostCard } from "@/components/post-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAllPosts, getAllCategories, type Post } from "@/lib/database"
import { Search, Filter, Calendar, Globe } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function ExploreThoughtsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<string>("all")
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPosts()
  }, [])

  useEffect(() => {
    filterPosts()
  }, [posts, searchQuery, selectedCategory, dateFilter])

  const loadPosts = async () => {
    setLoading(true)
    try {
      const allPosts = await getAllPosts({ archived: false })
      const allCategories = await getAllCategories()
      setPosts(allPosts)
      setCategories(allCategories)
    } catch (error) {
      console.error("Error loading posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterPosts = async () => {
    let filtered = [...posts]

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (post) =>
          post.beforeBelief.toLowerCase().includes(query) ||
          post.afterBelief.toLowerCase().includes(query) ||
          post.userName.toLowerCase().includes(query) ||
          post.categories.some((cat) => cat.toLowerCase().includes(query)),
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((post) => post.categories.includes(selectedCategory))
    }

    // Date filter
    if (dateFilter !== "all") {
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
    }

    setFilteredPosts(filtered)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    filterPosts()
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading thoughts...</p>
            </div>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Globe className="h-8 w-8 text-primary" />
              Explore Thoughts
            </h1>
            <p className="text-muted-foreground">Discover philosophical evolutions from the community</p>
          </div>
          <Link href="/share-evolution">
            <Button>Share Your Evolution</Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search thoughts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </form>

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

          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("all")
              setDateFilter("all")
            }}
          >
            Clear Filters
          </Button>
        </div>

        {/* Posts */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <Globe className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No thoughts found</h3>
              <p className="text-muted-foreground mb-6">
                {posts.length === 0
                  ? "Be the first to share your philosophical evolution with the community."
                  : "Try adjusting your filters or search terms."}
              </p>
              <Link href="/share-evolution">
                <Button>Share Your Evolution</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} onUpdate={loadPosts} />
            ))}
          </div>
        )}

        {/* Load More (for future infinite scroll) */}
        {filteredPosts.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground">
              Showing {filteredPosts.length} of {posts.length} thoughts from the community
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
