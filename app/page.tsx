import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Brain,
  Archive,
  Users,
  Sparkles,
  Instagram,
  Linkedin,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold"> Reframe</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/explore-thoughts">
              <Button variant="ghost">Explore Thoughts</Button>
            </Link>
            <Link href="/share-evolution">
              <Button>Share Evolution</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Archive Your Evolving Beliefs
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            A place to document your philosophical evolution. Track how your
            worldviews, beliefs, and perspectives have changed over time. Share
            your journey of intellectual growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/share-evolution">
              <Button size="lg" className="text-lg px-8">
                Start Your Evolution <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/explore-thoughts">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Explore Community
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Before & After</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Compare your old beliefs with your current worldview in a clean
                side-by-side format.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Community Voting</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Let others vote on whether they align with your old or new
                philosophy.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Archive className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Smart Archive</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Deleted posts are safely archived for 7 days before permanent
                removal.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Full Customization</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Personalize your experience with themes, fonts, colors, and
                layout options.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Example Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
          <Card className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-destructive mb-2">
                    What I used to believe:
                  </h4>
                  <p className="text-muted-foreground italic">
                    "Success is purely about making money and climbing the
                    corporate ladder."
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <ArrowRight className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">
                    What I believe now:
                  </h4>
                  <p className="text-muted-foreground italic">
                    "True success is finding fulfillment, maintaining
                    relationships, and contributing positively to society."
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold mb-6">
            Ready to Track Your Evolution?
          </h3>
          <p className="text-lg text-muted-foreground mb-8">
            Join others in documenting their philosophical journey. Your
            evolution matters.
          </p>
          <Link href="/share-evolution">
            <Button size="lg" className="text-lg px-8">
              Start Tracking Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; 2024 . Reframe A place for intellectual evolution.</p>
          <div className="mt-4 gap-4 flex justify-center">
            <Link href={"https://www.instagram.com/anikeshiro/"}>
              <Instagram className="inline h-6 w-6 text-muted-foreground hover:text-primary transition-colors ml-2" />
            </Link>
            <Link href={"https://www.linkedin.com/in/anikesh-kumar-1b87b42a5/"}>
              <Linkedin className="inline h-6 w-6 text-muted-foreground hover:text-primary transition-colors ml-2" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
