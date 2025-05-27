import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { postId: string } }) {
  try {
    const comments = await prisma.comment.findMany({
      where: { postId: params.postId },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    })

    const formattedComments = comments.map((comment) => ({
      id: comment.id,
      postId: comment.postId,
      userId: comment.userId,
      userName: comment.user.name,
      content: comment.content,
      parentId: comment.parentId,
      createdAt: comment.createdAt.toISOString(),
    }))

    return NextResponse.json(formattedComments)
  } catch (error) {
    console.error("Error fetching comments:", error)
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 })
  }
}
