"use client"

import type React from "react"

import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { getPost, updatePost, getCurrentUser } from "@/lib/database"
import { ArrowRight, Plus, X, ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"

export default function EditPostPage() {
  const params = useParams()
  const [post, setPost] = useState(null)
  const [beforeBelief, setBeforeBelief] = useState("")
  const [afterBelief, setAfterBelief] = useState("")
  const [categories, setCategories] = useState<string[]>([])
  const [newCategory, setNewCategory] = useState("")
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const loadPost = async () => {
      if (params.id) {
        try {
          const foundPost = await getPost(params.id as string)
          const currentUser = getCurrentUser()

          if (!foundPost) {
            toast({
              title: "Post not found",
              description: "The post you're trying to edit doesn't exist.",
              variant: "destructive",
            })
            router.push("/my-thoughts")
            return
          }

          if (!currentUser || foundPost.userId !== currentUser.id) {
            toast({
              title: "Access denied",
              description: "You can only edit your own posts.",
              variant: "destructive",
            })
            router.push("/my-thoughts")
            return
          }

          setPost(foundPost)
          setBeforeBelief(foundPost.beforeBelief)
          setAfterBelief(foundPost.afterBelief)
          setCategories(foundPost.categories)
          setPageLoading(false)
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to load post. Please try again.",
            variant: "destructive",
          })
          router.push("/my-thoughts")
        }
      }
    }

    loadPost()
  }, [params.id, router, toast])

  const handleAddCategory = () => {
    if (newCategory.trim() && categories.length < 3 && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()])
      setNewCategory("")
    }
  }

  const handleRemoveCategory = (categoryToRemove: string) => {
    setCategories(categories.filter((cat) => cat !== categoryToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!beforeBelief.trim() || !afterBelief.trim()) return

    setLoading(true)
    try {
      const updatedPost = await updatePost(params.id as string, {
        beforeBelief: beforeBelief.trim(),
        afterBelief: afterBelief.trim(),
        categories,
      })

      if (updatedPost) {
        toast({
          title: "Post updated!",
          description: "Your evolution has been updated successfully.",
        })
        router.push(`/post/${params.id}`)
      } else {
        throw new Error("Failed to update post")
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (pageLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading post...</p>
            </div>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <Link href={`/post/${params.id}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Post
              </Button>
            </Link>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Edit Your Evolution</h1>
            <p className="text-muted-foreground">Update your philosophical evolution</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Evolution Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Your Philosophical Evolution</CardTitle>
                <CardDescription>Update your past and present beliefs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Before */}
                  <div className="space-y-3">
                    <Label htmlFor="before" className="text-base font-semibold text-destructive">
                      What I used to believe:
                    </Label>
                    <Textarea
                      id="before"
                      placeholder="Describe your old belief or worldview..."
                      value={beforeBelief}
                      onChange={(e) => setBeforeBelief(e.target.value)}
                      className="min-h-[120px] border-destructive/20 focus:border-destructive"
                      required
                    />
                  </div>

                  {/* Arrow */}
                  <div className="hidden md:flex items-center justify-center">
                    <ArrowRight className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="md:hidden flex justify-center py-2">
                    <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90" />
                  </div>

                  {/* After */}
                  <div className="space-y-3">
                    <Label htmlFor="after" className="text-base font-semibold text-primary">
                      What I believe now:
                    </Label>
                    <Textarea
                      id="after"
                      placeholder="Describe your current belief or worldview..."
                      value={afterBelief}
                      onChange={(e) => setAfterBelief(e.target.value)}
                      className="min-h-[120px] border-primary/20 focus:border-primary"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
                <CardDescription>Update categories (up to 3)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddCategory())}
                    disabled={categories.length >= 3}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddCategory}
                    disabled={!newCategory.trim() || categories.length >= 3}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {categories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Badge key={category} variant="secondary" className="flex items-center gap-1">
                        {category}
                        <button
                          type="button"
                          onClick={() => handleRemoveCategory(category)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex justify-center gap-4">
              <Link href={`/post/${params.id}`}>
                <Button variant="outline" size="lg">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                size="lg"
                disabled={loading || !beforeBelief.trim() || !afterBelief.trim()}
                className="px-8"
              >
                {loading ? "Updating..." : "Update Evolution"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  )
}
