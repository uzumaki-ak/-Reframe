"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { VotingSection } from "@/components/voting-section"
import { CommentsSection } from "@/components/comments-section"
import { PostActions } from "@/components/post-actions"
import { type Post, getCurrentUser } from "@/lib/database"
import { ArrowRight, Calendar, User } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

interface PostCardProps {
  post: Post
  onUpdate?: () => void
  showFullPost?: boolean
}

export function PostCard({ post, onUpdate, showFullPost = false }: PostCardProps) {
  const [showComments, setShowComments] = useState(showFullPost)
  const currentUser = getCurrentUser()
  const isOwner = currentUser?.id === post.userId

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString))
  }

  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{post.userName}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(post.createdAt)}</span>
              {post.updatedAt !== post.createdAt && <span className="text-xs">(edited)</span>}
            </div>
          </div>
          {isOwner && <PostActions post={post} onUpdate={onUpdate} />}
        </div>

        {post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {post.categories.map((category) => (
              <Badge key={category} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>

      <CardContent className="pb-4">
        {/* Compare Section */}
        <Link href={`/post/${post.id}`} className="block">
          <div className="grid md:grid-cols-2 gap-6 mb-6 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
            {/* Before */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-destructive flex items-center gap-2">
                What I used to believe:
              </h4>
              <div className="p-3 bg-destructive/5 border border-destructive/20 rounded">
                <p className="text-sm leading-relaxed italic line-clamp-4">"{post.beforeBelief}"</p>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="md:hidden flex justify-center py-2">
              <ArrowRight className="h-5 w-5 text-muted-foreground rotate-90" />
            </div>

            {/* After */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-primary flex items-center gap-2">What I believe now:</h4>
              <div className="p-3 bg-primary/5 border border-primary/20 rounded">
                <p className="text-sm leading-relaxed italic line-clamp-4">"{post.afterBelief}"</p>
              </div>
            </div>
          </div>
        </Link>

        {/* Voting Section */}
        <VotingSection postId={post.id} />
      </CardContent>

      <CardFooter className="pt-0 flex-col items-stretch">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="sm" onClick={() => setShowComments(!showComments)}>
            {showComments ? "Hide Comments" : "Show Comments"}
          </Button>

          {!showFullPost && (
            <Link href={`/post/${post.id}`}>
              <Button variant="outline" size="sm">
                View Full Post
              </Button>
            </Link>
          )}
        </div>

        {showComments && <CommentsSection postId={post.id} />}
      </CardFooter>
    </Card>
  )
}
