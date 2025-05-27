import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      select: { categories: true },
    })

    const categories = new Set<string>()
    posts.forEach((post) => {
      post.categories.forEach((category) => categories.add(category))
    })

    return NextResponse.json(Array.from(categories).sort())
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}
