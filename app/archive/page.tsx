"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getAllPosts, restorePost, permanentlyDeletePost, getCurrentUser, type Post } from "@/lib/database"
import { Archive, RotateCcw, Trash2, Calendar, User } from "lucide-react"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function ArchivePage() {
  const [archivedPosts, setArchivedPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [deletePostId, setDeletePostId] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadArchivedPosts()
  }, [])

  const loadArchivedPosts = async () => {
    setLoading(true)
    try {
      const currentUser = getCurrentUser()
      if (currentUser) {
        const posts = await getAllPosts({ archived: true })
        const filteredPosts = posts.filter((post) => post.userId === currentUser.id)
        setArchivedPosts(filteredPosts)
      }
    } catch (error) {
      console.error("Error loading archived posts:", error)
      toast({
        title: "Error",
        description: "Failed to load archived posts. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRestore = async (postId: string) => {
    try {
      const success = await restorePost(postId)
      if (success) {
        toast({
          title: "Post restored",
          description: "Your post has been restored successfully.",
        })
        await loadArchivedPosts()
      } else {
        toast({
          title: "Error",
          description: "Failed to restore post. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error restoring post:", error)
      toast({
        title: "Error",
        description: "Failed to restore post. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handlePermanentDelete = async (postId: string) => {
    try {
      const success = await permanentlyDeletePost(postId)
      if (success) {
        toast({
          title: "Post permanently deleted",
          description: "Your post has been permanently deleted.",
        })
        await loadArchivedPosts()
      } else {
        toast({
          title: "Error",
          description: "Failed to delete post. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting post:", error)
      toast({
        title: "Error",
        description: "Failed to delete post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setDeletePostId(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString))
  }

  const getDaysUntilDeletion = (archivedAt: string) => {
    const now = new Date()
    const deleteDate = new Date(new Date(archivedAt).getTime() + 7 * 24 * 60 * 60 * 1000)
    const diffTime = deleteDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays)
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading archive...</p>
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
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Archive className="h-8 w-8 text-muted-foreground" />
            <h1 className="text-3xl font-bold">Archive</h1>
          </div>
          <p className="text-muted-foreground">
            Deleted posts are kept here for 7 days before permanent deletion. You can restore them or delete them
            permanently.
          </p>
        </div>

        {/* Archived Posts */}
        {archivedPosts.length === 0 ? (
          <div className="text-center py-16">
            <Archive className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No archived posts</h3>
            <p className="text-muted-foreground">
              When you delete posts, they'll appear here for 7 days before permanent deletion.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {archivedPosts.map((post) => {
              const daysLeft = post.archivedAt ? getDaysUntilDeletion(post.archivedAt) : 0

              return (
                <Card key={post.id} className="border-destructive/20">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{post.userName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>Archived: {post.archivedAt ? formatDate(post.archivedAt) : "Unknown"}</span>
                        </div>
                      </div>
                      <Badge variant="destructive" className="text-xs">
                        {daysLeft > 0 ? `${daysLeft} days left` : "Expires today"}
                      </Badge>
                    </div>

                    {post.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {post.categories.map((category) => (
                          <Badge key={category} variant="outline" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardHeader>

                  <CardContent className="pb-4">
                    {/* Evolution Preview */}
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-destructive">What I used to believe:</h4>
                        <div className="p-3 bg-destructive/5 border border-destructive/20 rounded text-sm">
                          <p className="line-clamp-3 italic">"{post.beforeBelief}"</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-primary">What I believe now:</h4>
                        <div className="p-3 bg-primary/5 border border-primary/20 rounded text-sm">
                          <p className="line-clamp-3 italic">"{post.afterBelief}"</p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRestore(post.id)}
                        className="flex items-center gap-2"
                      >
                        <RotateCcw className="h-4 w-4" />
                        Restore
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setDeletePostId(post.id)}
                        className="flex items-center gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete Forever
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deletePostId} onOpenChange={() => setDeletePostId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Permanently delete this post?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. The post and all its comments will be permanently deleted.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deletePostId && handlePermanentDelete(deletePostId)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete Forever
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </MainLayout>
  )
}
