import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { checkRateLimit } from "@/lib/rate-limit";
import { env } from "@/lib/env";
import { LIMITS } from "@/lib/constants";
import { countWords, jsonResponse } from "@/lib/utils";

const groq = createOpenAI({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey: env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = "You are a specialized grammar checker. Your ONLY job is to fix grammatical errors in the user's text.\n- Do NOT change the style, tone, or voice of the text.\n- Do NOT rewrite sentences unless grammatically necessary.\n- Do NOT add any conversational filler.\n- Output ONLY the corrected text.\nYou are strictly forbidden from using dashes or semicolons to separate phrases.";

export async function POST(req: Request) {
    const body = await req.json();
    const prompt = typeof body?.prompt === 'string' ? body.prompt : '';

    if (!prompt.trim()) {
        return jsonResponse({ message: "No text provided" }, 400);
    }

    if (countWords(prompt) > LIMITS.MAX_WORDS) {
        return jsonResponse({ message: "Too many words" }, 422);
    }

    if (prompt.length > LIMITS.MAX_CHARS) {
        return jsonResponse({ message: "Too many characters" }, 422);
    }

    const { success, reset } = await checkRateLimit(req);

    if (!success) {
        return jsonResponse({ message: "Too many requests", reset }, 429, { "Retry-After": String(reset) });
    }

    const result = streamText({
        model: groq("llama-3.3-70b-versatile"),
        system: SYSTEM_PROMPT,
        prompt,
        temperature: 0.1,
    });

    return result.toTextStreamResponse();
}
