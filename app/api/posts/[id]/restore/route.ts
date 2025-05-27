import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    await prisma.post.update({
      where: {
        id: params.id,
        userId: userId,
      },
      data: {
        isArchived: false,
        archivedAt: null,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error restoring post:", error)
    return NextResponse.json({ error: "Failed to restore post" }, { status: 500 })
  }
}
