import { env } from "../lib/env";
import OpenAI from "openai";

export const openai =
    env.OPENAI_API_KEY && env.OPENAI_API_KEY.startsWith("sk-")
        ? new OpenAI({ apiKey: env.OPENAI_API_KEY })
        : null;