// export interface User {
//   id: string
//   name: string
//   createdAt: string
// }

// export interface Post {
//   id: string
//   userId: string
//   userName: string
//   beforeBelief: string
//   afterBelief: string
//   categories: string[]
//   createdAt: string
//   updatedAt: string
//   isArchived: boolean
//   archivedAt?: string
// }

// export interface Comment {
//   id: string
//   postId: string
//   userId: string
//   userName: string
//   content: string
//   parentId?: string
//   createdAt: string
// }

// export interface Vote {
//   id: string
//   postId: string
//   userId: string
//   type: "before_up" | "before_down" | "after_up" | "after_down"
//   createdAt: string
// }

// // Helper functions
// export function generateId(): string {
//   return Math.random().toString(36).substr(2, 9) + Date.now().toString(36)
// }

// export function getCurrentUser(): User | null {
//   if (typeof window === "undefined") return null
//   try {
//     const item = localStorage.getItem("philosophy_tracker_current_user")
//     return item ? JSON.parse(item) : null
//   } catch {
//     return null
//   }
// }

// export function setCurrentUser(user: User): void {
//   if (typeof window === "undefined") return
//   try {
//     localStorage.setItem("philosophy_tracker_current_user", JSON.stringify(user))
//   } catch (error) {
//     console.error("Failed to save current user:", error)
//   }
// }

// // User operations
// export async function createUser(name: string): Promise<User> {
//   const response = await fetch("/api/users", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ name }),
//   })

//   if (!response.ok) {
//     throw new Error("Failed to create user")
//   }

//   const user = await response.json()
//   setCurrentUser(user)
//   return user
// }

// // Post operations
// export async function createPost(data: {
//   beforeBelief: string
//   afterBelief: string
//   categories: string[]
// }): Promise<Post> {
//   const user = getCurrentUser()
//   if (!user) throw new Error("User not found")

//   const response = await fetch("/api/posts", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       userId: user.id,
//       beforeBelief: data.beforeBelief,
//       afterBelief: data.afterBelief,
//       categories: data.categories,
//     }),
//   })

//   if (!response.ok) {
//     throw new Error("Failed to create post")
//   }

//   return await response.json()
// }

// export async function getAllPosts(filters?: {
//   category?: string
//   search?: string
//   archived?: boolean
// }): Promise<Post[]> {
//   const params = new URLSearchParams()

//   if (filters?.archived !== undefined) {
//     params.append("archived", filters.archived.toString())
//   }
//   if (filters?.category) {
//     params.append("category", filters.category)
//   }
//   if (filters?.search) {
//     params.append("search", filters.search)
//   }

//   const response = await fetch(`/api/posts?${params.toString()}`)

//   if (!response.ok) {
//     throw new Error("Failed to fetch posts")
//   }

//   return await response.json()
// }

// export async function getPost(id: string): Promise<Post | null> {
//   const response = await fetch(`/api/posts/${id}`)

//   if (response.status === 404) {
//     return null
//   }

//   if (!response.ok) {
//     throw new Error("Failed to fetch post")
//   }

//   return await response.json()
// }

// export async function updatePost(
//   id: string,
//   data: {
//     beforeBelief?: string
//     afterBelief?: string
//     categories?: string[]
//   },
// ): Promise<Post | null> {
//   const user = getCurrentUser()
//   if (!user) return null

//   const response = await fetch(`/api/posts/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       userId: user.id,
//       ...data,
//     }),
//   })

//   if (!response.ok) {
//     return null
//   }

//   return await response.json()
// }

// export async function deletePost(id: string): Promise<boolean> {
//   const user = getCurrentUser()
//   if (!user) return false

//   const response = await fetch(`/api/posts/${id}?userId=${user.id}`, {
//     method: "DELETE",
//   })

//   return response.ok
// }

// export async function permanentlyDeletePost(id: string): Promise<boolean> {
//   const user = getCurrentUser()
//   if (!user) return false

//   const response = await fetch(`/api/posts/${id}?userId=${user.id}&permanent=true`, {
//     method: "DELETE",
//   })

//   return response.ok
// }

// export async function restorePost(id: string): Promise<boolean> {
//   const user = getCurrentUser()
//   if (!user) return false

//   const response = await fetch(`/api/posts/${id}/restore`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ userId: user.id }),
//   })

//   return response.ok
// }

// // Comment operations
// export async function createComment(data: {
//   postId: string
//   content: string
//   parentId?: string
// }): Promise<Comment> {
//   const user = getCurrentUser()
//   if (!user) throw new Error("User not found")

//   const response = await fetch("/api/comments", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       postId: data.postId,
//       userId: user.id,
//       content: data.content,
//       parentId: data.parentId,
//     }),
//   })

//   if (!response.ok) {
//     throw new Error("Failed to create comment")
//   }

//   return await response.json()
// }

// export async function getPostComments(postId: string): Promise<Comment[]> {
//   const response = await fetch(`/api/comments/${postId}`)

//   if (!response.ok) {
//     throw new Error("Failed to fetch comments")
//   }

//   return await response.json()
// }

// // Vote operations
// export async function createVote(data: {
//   postId: string
//   type: "before_up" | "before_down" | "after_up" | "after_down"
// }): Promise<Vote | null> {
//   const user = getCurrentUser()
//   if (!user) return null

//   const response = await fetch("/api/votes", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       postId: data.postId,
//       userId: user.id,
//       type: data.type,
//     }),
//   })

//   if (!response.ok) {
//     return null
//   }

//   return await response.json()
// }

// export async function getVoteCounts(postId: string) {
//   const user = getCurrentUser()
//   const params = new URLSearchParams()
//   if (user) {
//     params.append("userId", user.id)
//   }

//   const response = await fetch(`/api/votes/${postId}?${params.toString()}`)

//   if (!response.ok) {
//     throw new Error("Failed to fetch votes")
//   }

//   const data = await response.json()
//   return data.counts
// }

// export async function getUserVote(postId: string): Promise<{ before?: string; after?: string }> {
//   const user = getCurrentUser()
//   if (!user) return {}

//   const response = await fetch(`/api/votes/${postId}?userId=${user.id}`)

//   if (!response.ok) {
//     return {}
//   }

//   const data = await response.json()
//   return data.userVotes
// }

// // Utility functions
// export async function getAllCategories(): Promise<string[]> {
//   const response = await fetch("/api/categories")

//   if (!response.ok) {
//     throw new Error("Failed to fetch categories")
//   }

//   return await response.json()
// }

// export function formatCount(count: number): string {
//   if (count < 1000) return count.toString()
//   if (count < 1000000) return (count / 1000).toFixed(1).replace(".0", "") + "k"
//   return (count / 1000000).toFixed(1).replace(".0", "") + "M"
// }

export interface User {
  id: string
  name: string
  createdAt: string
}

export interface Post {
  id: string
  userId: string
  userName: string
  beforeBelief: string
  afterBelief: string
  categories: string[]
  createdAt: string
  updatedAt: string
  isArchived: boolean
  archivedAt?: string
}

export interface Comment {
  id: string
  postId: string
  userId: string
  userName: string
  content: string
  parentId?: string
  createdAt: string
}

export interface Vote {
  id: string
  postId: string
  userId: string
  type: "before_up" | "before_down" | "after_up" | "after_down"
  createdAt: string
}

// Helper functions
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36)
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  try {
    const item = localStorage.getItem("philosophy_tracker_current_user")
    const user = item ? JSON.parse(item) : null
    console.log("getCurrentUser:", user)
    return user
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

export function setCurrentUser(user: User): void {
  if (typeof window === "undefined") return
  try {
    console.log("setCurrentUser:", user)
    localStorage.setItem("philosophy_tracker_current_user", JSON.stringify(user))

    // Verify it was saved
    const saved = localStorage.getItem("philosophy_tracker_current_user")
    console.log("Verified saved user:", saved)
  } catch (error) {
    console.error("Failed to save current user:", error)
  }
}

// User operations
export async function createUser(name: string): Promise<User> {
  try {
    console.log("createUser called with name:", name)

    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })

    console.log("User creation response status:", response.status)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("User creation failed:", errorData)
      throw new Error(errorData.error || `HTTP ${response.status}: Failed to create user`)
    }

    const user = await response.json()
    console.log("User created successfully:", user)

    setCurrentUser(user)

    // Verify user was saved
    const savedUser = getCurrentUser()
    console.log("Verified user after creation:", savedUser)

    return user
  } catch (error) {
    console.error("Error in createUser:", error)
    throw error
  }
}

// Add function to verify user exists
export async function verifyUser(userId: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/users?id=${userId}`)
    return response.ok
  } catch (error) {
    console.error("Error verifying user:", error)
    return false
  }
}

// Post operations
export async function createPost(data: {
  beforeBelief: string
  afterBelief: string
  categories: string[]
}): Promise<Post> {
  console.log("createPost called")

  const user = getCurrentUser()
  console.log("Current user from localStorage:", user)

  if (!user) {
    console.error("No user found in localStorage")
    throw new Error("No user found. Please set your name first.")
  }

  // Verify user exists in database
  console.log("Verifying user exists in database...")
  const userExists = await verifyUser(user.id)
  if (!userExists) {
    console.error("User not found in database:", user.id)
    throw new Error("User not found in database. Please refresh and try again.")
  }

  console.log("User verified, creating post with data:", {
    userId: user.id,
    beforeBelief: data.beforeBelief.substring(0, 50) + "...",
    afterBelief: data.afterBelief.substring(0, 50) + "...",
    categories: data.categories,
  })

  try {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        beforeBelief: data.beforeBelief,
        afterBelief: data.afterBelief,
        categories: data.categories,
      }),
    })

    console.log("Post creation response status:", response.status)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("API Error:", errorData)
      throw new Error(errorData.error || `HTTP ${response.status}: Failed to create post`)
    }

    const post = await response.json()
    console.log("Post created successfully:", post.id)
    return post
  } catch (error) {
    console.error("Error in createPost:", error)
    throw error
  }
}

export async function getAllPosts(filters?: {
  category?: string
  search?: string
  archived?: boolean
}): Promise<Post[]> {
  try {
    const params = new URLSearchParams()

    if (filters?.archived !== undefined) {
      params.append("archived", filters.archived.toString())
    }
    if (filters?.category) {
      params.append("category", filters.category)
    }
    if (filters?.search) {
      params.append("search", filters.search)
    }

    const response = await fetch(`/api/posts?${params.toString()}`)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || "Failed to fetch posts")
    }

    return await response.json()
  } catch (error) {
    console.error("Error in getAllPosts:", error)
    throw error
  }
}

export async function getPost(id: string): Promise<Post | null> {
  try {
    const response = await fetch(`/api/posts/${id}`)

    if (response.status === 404) {
      return null
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || "Failed to fetch post")
    }

    return await response.json()
  } catch (error) {
    console.error("Error in getPost:", error)
    throw error
  }
}

export async function updatePost(
  id: string,
  data: {
    beforeBelief?: string
    afterBelief?: string
    categories?: string[]
  },
): Promise<Post | null> {
  const user = getCurrentUser()
  if (!user) return null

  try {
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        ...data,
      }),
    })

    if (!response.ok) {
      return null
    }

    return await response.json()
  } catch (error) {
    console.error("Error in updatePost:", error)
    return null
  }
}

export async function deletePost(id: string): Promise<boolean> {
  const user = getCurrentUser()
  if (!user) return false

  try {
    const response = await fetch(`/api/posts/${id}?userId=${user.id}`, {
      method: "DELETE",
    })

    return response.ok
  } catch (error) {
    console.error("Error in deletePost:", error)
    return false
  }
}

export async function permanentlyDeletePost(id: string): Promise<boolean> {
  const user = getCurrentUser()
  if (!user) return false

  try {
    const response = await fetch(`/api/posts/${id}?userId=${user.id}&permanent=true`, {
      method: "DELETE",
    })

    return response.ok
  } catch (error) {
    console.error("Error in permanentlyDeletePost:", error)
    return false
  }
}

export async function restorePost(id: string): Promise<boolean> {
  const user = getCurrentUser()
  if (!user) return false

  try {
    const response = await fetch(`/api/posts/${id}/restore`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user.id }),
    })

    return response.ok
  } catch (error) {
    console.error("Error in restorePost:", error)
    return false
  }
}

// Comment operations
export async function createComment(data: {
  postId: string
  content: string
  parentId?: string
}): Promise<Comment> {
  const user = getCurrentUser()
  if (!user) throw new Error("User not found")

  try {
    const response = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: data.postId,
        userId: user.id,
        content: data.content,
        parentId: data.parentId,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || "Failed to create comment")
    }

    return await response.json()
  } catch (error) {
    console.error("Error in createComment:", error)
    throw error
  }
}

export async function getPostComments(postId: string): Promise<Comment[]> {
  try {
    const response = await fetch(`/api/comments/${postId}`)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || "Failed to fetch comments")
    }

    return await response.json()
  } catch (error) {
    console.error("Error in getPostComments:", error)
    throw error
  }
}

// Vote operations
export async function createVote(data: {
  postId: string
  type: "before_up" | "before_down" | "after_up" | "after_down"
}): Promise<Vote | null> {
  const user = getCurrentUser()
  if (!user) return null

  try {
    const response = await fetch("/api/votes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: data.postId,
        userId: user.id,
        type: data.type,
      }),
    })

    if (!response.ok) {
      return null
    }

    return await response.json()
  } catch (error) {
    console.error("Error in createVote:", error)
    return null
  }
}

export async function getVoteCounts(postId: string) {
  try {
    const user = getCurrentUser()
    const params = new URLSearchParams()
    if (user) {
      params.append("userId", user.id)
    }

    const response = await fetch(`/api/votes/${postId}?${params.toString()}`)

    if (!response.ok) {
      throw new Error("Failed to fetch votes")
    }

    const data = await response.json()
    return data.counts
  } catch (error) {
    console.error("Error in getVoteCounts:", error)
    return {
      beforeUp: 0,
      beforeDown: 0,
      afterUp: 0,
      afterDown: 0,
    }
  }
}

export async function getUserVote(postId: string): Promise<{ before?: string; after?: string }> {
  const user = getCurrentUser()
  if (!user) return {}

  try {
    const response = await fetch(`/api/votes/${postId}?userId=${user.id}`)

    if (!response.ok) {
      return {}
    }

    const data = await response.json()
    return data.userVotes
  } catch (error) {
    console.error("Error in getUserVote:", error)
    return {}
  }
}

// Utility functions
export async function getAllCategories(): Promise<string[]> {
  try {
    const response = await fetch("/api/categories")

    if (!response.ok) {
      throw new Error("Failed to fetch categories")
    }

    return await response.json()
  } catch (error) {
    console.error("Error in getAllCategories:", error)
    return []
  }
}

export function formatCount(count: number): string {
  if (count < 1000) return count.toString()
  if (count < 1000000) return (count / 1000).toFixed(1).replace(".0", "") + "k"
  return (count / 1000000).toFixed(1).replace(".0", "") + "M"
}
