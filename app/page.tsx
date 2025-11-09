import { EmailAgent } from "@/components/email-agent";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { SocialAgent } from "@/components/social-agent";

export default function Page() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-16 px-6 py-16 sm:px-8">
      <Hero />
      <Features />
      <div id="email">
        <EmailAgent />
      </div>
      <div id="social">
        <SocialAgent />
      </div>
      <Footer />
    </main>
  );
}
