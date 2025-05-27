// import { type NextRequest, NextResponse } from "next/server"
// import { prisma } from "@/lib/prisma"

// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url)
//     const archived = searchParams.get("archived")
//     const category = searchParams.get("category")
//     const search = searchParams.get("search")

//     const where: any = {}

//     if (archived !== null) {
//       where.isArchived = archived === "true"
//     }

//     if (category) {
//       where.categories = {
//         has: category,
//       }
//     }

//     if (search) {
//       const searchLower = search.toLowerCase()
//       where.OR = [
//         { beforeBelief: { contains: searchLower, mode: "insensitive" } },
//         { afterBelief: { contains: searchLower, mode: "insensitive" } },
//         { user: { name: { contains: searchLower, mode: "insensitive" } } },
//       ]
//     }

//     const posts = await prisma.post.findMany({
//       where,
//       include: {
//         user: true,
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     })

//     const formattedPosts = posts.map((post) => ({
//       id: post.id,
//       userId: post.userId,
//       userName: post.user.name,
//       beforeBelief: post.beforeBelief,
//       afterBelief: post.afterBelief,
//       categories: post.categories,
//       createdAt: post.createdAt.toISOString(),
//       updatedAt: post.updatedAt.toISOString(),
//       isArchived: post.isArchived,
//       archivedAt: post.archivedAt?.toISOString(),
//     }))

//     return NextResponse.json(formattedPosts)
//   } catch (error) {
//     console.error("Error fetching posts:", error)
//     return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     const { userId, beforeBelief, afterBelief, categories } = await request.json()

//     if (!userId || !beforeBelief || !afterBelief) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
//     }

//     const post = await prisma.post.create({
//       data: {
//         userId,
//         beforeBelief,
//         afterBelief,
//         categories: categories || [],
//       },
//       include: {
//         user: true,
//       },
//     })

//     const formattedPost = {
//       id: post.id,
//       userId: post.userId,
//       userName: post.user.name,
//       beforeBelief: post.beforeBelief,
//       afterBelief: post.afterBelief,
//       categories: post.categories,
//       createdAt: post.createdAt.toISOString(),
//       updatedAt: post.updatedAt.toISOString(),
//       isArchived: post.isArchived,
//       archivedAt: post.archivedAt?.toISOString(),
//     }

//     return NextResponse.json(formattedPost)
//   } catch (error) {
//     console.error("Error creating post:", error)
//     return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
//   }
// }

import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const archived = searchParams.get("archived")
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    const where: any = {}

    if (archived !== null) {
      where.isArchived = archived === "true"
    }

    if (category) {
      where.categories = {
        has: category,
      }
    }

    if (search) {
      const searchLower = search.toLowerCase()
      where.OR = [
        { beforeBelief: { contains: searchLower, mode: "insensitive" } },
        { afterBelief: { contains: searchLower, mode: "insensitive" } },
        { user: { name: { contains: searchLower, mode: "insensitive" } } },
      ]
    }

    const posts = await prisma.post.findMany({
      where,
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    const formattedPosts = posts.map((post) => ({
      id: post.id,
      userId: post.userId,
      userName: post.user.name,
      beforeBelief: post.beforeBelief,
      afterBelief: post.afterBelief,
      categories: post.categories,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      isArchived: post.isArchived,
      archivedAt: post.archivedAt?.toISOString(),
    }))

    return NextResponse.json(formattedPosts)
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("POST /api/posts - Starting request")

    const body = await request.json()
    console.log("Request body:", body)

    const { userId, beforeBelief, afterBelief, categories } = body

    // Validate required fields
    if (!userId) {
      console.error("Missing userId")
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    if (!beforeBelief || !beforeBelief.trim()) {
      console.error("Missing beforeBelief")
      return NextResponse.json({ error: "Before belief is required" }, { status: 400 })
    }

    if (!afterBelief || !afterBelief.trim()) {
      console.error("Missing afterBelief")
      return NextResponse.json({ error: "After belief is required" }, { status: 400 })
    }

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      console.error("User not found:", userId)
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    console.log("Creating post for user:", user.name)

    const post = await prisma.post.create({
      data: {
        userId,
        beforeBelief: beforeBelief.trim(),
        afterBelief: afterBelief.trim(),
        categories: categories || [],
      },
      include: {
        user: true,
      },
    })

    console.log("Post created successfully:", post.id)

    const formattedPost = {
      id: post.id,
      userId: post.userId,
      userName: post.user.name,
      beforeBelief: post.beforeBelief,
      afterBelief: post.afterBelief,
      categories: post.categories,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      isArchived: post.isArchived,
      archivedAt: post.archivedAt?.toISOString(),
    }

    return NextResponse.json(formattedPost)
  } catch (error) {
    console.error("Error creating post:", error)

    // Return more specific error information
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: "Failed to create post",
          details: error.message,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}
