import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest, context: any) {
  try {
    // Ensure params are resolved by destructuring after context
    const { params } = context;
    const postId = params.postId;

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const votes = await prisma.vote.findMany({
      where: { postId },
    });

    const counts = {
      beforeUp: votes.filter((vote) => vote.type === "BEFORE_UP").length,
      beforeDown: votes.filter((vote) => vote.type === "BEFORE_DOWN").length,
      afterUp: votes.filter((vote) => vote.type === "AFTER_UP").length,
      afterDown: votes.filter((vote) => vote.type === "AFTER_DOWN").length,
    };

    let userVotes = {};
    if (userId) {
      const userVoteRecords = await prisma.vote.findMany({
        where: {
          postId,
          userId,
        },
      });

      const result: { before?: string; after?: string } = {};
      userVoteRecords.forEach((vote) => {
        if (vote.type.startsWith("BEFORE")) {
          result.before = vote.type.endsWith("UP") ? "up" : "down";
        } else {
          result.after = vote.type.endsWith("UP") ? "up" : "down";
        }
      });

      userVotes = result;
    }

    return NextResponse.json({ counts, userVotes });
  } catch (error) {
    console.error("Error fetching votes:", error);
    return NextResponse.json({ error: "Failed to fetch votes" }, { status: 500 });
  }
}