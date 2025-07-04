// lib/pollinations.ts
export async function askPollinations(prompt: string): Promise<string> {
  const res = await fetch("https://text.pollinations.ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch from Pollinations AI");
  }

  const data = await res.json();
  return data.completion ?? "No response.";
}
