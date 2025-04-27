import { Character } from "@/types/characters";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface CharacterCardProps {
  character: Character;
  isSelected: boolean;
  onSelect: (character: Character) => void;
}

const CharacterCard = ({
  character,
  isSelected,
  onSelect,
}: CharacterCardProps) => {
  console.log(character.imageUrl);
  return (
    <Card
      className={cn(
        "relative cursor-pointer transition-all duration-300 transform hover:scale-105",
        "bg-gradient-to-b from-gray-900/50 to-gray-900/80 backdrop-blur-sm",
        "border border-purple-500/20 hover:border-purple-500/50",
        "p-6 group",
        isSelected && "ring-2 ring-purple-500 shadow-lg shadow-purple-500/20"
      )}
      onClick={() => onSelect(character)}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-center gap-4 mb-4">
        <Avatar className="w-16 h-16 rounded-full border-2 border-purple-500/50">
          <AvatarImage src={character.imageUrl} alt={character.name} />
          <AvatarFallback>{character.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-2xl font-bold text-white">{character.name}</h3>
          <p className="text-purple-200 font-semibold">{character.type}</p>
        </div>
      </div>

      <p className="text-gray-300">{character.description}</p>
    </Card>
  );
};

export default CharacterCard;
