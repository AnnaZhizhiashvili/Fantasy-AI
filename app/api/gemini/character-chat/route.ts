import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  try {
    const { messages, character } = await request.json();

    // Create a system prompt that instructs Gemini to roleplay as the character
    const systemPrompt = `You are roleplaying as ${character.name}. ${character.description}
    
    Personality traits:
    - Stay in character at all times
    - Respond as ${character.name} would, with their unique personality
    - Use language, metaphors, and references that ${character.name} would use
    - Never break the fourth wall or acknowledge you are an AI
    
    The user is a traveler who has encountered you in your fantasy world. Respond to their message in a way that is true to your character.`;

    // Prepare the conversation history for Gemini
    const lastUserMessage = messages[messages.length - 1].content;

    // Generate the response
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        { role: "user", parts: [{ text: systemPrompt }] },
        {
          role: "model",
          parts: [
            {
              text: "I understand and will roleplay as this character faithfully.",
            },
          ],
        },
        { role: "user", parts: [{ text: lastUserMessage }] },
      ],
    });

    return NextResponse.json({ result: response.text });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
