// lib/gemini.ts
import axios from 'axios';

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error('❌ Gemini API Key is missing in .env');
}

export async function askGemini(prompt: string): Promise<string> {
  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return res.data?.candidates?.[0]?.content?.parts?.[0]?.text || '⚠️ No output';
  } catch (err: any) {
    console.error('Gemini API error (full):', err.response?.data || err.message);
    return '❌ Failed to connect to Gemini API.';
  }
}
