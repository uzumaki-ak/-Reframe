import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST() {
  try {
    console.log("=== TEST USER CREATION ===")

    // Test database connection
    await prisma.$connect()
    console.log("Database connected successfully")

    // Create a test user
    const testUser = await prisma.user.create({
      data: {
        name: "Test User " + Date.now(),
      },
    })

    console.log("Test user created:", testUser)

    // Verify user exists
    const foundUser = await prisma.user.findUnique({
      where: { id: testUser.id },
    })

    console.log("User found:", foundUser)

    return NextResponse.json({
      success: true,
      created: testUser,
      found: foundUser,
    })
  } catch (error) {
    console.error("Test user creation failed:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
