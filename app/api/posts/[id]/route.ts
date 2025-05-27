import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
      include: {
        user: true,
      },
    })

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

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
    console.error("Error fetching post:", error)
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId, beforeBelief, afterBelief, categories } = await request.json()

    const post = await prisma.post.update({
      where: {
        id: params.id,
        userId: userId, // Ensure user owns the post
      },
      data: {
        beforeBelief,
        afterBelief,
        categories,
        updatedAt: new Date(),
      },
      include: {
        user: true,
      },
    })

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
    console.error("Error updating post:", error)
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const permanent = searchParams.get("permanent") === "true"

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    if (permanent) {
      await prisma.post.delete({
        where: {
          id: params.id,
          userId: userId,
        },
      })
    } else {
      await prisma.post.update({
        where: {
          id: params.id,
          userId: userId,
        },
        data: {
          isArchived: true,
          archivedAt: new Date(),
        },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting post:", error)
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
  }
}
