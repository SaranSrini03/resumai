// app/api/pollinations/route.ts
import { askPollinations } from "@/lib/pollinations";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const reply = await askPollinations(prompt);
  return Response.json({ reply });
}
