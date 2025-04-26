import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// Initialize the Gemini API client

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  const { prompt } = await request.json();
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  return NextResponse.json({ result: response.text });
}
