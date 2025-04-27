"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { characters } from "@/types/characters";

export default function CharacterChat() {
  const { characterId } = useParams();
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const character = characters.find((c) => c.id === characterId);

  useEffect(() => {
    // Add initial greeting message from character
    if (character) {
      const greeting = `*${character.name} appears before you*\n\nGreetings, traveler! I am ${character.name}, ${character.title}. ${character.description} How may I assist you on your journey today?`;
      setMessages([{ role: "assistant", content: greeting }]);
    }
  }, [character]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    // Add user message
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/gemini/character-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          character: character,
        }),
      });

      const data = await response.json();

      if (data.result) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.result },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I apologize, but I seem to be having trouble communicating. Let's try again shortly.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!character)
    return <div className="p-8 text-center">Character not found</div>;

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white p-4 flex flex-col">
      <header className="mb-4 text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
          Conversation with {character.name}
        </h1>
        <p className="text-gray-400">{character.name}</p>
      </header>

      <div className="flex-grow overflow-auto mb-4 p-4 rounded-lg bg-[#252A37]">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-4 ${
              msg.role === "user" ? "text-blue-300" : "text-purple-300"
            }`}
          >
            <div className="font-bold mb-1">
              {msg.role === "user" ? "You" : character.name}:
            </div>
            <div className="whitespace-pre-wrap">{msg.content}</div>
          </div>
        ))}
        {loading && (
          <div className="text-gray-400">*{character.name} is thinking...*</div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-3 rounded-lg bg-[#252A37] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder={`Ask ${character.name} something...`}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
