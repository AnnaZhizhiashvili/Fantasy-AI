"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { characters } from "@/types/characters";
import { ArrowLeft, User } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function CharacterChat() {
  const params = useParams();
  const router = useRouter();
  const characterId = params.characterId as string;
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const character = characters.find((c) => c.id === characterId);

  useEffect(() => {
    // Add initial greeting message from character
    if (character) {
      const greeting = `*${character.name} appears before you*\n\nGreetings, traveler! I am ${character.name}. ${character.description} How may I assist you on your journey today?`;
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
      // Send to Gemini API with character context
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

  const handleBack = () => {
    router.push("/");
  };

  if (!character)
    return <div className="p-8 text-center">Character not found</div>;

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white p-4 flex flex-col">
      <header className="mb-4 flex items-center justify-between">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span>Back</span>
        </button>

        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
            Conversation with {character.name}
          </h1>
          <p className="text-gray-400">{character.name}</p>
        </div>

        <div className="w-20"></div>
      </header>

      <div className="flex-grow overflow-auto mb-4 p-4 rounded-lg bg-[#252A37]">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-4 flex items-start ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role !== "user" && (
              <Avatar className="h-10 w-10 mr-3 flex-shrink-0">
                <AvatarImage
                  src={character.imageUrl}
                  alt={character.name}
                  className="object-cover object-top"
                />
                <AvatarFallback>{character.name[0]}</AvatarFallback>
              </Avatar>
            )}

            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.role === "user"
                  ? "bg-blue-800 text-white"
                  : "bg-[#4B2E83] text-white"
              }`}
            >
              <div className="font-bold mb-1">
                {msg.role === "user" ? "You" : character.name}
              </div>
              <div className="whitespace-pre-wrap">{msg.content}</div>
            </div>

            {msg.role === "user" && (
              <Avatar className="h-10 w-10 ml-3 flex-shrink-0">
                <AvatarFallback className="bg-blue-700">
                  <User className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-start">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage
                src={`/avatars/${character.id}.png`}
                alt={character.name}
                className="object-cover object-top"
              />
              <AvatarFallback>{character.name[0]}</AvatarFallback>
            </Avatar>
            <div className="text-gray-400">
              *{character.name} is thinking...*
            </div>
          </div>
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
