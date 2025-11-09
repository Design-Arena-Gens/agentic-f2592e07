import { NextResponse } from "next/server";
import { generateEmailCopy, generateSocialPlan, type ToneOption } from "@/lib/generator";

interface EmailRequest {
  kind: "email";
  payload: {
    senderName: string;
    recipientName: string;
    subjectIdea: string;
    objective: string;
    tone: ToneOption;
    callToAction: string;
  };
}

interface SocialRequest {
  kind: "social";
  payload: {
    campaignName: string;
    keyMessage: string;
    tone: ToneOption;
    targetAudience: string;
    platforms: string[];
    url?: string;
  };
}

type AgentRequest = EmailRequest | SocialRequest;

const allowedTones: ToneOption[] = ["professional", "friendly", "bold", "playful", "empathetic"];

function validateTone(tone: string): tone is ToneOption {
  return allowedTones.includes(tone as ToneOption);
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as AgentRequest;

    if (!data || !("kind" in data)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    if (data.kind === "email") {
      const { payload } = data;
      if (!validateTone(payload.tone)) {
        return NextResponse.json({ error: "Unsupported tone" }, { status: 422 });
      }

      const result = generateEmailCopy(payload);
      return NextResponse.json({ result });
    }

    if (data.kind === "social") {
      const { payload } = data;
      if (!validateTone(payload.tone)) {
        return NextResponse.json({ error: "Unsupported tone" }, { status: 422 });
      }

      const result = generateSocialPlan(payload);
      return NextResponse.json({ result });
    }

    return NextResponse.json({ error: "Unknown agent kind" }, { status: 400 });
  } catch (error) {
    console.error("Generation error", error);
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
  }
}
