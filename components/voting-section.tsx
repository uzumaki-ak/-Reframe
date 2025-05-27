"use client"

import { Button } from "@/components/ui/button"
import { createVote, getVoteCounts, getUserVote, formatCount } from "@/lib/database"
import { ArrowUp, ArrowDown } from "lucide-react"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface VotingSectionProps {
  postId: string
}

export function VotingSection({ postId }: VotingSectionProps) {
  const [voteCounts, setVoteCounts] = useState({
    beforeUp: 0,
    beforeDown: 0,
    afterUp: 0,
    afterDown: 0,
  })
  const [userVotes, setUserVotes] = useState<{ before?: string; after?: string }>({})
  const { toast } = useToast()

  useEffect(() => {
    loadVotes()
  }, [postId])

  const loadVotes = async () => {
    try {
      const counts = await getVoteCounts(postId)
      const userVote = await getUserVote(postId)
      setVoteCounts(counts)
      setUserVotes(userVote)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load votes. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleVote = async (type: "before_up" | "before_down" | "after_up" | "after_down") => {
    try {
      const vote = await createVote({ postId, type })
      if (vote) {
        await loadVotes()
        toast({
          title: "Vote recorded",
          description: "Your vote has been recorded successfully.",
        })
      } else {
        toast({
          title: "Error",
          description: "Please set your name first to vote.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record vote. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getVoteButtonVariant = (voteType: string, side: "before" | "after") => {
    const userVote = userVotes[side]
    if (userVote === voteType) {
      return voteType === "up" ? "default" : "destructive"
    }
    return "outline"
  }

  return (
    <div className="border rounded-lg p-4 bg-muted/20">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Before Voting */}
        <div className="space-y-3">
          <h5 className="text-sm font-medium text-center">I still believe this</h5>
          <div className="flex items-center justify-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <Button
                variant={getVoteButtonVariant("up", "before")}
                size="sm"
                onClick={() => handleVote("before_up")}
                className="h-8 w-8 p-0"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
              <span className="text-xs font-medium">{formatCount(voteCounts.beforeUp)}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Button
                variant={getVoteButtonVariant("down", "before")}
                size="sm"
                onClick={() => handleVote("before_down")}
                className="h-8 w-8 p-0"
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
              <span className="text-xs font-medium">{formatCount(voteCounts.beforeDown)}</span>
            </div>
          </div>
        </div>

        {/* After Voting */}
        <div className="space-y-3">
          <h5 className="text-sm font-medium text-center">I'm with your new philosophy</h5>
          <div className="flex items-center justify-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <Button
                variant={getVoteButtonVariant("up", "after")}
                size="sm"
                onClick={() => handleVote("after_up")}
                className="h-8 w-8 p-0"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
              <span className="text-xs font-medium">{formatCount(voteCounts.afterUp)}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Button
                variant={getVoteButtonVariant("down", "after")}
                size="sm"
                onClick={() => handleVote("after_down")}
                className="h-8 w-8 p-0"
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
              <span className="text-xs font-medium">{formatCount(voteCounts.afterDown)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
