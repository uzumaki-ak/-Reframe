import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const { postId, userId, content, parentId } = await request.json()

    if (!postId || !userId || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const comment = await prisma.comment.create({
      data: {
        postId,
        userId,
        content,
        parentId: parentId || null,
      },
      include: {
        user: true,
      },
    })

    return NextResponse.json({
      id: comment.id,
      postId: comment.postId,
      userId: comment.userId,
      userName: comment.user.name,
      content: comment.content,
      parentId: comment.parentId,
      createdAt: comment.createdAt.toISOString(),
    })
  } catch (error) {
    console.error("Error creating comment:", error)
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 })
  }
}
