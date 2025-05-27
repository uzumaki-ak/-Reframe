import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect()

    // Count users and posts
    const userCount = await prisma.user.count()
    const postCount = await prisma.post.count()

    return NextResponse.json({
      status: "Database connected successfully",
      userCount,
      postCount,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Database connection error:", error)
    return NextResponse.json(
      {
        status: "Database connection failed",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
