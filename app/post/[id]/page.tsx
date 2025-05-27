"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { PostCard } from "@/components/post-card"
import { getPost } from "@/lib/database"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PostPage() {
  const params = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadPost = async () => {
      if (params.id) {
        try {
          const foundPost = await getPost(params.id as string)
          setPost(foundPost || null)
        } catch (e) {
          setError(e)
          console.error("Failed to load post:", e)
        } finally {
          setLoading(false)
        }
      }
    }

    loadPost()
  }, [params.id])

  if (loading) {
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

  if (error) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Error Loading Post</h1>
            <p className="text-muted-foreground mb-6">
              An error occurred while loading the post. Please try again later.
            </p>
            <Link href="/my-thoughts">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Thoughts
              </Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    )
  }

  if (!post) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-6">The post you're looking for doesn't exist or has been deleted.</p>
            <Link href="/my-thoughts">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Thoughts
              </Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/my-thoughts">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Thoughts
              </Button>
            </Link>
          </div>

          <PostCard post={post} showFullPost={true} />
        </div>
      </div>
    </MainLayout>
  )
}
