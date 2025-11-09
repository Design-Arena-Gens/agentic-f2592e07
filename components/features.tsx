import { Lightbulb, Radar, Sparkles } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Context-aware drafting",
    description:
      "Feed the agent your objective and recipient and it assembles subject line variants, preview text, and structured paragraphs optimized for clarity."
  },
  {
    icon: Radar,
    title: "Channel-ready blueprints",
    description:
      "Instantly spin up platform-specific scripts with guidelines tailored to character counts, hook structure, and hashtag strategy."
  },
  {
    icon: Lightbulb,
    title: "Creative direction",
    description:
      "Lock in the vibe with moodboard keywords and tone descriptors so design, copy, and video teams stay in sync."
  }
];

export function Features() {
  return (
    <section className="grid gap-6 md:grid-cols-3">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-md shadow-slate-950/40"
        >
          <feature.icon className="h-6 w-6 text-accent" />
          <h3 className="mt-4 text-lg font-semibold text-slate-100">{feature.title}</h3>
          <p className="mt-2 text-sm text-slate-400">{feature.description}</p>
        </div>
      ))}
    </section>
  );
}
