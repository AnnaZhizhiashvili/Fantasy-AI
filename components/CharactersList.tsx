"use client";

import { useState } from "react";
import { Character, characters } from "@/types/characters";
import CharacterCard from "@/components/CharacterCard";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";
import { useRouter } from "next/navigation";

const CharactersList = () => {
  const router = useRouter();

  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  const handleBeginJourney = () => {
    if (selectedCharacter) {
      router.push(`/chat/${selectedCharacter.id}`);
    }
  };
  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
  };

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
            Choose Your Character
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Select a magical companion for your journey into fantastical
            conversations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              isSelected={selectedCharacter?.id === character.id}
              onSelect={handleCharacterSelect}
            />
          ))}
        </div>

        {selectedCharacter && (
          <div className="text-center">
            <Button
              onClick={handleBeginJourney}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-6 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <Crown className="mr-2 h-5 w-5" />
              Begin Your Journey with {selectedCharacter.name}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharactersList;
