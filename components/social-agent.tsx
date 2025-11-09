"use client";

import { useMemo, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ToneOption } from "@/lib/generator";
import { Megaphone } from "lucide-react";

const toneOptions: { value: ToneOption; label: string }[] = [
  { value: "professional", label: "Professional" },
  { value: "friendly", label: "Friendly" },
  { value: "bold", label: "Bold" },
  { value: "playful", label: "Playful" },
  { value: "empathetic", label: "Empathetic" }
];

const platformPresets = ["LinkedIn", "Twitter", "Instagram", "Facebook", "TikTok"];

interface FormState {
  campaignName: string;
  keyMessage: string;
  tone: ToneOption;
  targetAudience: string;
  platforms: string[];
  url: string;
}

const defaultState: FormState = {
  campaignName: "Product Velocity Sprint",
  keyMessage: "we're cutting launch prep from weeks to days",
  tone: "bold",
  targetAudience: "startup operators",
  platforms: ["LinkedIn", "Twitter"],
  url: "https://cortex-courier.playbook"
};

interface SocialResult {
  campaignHeadline: string;
  angleSummary: string;
  platformBreakdowns: {
    platform: string;
    primaryCopy: string;
    supportNotes: string[];
  }[];
  moodboard: string[];
}

export function SocialAgent() {
  const [form, setForm] = useState<FormState>(defaultState);
  const [result, setResult] = useState<SocialResult | null>(null);
  const [isPending, startTransition] = useTransition();

  const canSubmit = useMemo(() => {
    return Boolean(form.campaignName && form.keyMessage && form.platforms.length > 0);
  }, [form]);

  const togglePlatform = (platform: string) => {
    setForm((prev) => {
      const exists = prev.platforms.includes(platform);
      const platforms = exists
        ? prev.platforms.filter((value) => value !== platform)
        : [...prev.platforms, platform];
      return { ...prev, platforms };
    });
  };

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    startTransition(async () => {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "social",
          payload: { ...form, platforms: form.platforms.map((value) => value.toLowerCase()) }
        })
      });

      if (!response.ok) {
        setResult(null);
        return;
      }

      const data = (await response.json()) as { result: SocialResult };
      setResult(data.result);
    });
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <div className="flex flex-col gap-2">
          <CardTitle className="flex items-center gap-2 text-xl">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-accent">
              <Megaphone className="h-5 w-5" />
            </span>
            Social Content Architect
          </CardTitle>
          <CardDescription>
            Spin up multi-platform scripts, platform notes, and a creative moodboard to keep your launch in sync.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-xs uppercase tracking-wide text-slate-400">Campaign</span>
            <input
              className="w-full rounded-lg border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-50 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40"
              value={form.campaignName}
              onChange={(event) => updateField("campaignName", event.target.value)}
              placeholder="Launch codename"
            />
          </label>
          <label className="space-y-2">
            <span className="text-xs uppercase tracking-wide text-slate-400">Audience</span>
            <input
              className="w-full rounded-lg border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-50 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40"
              value={form.targetAudience}
              onChange={(event) => updateField("targetAudience", event.target.value)}
              placeholder="Who is this for?"
            />
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-xs uppercase tracking-wide text-slate-400">Key message</span>
            <textarea
              className="min-h-[80px] w-full rounded-lg border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-50 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40"
              value={form.keyMessage}
              onChange={(event) => updateField("keyMessage", event.target.value)}
              placeholder="What do you want the world to feel?"
            />
          </label>
          <label className="space-y-2">
            <span className="text-xs uppercase tracking-wide text-slate-400">Campaign link</span>
            <input
              className="w-full rounded-lg border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-50 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40"
              value={form.url}
              onChange={(event) => updateField("url", event.target.value)}
              placeholder="https://"
            />
          </label>
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wide text-slate-400">Tone</span>
            <div className="flex flex-wrap gap-2">
              {toneOptions.map((tone) => (
                <button
                  key={tone.value}
                  type="button"
                  onClick={() => updateField("tone", tone.value)}
                  className={`rounded-full border px-4 py-2 text-xs font-medium transition ${
                    form.tone === tone.value
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-slate-800 bg-slate-950/70 text-slate-300 hover:border-slate-600"
                  }`}
                >
                  {tone.label}
                </button>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <span className="text-xs uppercase tracking-wide text-slate-400">Platforms</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {platformPresets.map((platform) => {
                const active = form.platforms.includes(platform);
                return (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => togglePlatform(platform)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      active
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-slate-800 bg-slate-950/70 text-slate-300 hover:border-slate-600"
                    }`}
                  >
                    {platform}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <small className="text-xs text-slate-500">
            You'll get platform-ready scripts, structural guidelines, and a visual moodboard keyword bank.
          </small>
          <Button onClick={handleSubmit} disabled={!canSubmit || isPending} size="lg">
            {isPending ? "Generating..." : "Build Launch Kit"}
          </Button>
        </div>

        {result ? (
          <div className="mt-8 space-y-6 rounded-2xl border border-slate-800 bg-slate-950/80 p-6">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">Campaign headline</p>
              <p className="mt-1 text-lg font-semibold text-slate-100">{result.campaignHeadline}</p>
              <p className="text-sm text-slate-400">{result.angleSummary}</p>
            </div>
            <div className="space-y-4">
              {result.platformBreakdowns.map((platform) => (
                <div
                  key={platform.platform}
                  className="rounded-xl border border-slate-800/70 bg-slate-900/70 p-4"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-accent">{platform.platform}</h4>
                  </div>
                  <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-200">
                    {platform.primaryCopy}
                  </p>
                  <ul className="mt-3 space-y-1 text-xs text-slate-400">
                    {platform.supportNotes.map((note, index) => (
                      <li key={index}>• {note}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">Moodboard keywords</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {result.moodboard.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-xs text-slate-300"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
