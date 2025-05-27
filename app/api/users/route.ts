import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    console.log("POST /api/users - Starting user creation")

    const body = await request.json()
    console.log("Request body:", body)

    const { name } = body

    if (!name || !name.trim()) {
      console.error("Name is missing or empty")
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }

    console.log("Creating user with name:", name.trim())

    const user = await prisma.user.create({
      data: { name: name.trim() },
    })

    console.log("User created successfully:", user)

    // Return user with createdAt as string for JSON serialization
    const responseUser = {
      id: user.id,
      name: user.name,
      createdAt: user.createdAt.toISOString(),
    }

    return NextResponse.json(responseUser)
  } catch (error) {
    console.error("Error creating user:", error)

    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: "Failed to create user",
          details: error.message,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}

// Add GET endpoint to retrieve user by ID
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("id")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const responseUser = {
      id: user.id,
      name: user.name,
      createdAt: user.createdAt.toISOString(),
    }

    return NextResponse.json(responseUser)
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}
