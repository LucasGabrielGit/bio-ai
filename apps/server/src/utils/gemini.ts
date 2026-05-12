import { env } from "../lib/env";
import { GoogleGenerativeAI,  } from "@google/generative-ai";

export const gemini = env.GEMINI_API_KEY ? new GoogleGenerativeAI(env.GEMINI_API_KEY) : null;

export async function generateWithGemini(prompt: string, imagePart?: any): Promise<string> {
  if (!gemini) {
    throw new Error("GEMINI_API_KEY não configurada");
  }
  // console.log(await gemini.listModels());
  // gemini-1.5-flash é o modelo recomendado para alta performance e maior cota gratuita
  const model = gemini.getGenerativeModel({ model: "gemini-pro-latest" });
  
  const content = imagePart ? [prompt, imagePart] : [prompt];
  const result = await model.generateContent(content);
  const response = await result.response;
  const text = response.text();
  return text || "";
}

export function fileToGenerativePart(buffer: Buffer, mimeType: string) {
  return {
    inlineData: {
      data: buffer.toString("base64"),
      mimeType,
    },
  };
}
