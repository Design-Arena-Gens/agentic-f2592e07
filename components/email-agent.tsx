"use client";

import { useMemo, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ToneOption } from "@/lib/generator";
import { Loader2, Mail } from "lucide-react";

const toneOptions: { value: ToneOption; label: string; helper: string }[] = [
  { value: "professional", label: "Professional", helper: "Executive-ready" },
  { value: "friendly", label: "Friendly", helper: "Approachable and upbeat" },
  { value: "bold", label: "Bold", helper: "High-energy" },
  { value: "playful", label: "Playful", helper: "Creative spark" },
  { value: "empathetic", label: "Empathetic", helper: "Supportive" }
];

interface FormState {
  senderName: string;
  recipientName: string;
  subjectIdea: string;
  objective: string;
  tone: ToneOption;
  callToAction: string;
}

const defaultState: FormState = {
  senderName: "Ava from Cortex",
  recipientName: "Jordan",
  subjectIdea: "Sprint recap & handoff",
  objective: "align on the decisions from our product sprint",
  tone: "professional",
  callToAction: "Could you review the attached action grid and drop approvals by Thursday?"
};

interface EmailResult {
  subjectLine: string[];
  previewText: string;
  intro: string;
  body: string[];
  signoff: string;
}

export function EmailAgent() {
  const [form, setForm] = useState<FormState>(defaultState);
  const [result, setResult] = useState<EmailResult | null>(null);
  const [isPending, startTransition] = useTransition();

  const canSubmit = useMemo(() => {
    return Boolean(form.subjectIdea && form.objective && form.callToAction);
  }, [form]);

  const handleSubmit = () => {
    if (!canSubmit) return;
    startTransition(async () => {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "email",
          payload: form
        })
      });

      if (!response.ok) {
        setResult(null);
        return;
      }

      const data = (await response.json()) as { result: EmailResult };
      setResult(data.result);
    });
  };

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Card glow>
      <CardHeader>
        <div className="flex flex-col gap-2">
          <CardTitle className="flex items-center gap-2 text-xl">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-accent">
              <Mail className="h-5 w-5" />
            </span>
            Email Composer
          </CardTitle>
          <CardDescription>
            Launch context-rich, ready-to-send emails with adaptive tone, subject line variants, and CTA guardrails.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-xs uppercase tracking-wide text-slate-400">From</span>
            <input
              className="w-full rounded-lg border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-50 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40"
              value={form.senderName}
              onChange={(event) => updateField("senderName", event.target.value)}
              placeholder="Your name"
            />
          </label>
          <label className="space-y-2">
            <span className="text-xs uppercase tracking-wide text-slate-400">To</span>
            <input
              className="w-full rounded-lg border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-50 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40"
              value={form.recipientName}
              onChange={(event) => updateField("recipientName", event.target.value)}
              placeholder="Recipient name"
            />
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-xs uppercase tracking-wide text-slate-400">Subject spark</span>
            <input
              className="w-full rounded-lg border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-50 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40"
              value={form.subjectIdea}
              onChange={(event) => updateField("subjectIdea", event.target.value)}
              placeholder="What is the conversation about?"
            />
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-xs uppercase tracking-wide text-slate-400">Objective</span>
            <textarea
              className="min-h-[96px] w-full rounded-lg border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-50 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40"
              value={form.objective}
              onChange={(event) => updateField("objective", event.target.value)}
              placeholder="What outcome do you want?"
            />
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-xs uppercase tracking-wide text-slate-400">Call to action</span>
            <textarea
              className="min-h-[96px] w-full rounded-lg border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-50 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40"
              value={form.callToAction}
              onChange={(event) => updateField("callToAction", event.target.value)}
              placeholder="What should they do next?"
            />
          </label>
          <div className="md:col-span-2">
            <span className="text-xs uppercase tracking-wide text-slate-400">Tone palette</span>
            <div className="mt-2 grid gap-2 md:grid-cols-5">
              {toneOptions.map((tone) => (
                <button
                  key={tone.value}
                  type="button"
                  onClick={() => updateField("tone", tone.value)}
                  className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                    form.tone === tone.value
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-slate-800 bg-slate-950/70 text-slate-300 hover:border-slate-600"
                  }`}
                >
                  <div className="font-medium">{tone.label}</div>
                  <div className="text-xs text-slate-400">{tone.helper}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <small className="text-xs text-slate-500">
            Outputs include subject variants, preview text, and structured body paragraphs aligned to the tone.
          </small>
          <Button onClick={handleSubmit} disabled={!canSubmit || isPending} size="lg">
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Generate Email Playbook
          </Button>
        </div>

        {result ? (
          <div className="mt-8 space-y-6 rounded-2xl border border-slate-800 bg-slate-950/80 p-6">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wide text-slate-400">Subject line options</p>
              <ul className="space-y-2 text-sm">
                {result.subjectLine.map((subject) => (
                  <li key={subject} className="rounded-lg border border-slate-800/70 bg-slate-900/70 px-3 py-2">
                    {subject}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wide text-slate-400">Preview text</p>
              <p className="text-sm text-slate-300">{result.previewText}</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wide text-slate-400">Body copy</p>
              <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-sm leading-relaxed text-slate-200">
                <p>{result.intro}</p>
                {result.body.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                <p className="font-semibold text-slate-100">{result.signoff}</p>
              </div>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
