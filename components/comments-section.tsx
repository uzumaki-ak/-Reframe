// "use client"

// import type React from "react"

// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { createComment, getPostComments, type Comment } from "@/lib/database"
// import { MessageCircle, Reply, Calendar, User } from "lucide-react"
// import { useEffect, useState } from "react"
// import { useToast } from "@/hooks/use-toast"
// import { useAuth } from "@/hooks/use-auth"
// import { AuthPrompt } from "./auth-prompt"

// interface CommentsSectionProps {
//   postId: string
// }

// interface CommentItemProps {
//   comment: Comment
//   onReply: (parentId: string) => void
//   level?: number
// }

// function CommentItem({ comment, onReply, level = 0 }: CommentItemProps) {
//   const { requireAuth } = useAuth()

//   const formatDate = (dateString: string) => {
//     return new Intl.DateTimeFormat("en-US", {
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     }).format(new Date(dateString))
//   }

//   const handleReply = () => {
//     const authResult = requireAuth(() => onReply(comment.id), {
//       title: "Create Account to Reply",
//       description: "Please enter your name to reply to this comment",
//     })

//     if (authResult.needsAuth) {
//       // This will be handled by the parent component
//       onReply(comment.id)
//     }
//   }

//   return (
//     <div className={`${level > 0 ? "ml-6 border-l-2 border-muted pl-4" : ""}`}>
//       <div className="space-y-2">
//         <div className="flex items-center gap-2 text-sm">
//           <User className="h-3 w-3 text-muted-foreground" />
//           <span className="font-medium">{comment.userName}</span>
//           <Calendar className="h-3 w-3 text-muted-foreground" />
//           <span className="text-muted-foreground">{formatDate(comment.createdAt)}</span>
//         </div>
//         <p className="text-sm leading-relaxed">{comment.content}</p>
//         <Button variant="ghost" size="sm" onClick={handleReply} className="h-6 px-2 text-xs">
//           <Reply className="h-3 w-3 mr-1" />
//           Reply
//         </Button>
//       </div>
//     </div>
//   )
// }

// export function CommentsSection({ postId }: CommentsSectionProps) {
//   const [comments, setComments] = useState<Comment[]>([])
//   const [newComment, setNewComment] = useState("")
//   const [replyTo, setReplyTo] = useState<string | null>(null)
//   const [replyContent, setReplyContent] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [showAuthPrompt, setShowAuthPrompt] = useState(false)
//   const [authAction, setAuthAction] = useState<"comment" | "reply">("comment")
//   const { toast } = useToast()
//   const { user, requireAuth, refreshUser } = useAuth()

//   useEffect(() => {
//     loadComments()
//   }, [postId])

//   const loadComments = async () => {
//     try {
//       const postComments = await getPostComments(postId)
//       setComments(postComments)
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to load comments.",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleSubmitComment = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!newComment.trim()) return

//     const authResult = requireAuth(() => submitComment(), {
//       title: "Create Account to Comment",
//       description: "Please enter your name to share your thoughts on this evolution",
//     })

//     if (authResult.needsAuth) {
//       setAuthAction("comment")
//       setShowAuthPrompt(true)
//       return
//     }

//     submitComment()
//   }

//   const submitComment = async () => {
//     if (!newComment.trim()) return

//     setLoading(true)
//     try {
//       const comment = await createComment({
//         postId,
//         content: newComment.trim(),
//       })

//       if (comment) {
//         setNewComment("")
//         await loadComments()
//         toast({
//           title: "Comment added",
//           description: "Your comment has been posted successfully.",
//         })
//       }
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error?.message || "Failed to post comment.",
//         variant: "destructive",
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleSubmitReply = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!replyContent.trim() || !replyTo) return

//     const authResult = requireAuth(() => submitReply(), {
//       title: "Create Account to Reply",
//       description: "Please enter your name to reply to this comment",
//     })

//     if (authResult.needsAuth) {
//       setAuthAction("reply")
//       setShowAuthPrompt(true)
//       return
//     }

//     submitReply()
//   }

//   const submitReply = async () => {
//     if (!replyContent.trim() || !replyTo) return

//     setLoading(true)
//     try {
//       const comment = await createComment({
//         postId,
//         content: replyContent.trim(),
//         parentId: replyTo,
//       })

//       if (comment) {
//         setReplyContent("")
//         setReplyTo(null)
//         await loadComments()
//         toast({
//           title: "Reply added",
//           description: "Your reply has been posted successfully.",
//         })
//       }
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error?.message || "Failed to post reply.",
//         variant: "destructive",
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleReply = (parentId: string) => {
//     const authResult = requireAuth(() => setReplyTo(parentId), {
//       title: "Create Account to Reply",
//       description: "Please enter your name to reply to this comment",
//     })

//     if (authResult.needsAuth) {
//       setAuthAction("reply")
//       setShowAuthPrompt(true)
//       return
//     }

//     setReplyTo(parentId)
//   }

//   const handleAuthSuccess = () => {
//     refreshUser()
//     if (authAction === "comment") {
//       submitComment()
//     } else if (authAction === "reply") {
//       submitReply()
//     }
//   }

//   const organizeComments = (comments: Comment[]) => {
//     const commentMap = new Map<string, Comment & { replies: Comment[] }>()
//     const rootComments: (Comment & { replies: Comment[] })[] = []

//     // First pass: create map and initialize replies array
//     comments.forEach((comment) => {
//       commentMap.set(comment.id, { ...comment, replies: [] })
//     })

//     // Second pass: organize into tree structure
//     comments.forEach((comment) => {
//       if (comment.parentId) {
//         const parent = commentMap.get(comment.parentId)
//         if (parent) {
//           parent.replies.push(commentMap.get(comment.id)!)
//         }
//       } else {
//         rootComments.push(commentMap.get(comment.id)!)
//       }
//     })

//     return rootComments
//   }

//   const renderComment = (comment: Comment & { replies: Comment[] }, level = 0) => (
//     <div key={comment.id} className="space-y-4">
//       <CommentItem comment={comment} onReply={handleReply} level={level} />

//       {replyTo === comment.id && (
//         <div className={`${level > 0 ? "ml-6" : ""}`}>
//           <form onSubmit={handleSubmitReply} className="space-y-3">
//             <Textarea
//               placeholder="Write your reply..."
//               value={replyContent}
//               onChange={(e) => setReplyContent(e.target.value)}
//               className="min-h-[80px]"
//             />
//             <div className="flex gap-2">
//               <Button type="submit" size="sm" disabled={loading || !replyContent.trim()}>
//                 {loading ? "Posting..." : "Post Reply"}
//               </Button>
//               <Button
//                 type="button"
//                 variant="outline"
//                 size="sm"
//                 onClick={() => {
//                   setReplyTo(null)
//                   setReplyContent("")
//                 }}
//               >
//                 Cancel
//               </Button>
//             </div>
//           </form>
//         </div>
//       )}

//       {comment.replies.length > 0 && (
//         <div className="space-y-4">{comment.replies.map((reply) => renderComment(reply, level + 1))}</div>
//       )}
//     </div>
//   )

//   const organizedComments = organizeComments(comments)

//   return (
//     <div className="space-y-6">
//       {/* Add Comment Form */}
//       <form onSubmit={handleSubmitComment} className="space-y-3">
//         <div className="flex items-center gap-2 text-sm text-muted-foreground">
//           <MessageCircle className="h-4 w-4" />
//           <span>Add a comment</span>
//           {!user && <span className="text-xs">(Account required)</span>}
//         </div>
//         <Textarea
//           placeholder={
//             user ? "Share your thoughts on this evolution..." : "Create an account to share your thoughts..."
//           }
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           className="min-h-[100px]"
//         />
//         <Button type="submit" disabled={loading || !newComment.trim()}>
//           {loading ? "Posting..." : user ? "Post Comment" : "Create Account & Comment"}
//         </Button>
//       </form>

//       {/* Comments List */}
//       {organizedComments.length > 0 ? (
//         <div className="space-y-6">
//           <h4 className="font-medium flex items-center gap-2">
//             <MessageCircle className="h-4 w-4" />
//             Comments ({comments.length})
//           </h4>
//           <div className="space-y-6">{organizedComments.map((comment) => renderComment(comment))}</div>
//         </div>
//       ) : (
//         <div className="text-center py-8 text-muted-foreground">
//           <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
//           <p>No comments yet. Be the first to share your thoughts!</p>
//         </div>
//       )}

//       {/* Auth Prompt */}
//       <AuthPrompt
//         isOpen={showAuthPrompt}
//         onClose={() => setShowAuthPrompt(false)}
//         onSuccess={handleAuthSuccess}
//         title={authAction === "comment" ? "Create Account to Comment" : "Create Account to Reply"}
//         description={
//           authAction === "comment"
//             ? "Please enter your name to share your thoughts on this evolution"
//             : "Please enter your name to reply to this comment"
//         }
//       />
//     </div>
//   )
// }


//!new
"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { createComment, getPostComments, type Comment } from "@/lib/database"
import { MessageCircle, Reply, Calendar, User } from "lucide-react"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { AuthPrompt } from "./auth-prompt"

interface CommentsSectionProps {
  postId: string
}

interface CommentItemProps {
  comment: Comment
  onReply: (parentId: string) => void
  level?: number
}

function CommentItem({ comment, onReply, level = 0 }: CommentItemProps) {
  const { requireAuth } = useAuth()

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString))
  }

  const handleReply = () => {
    const authResult = requireAuth(() => onReply(comment.id), {
      title: "Create Account to Reply",
      description: "Please enter your name to reply to this comment",
    })

    if (authResult.needsAuth) {
      // This will be handled by the parent component
      onReply(comment.id)
    }
  }

  return (
    <div className={`${level > 0 ? "ml-6 border-l-2 border-muted pl-4" : ""}`}>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <User className="h-3 w-3 text-muted-foreground" />
          <span className="font-medium">{comment.userName}</span>
          <Calendar className="h-3 w-3 text-muted-foreground" />
          <span className="text-muted-foreground">{formatDate(comment.createdAt)}</span>
        </div>
        <p className="text-sm leading-relaxed">{comment.content}</p>
        <Button variant="ghost" size="sm" onClick={handleReply} className="h-6 px-2 text-xs">
          <Reply className="h-3 w-3 mr-1" />
          Reply
        </Button>
      </div>
    </div>
  )
}

export function CommentsSection({ postId }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [showAuthPrompt, setShowAuthPrompt] = useState(false)
  const [authAction, setAuthAction] = useState<"comment" | "reply">("comment")
  const [pendingSubmission, setPendingSubmission] = useState<boolean>(false)
  const { toast } = useToast()
  const { user, requireAuth, refreshUser } = useAuth()

  useEffect(() => {
    loadComments()
  }, [postId])

  const loadComments = async () => {
    try {
      const postComments = await getPostComments(postId)
      setComments(postComments)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load comments.",
        variant: "destructive",
      })
    }
  }

  const submitComment = async () => {
    if (!newComment.trim() || loading || pendingSubmission) return

    setLoading(true)
    setPendingSubmission(true)
    try {
      const comment = await createComment({
        postId,
        content: newComment.trim(),
      })

      if (comment) {
        setNewComment("")
        await loadComments()
        toast({
          title: "Comment added",
          description: "Your comment has been posted successfully.",
        })
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Failed to post comment.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
      setPendingSubmission(false)
    }
  }

  const submitReply = async () => {
    if (!replyContent.trim() || !replyTo || loading || pendingSubmission) return

    setLoading(true)
    setPendingSubmission(true)
    try {
      const comment = await createComment({
        postId,
        content: replyContent.trim(),
        parentId: replyTo,
      })

      if (comment) {
        setReplyContent("")
        setReplyTo(null)
        await loadComments()
        toast({
          title: "Reply added",
          description: "Your reply has been posted successfully.",
        })
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Failed to post reply.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
      setPendingSubmission(false)
    }
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    // If user is already authenticated, submit directly
    if (user) {
      await submitComment()
      return
    }

    // If not authenticated, show auth prompt
    setAuthAction("comment")
    setShowAuthPrompt(true)
  }

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyContent.trim() || !replyTo) return

    // If user is already authenticated, submit directly
    if (user) {
      await submitReply()
      return
    }

    // If not authenticated, show auth prompt
    setAuthAction("reply")
    setShowAuthPrompt(true)
  }

  const handleReply = (parentId: string) => {
    // If user is already authenticated, set reply target directly
    if (user) {
      setReplyTo(parentId)
      return
    }

    // If not authenticated, show auth prompt
    setAuthAction("reply")
    setShowAuthPrompt(true)
    // Store the parentId for after authentication
    setReplyTo(parentId)
  }

  const handleAuthSuccess = async () => {
    await refreshUser()
    setShowAuthPrompt(false)
    
    // Only submit if we have pending content and user is now authenticated
    if (authAction === "comment" && newComment.trim()) {
      await submitComment()
    } else if (authAction === "reply" && replyContent.trim() && replyTo) {
      await submitReply()
    }
  }

  const organizeComments = (comments: Comment[]) => {
    const commentMap = new Map<string, Comment & { replies: Comment[] }>()
    const rootComments: (Comment & { replies: Comment[] })[] = []

    // First pass: create map and initialize replies array
    comments.forEach((comment) => {
      commentMap.set(comment.id, { ...comment, replies: [] })
    })

    // Second pass: organize into tree structure
    comments.forEach((comment) => {
      if (comment.parentId) {
        const parent = commentMap.get(comment.parentId)
        if (parent) {
          parent.replies.push(commentMap.get(comment.id)!)
        }
      } else {
        rootComments.push(commentMap.get(comment.id)!)
      }
    })

    return rootComments
  }

  const renderComment = (comment: Comment & { replies: Comment[] }, level = 0) => (
    <div key={comment.id} className="space-y-4">
      <CommentItem comment={comment} onReply={handleReply} level={level} />

      {replyTo === comment.id && (
        <div className={`${level > 0 ? "ml-6" : ""}`}>
          <form onSubmit={handleSubmitReply} className="space-y-3">
            <Textarea
              placeholder="Write your reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="min-h-[80px]"
            />
            <div className="flex gap-2">
              <Button type="submit" size="sm" disabled={loading || !replyContent.trim() || pendingSubmission}>
                {loading ? "Posting..." : "Post Reply"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setReplyTo(null)
                  setReplyContent("")
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {comment.replies.length > 0 && (
        <div className="space-y-4">{comment.replies.map((reply) => renderComment(reply, level + 1))}</div>
      )}
    </div>
  )

  const organizedComments = organizeComments(comments)

  return (
    <div className="space-y-6">
      {/* Add Comment Form */}
      <form onSubmit={handleSubmitComment} className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MessageCircle className="h-4 w-4" />
          <span>Add a comment</span>
          {!user && <span className="text-xs">(Account required)</span>}
        </div>
        <Textarea
          placeholder={
            user ? "Share your thoughts on this evolution..." : "Create an account to share your thoughts..."
          }
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[100px]"
        />
        <Button type="submit" disabled={loading || !newComment.trim() || pendingSubmission}>
          {loading ? "Posting..." : user ? "Post Comment" : "Create Account & Comment"}
        </Button>
      </form>

      {/* Comments List */}
      {organizedComments.length > 0 ? (
        <div className="space-y-6">
          <h4 className="font-medium flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Comments ({comments.length})
          </h4>
          <div className="space-y-6">{organizedComments.map((comment) => renderComment(comment))}</div>
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No comments yet. Be the first to share your thoughts!</p>
        </div>
      )}

      {/* Auth Prompt */}
      <AuthPrompt
        isOpen={showAuthPrompt}
        onClose={() => setShowAuthPrompt(false)}
        onSuccess={handleAuthSuccess}
        title={authAction === "comment" ? "Create Account to Comment" : "Create Account to Reply"}
        description={
          authAction === "comment"
            ? "Please enter your name to share your thoughts on this evolution"
            : "Please enter your name to reply to this comment"
        }
      />
    </div>
  )
}