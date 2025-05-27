import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const { postId, userId, type } = await request.json()

    if (!postId || !userId || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Convert type to enum format
    const voteTypeMap = {
      before_up: "BEFORE_UP",
      before_down: "BEFORE_DOWN",
      after_up: "AFTER_UP",
      after_down: "AFTER_DOWN",
    } as const

    const voteType = voteTypeMap[type as keyof typeof voteTypeMap]

    if (!voteType) {
      return NextResponse.json({ error: "Invalid vote type" }, { status: 400 })
    }

    // Use upsert to handle existing votes
    const vote = await prisma.vote.upsert({
      where: {
        postId_userId_type: {
          postId,
          userId,
          type: voteType,
        },
      },
      update: {
        type: voteType,
        updatedAt: new Date(),
      },
      create: {
        postId,
        userId,
        type: voteType,
      },
    })

    return NextResponse.json({
      id: vote.id,
      postId: vote.postId,
      userId: vote.userId,
      type: type,
      createdAt: vote.createdAt.toISOString(),
    })
  } catch (error) {
    console.error("Error creating vote:", error)
    return NextResponse.json({ error: "Failed to create vote" }, { status: 500 })
  }
}
