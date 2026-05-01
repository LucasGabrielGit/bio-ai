import { env } from "../lib/env";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const gemini = env.GEMINI_API_KEY ? new GoogleGenerativeAI(env.GEMINI_API_KEY) : null;

export async function generateWithGemini(prompt: string): Promise<string> {
  if (!gemini) {
    throw new Error("GEMINI_API_KEY não configurada");
  }
  const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text || "";
}
