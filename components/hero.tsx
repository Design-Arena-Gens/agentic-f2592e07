import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="space-y-6">
      <Badge>Agentic Workspace</Badge>
      <div className="max-w-3xl space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
          Cortex Courier helps your GTM team write emails and social posts that feel handcrafted.
        </h1>
        <p className="text-lg text-slate-300">
          Feed it your context, tone, and target audience, then ship inbox-ready threads and platform-specific social
          copy in seconds. No guesswork, no waiting in prompt queues.
        </p>
      </div>
      <div className="flex flex-wrap gap-4 text-sm text-slate-400">
        <div className="rounded-full border border-slate-800 bg-slate-900 px-4 py-2">
          Response time &lt; 1s
        </div>
        <div className="rounded-full border border-slate-800 bg-slate-900 px-4 py-2">
          Tone intelligence
        </div>
        <div className="rounded-full border border-slate-800 bg-slate-900 px-4 py-2">
          Multi-platform scripting
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button asChild size="lg">
          <Link href="#email">Generate emails</Link>
        </Button>
        <Button asChild size="lg" variant="ghost">
          <Link href="#social">Plan social launch</Link>
        </Button>
      </div>
    </section>
  );
}
