import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { DISPATCH_SYSTEM_PROMPT } from "@/lib/site";

export const runtime = "nodejs";

const MAX_TURNS = 10;
const MAX_CHARS = 400;

type ChatTurn = { role: "user" | "assistant"; content: string };

function sanitizeHistory(raw: unknown): ChatTurn[] | null {
  if (!Array.isArray(raw) || raw.length === 0) return null;
  const turns: ChatTurn[] = [];
  for (const m of raw.slice(-MAX_TURNS)) {
    if (
      !m ||
      typeof m !== "object" ||
      (m.role !== "user" && m.role !== "assistant") ||
      typeof m.content !== "string" ||
      !m.content.trim()
    ) {
      return null;
    }
    turns.push({ role: m.role, content: m.content.slice(0, MAX_CHARS) });
  }
  // The Messages API requires the conversation to start with a user turn.
  while (turns.length && turns[0].role !== "user") turns.shift();
  if (!turns.length || turns[turns.length - 1].role !== "user") return null;
  return turns;
}

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "dispatcher offline" }, { status: 503 });
  }

  let messages: ChatTurn[] | null = null;
  try {
    const body = await req.json();
    messages = sanitizeHistory(body?.messages);
  } catch {
    messages = null;
  }
  if (!messages) {
    return NextResponse.json({ error: "bad transmission" }, { status: 400 });
  }

  const client = new Anthropic();
  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 300,
      system: DISPATCH_SYSTEM_PROMPT,
      messages,
    });
    const text = response.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join(" ")
      .trim()
      .slice(0, 600);
    if (!text) {
      return NextResponse.json({ error: "empty channel" }, { status: 502 });
    }
    return NextResponse.json({ reply: text });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return NextResponse.json({ error: "channel congested" }, { status: 429 });
    }
    if (error instanceof Anthropic.APIError) {
      return NextResponse.json({ error: "relay fault" }, { status: 502 });
    }
    return NextResponse.json({ error: "dispatcher offline" }, { status: 503 });
  }
}
