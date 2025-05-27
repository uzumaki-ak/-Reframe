"use client"

import type React from "react"

import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { createPost, getCurrentUser } from "@/lib/database"
import { ArrowRight, Plus, X } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { AuthGuard } from "@/components/auth-guard"

function ShareEvolutionContent() {
  const [beforeBelief, setBeforeBelief] = useState("")
  const [afterBelief, setAfterBelief] = useState("")
  const [categories, setCategories] = useState<string[]>([])
  const [newCategory, setNewCategory] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const user = getCurrentUser()

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

    // Validate form fields
    if (!beforeBelief.trim() || !afterBelief.trim()) {
      toast({
        title: "Missing content",
        description: "Please fill in both belief fields.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      console.log("=== CREATING POST ===")
      const post = await createPost({
        beforeBelief: beforeBelief.trim(),
        afterBelief: afterBelief.trim(),
        categories,
      })

      if (post) {
        console.log("Post created successfully:", post.id)
        toast({
          title: "Evolution shared!",
          description: "Your philosophical evolution has been posted successfully.",
        })
        router.push("/my-thoughts")
      }
    } catch (error: any) {
      console.error("=== POST CREATION ERROR ===")
      console.error("Error creating post:", error)
      toast({
        title: "Error",
        description: error?.message || "Failed to share evolution. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Share Your Evolution</h1>
            <p className="text-muted-foreground">Document how your beliefs and worldview have transformed over time</p>
            {user && (
              <p className="text-sm text-muted-foreground mt-2">
                Posting as <strong>{user.name}</strong>
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Evolution Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Your Philosophical Evolution</CardTitle>
                <CardDescription>Compare your past and present beliefs side by side</CardDescription>
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
                    <p className="text-xs text-muted-foreground">Be honest about what you genuinely believed before</p>
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
                    <p className="text-xs text-muted-foreground">Explain your evolved perspective and why it changed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
                <CardDescription>Add up to 3 categories to help others find similar evolutions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a category (e.g., Success, Relationships, Work)"
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

                <p className="text-xs text-muted-foreground">{categories.length}/3 categories added</p>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex justify-center">
              <Button
                type="submit"
                size="lg"
                disabled={loading || !beforeBelief.trim() || !afterBelief.trim()}
                className="px-8"
              >
                {loading ? "Sharing..." : "Share My Evolution"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  )
}

export default function ShareEvolutionPage() {
  return (
    <AuthGuard redirectMessage="To share your evolution, please create an account first.">
      <ShareEvolutionContent />
    </AuthGuard>
  )
}
