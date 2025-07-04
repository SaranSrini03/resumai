"use client";

import { useState } from "react";
import { ResumePreview } from "@/components/ResumePreview";

export default function AIPage() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  function cleanResponse(text: string) {
    // Remove everything before the first '---'
    const start = text.indexOf("---");
    const trimmedStart = start !== -1 ? text.slice(start) : text;

    // Remove trailing incomplete sentences
    const endTriggers = ["Would you like", "Let me know", "If you need"];
    const regex = new RegExp(`(${endTriggers.join("|")}).*`, "i");
    const trimmedEnd = trimmedStart.replace(regex, "").trim();

    return trimmedEnd;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_POLLINATIONS_API}/${encodeURIComponent(prompt)}`);

      if (!res.ok) throw new Error(`API returned status ${res.status}`);
      const rawText = await res.text();
      const cleaned = cleanResponse(rawText);
      setResponse(cleaned);
    } catch {
      setResponse("Error fetching from Pollinations AI.");
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left: Prompt input */}
      <div className="w-1/2 p-6 border-r space-y-4">
        <h1 className="text-2xl font-bold">Create Your Resume with AI</h1>
        <p className="text-sm text-gray-600">
          ✨ Tip: Be specific! Try something like: <br />
          <span className="italic text-gray-700">
            {"Create a resume for a frontend developer named [your name] with 2 years of experience in React, JavaScript, Tailwind, and Git."}
          </span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            className="w-full p-2 border rounded"
            placeholder="e.g. Generate resume for a frontend engineer"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
            disabled={loading}
          >
            {loading ? "Loading..." : "Generate Resume"}
          </button>
        </form>
      </div>

      {/* Right: Resume preview */}
      <div className="w-1/2 p-6 overflow-y-auto">
        <ResumePreview content={response} />
      </div>
    </div>
  );
}
