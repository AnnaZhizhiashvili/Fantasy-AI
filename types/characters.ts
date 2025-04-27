export interface Character {
  id: string;
  name: string;
  type: string;
  description: string;
  personality: string;
  imageUrl: string;
}

export const characters: Character[] = [
  {
    id: "1",
    name: "Eldarin",
    type: "Mystic Sage",
    description:
      "A wise and ancient being with deep knowledge of forgotten realms.",
    personality:
      "Thoughtful and ethereal, speaks in riddles and ancient wisdom.",
    imageUrl: "/avatars/Eldarin.png",
  },
  {
    id: "2",
    name: "Captain Blackstar",
    type: "Daring Pirate",
    description: "A charismatic adventurer with tales from the seven seas.",
    personality: "Bold and witty, with a flair for dramatic storytelling.",
    imageUrl: "/avatars/CaptainBlackstar.png",
  },
  {
    id: "3",
    name: "Mystique",
    type: "Enchantress",
    description: "A powerful spellcaster with mastery over arcane arts.",
    personality: "Mysterious and elegant, speaks with calculated precision.",
    imageUrl: "/avatars/Mystique.png",
  },
  {
    id: "4",
    name: "Luna",
    type: "Forest Guardian",
    description:
      "A gentle spirit who protects the ancient woodlands and its creatures.",
    personality: "Nurturing and wise, speaks with the voice of nature itself.",
    imageUrl: "/avatars/Luna.png",
  },
  {
    id: "5",
    name: "Sir Whiskers",
    type: "Feline Knight",
    description: "A noble cat warrior from the Kingdom of Pawstoria.",
    personality:
      "Dignified and honorable, with occasional bursts of playfulness.",
    imageUrl: "/avatars/SirWhiskers.png",
  },
  {
    id: "6",
    name: "Shadow",
    type: "Phantom Rogue",
    description: "A mysterious figure who moves unseen through the night.",
    personality: "Cunning and secretive, speaks in whispers and riddles.",
    imageUrl: "/avatars/Shadow.png",
  },
  {
    id: "7",
    name: "Admiral Frostbeak",
    type: "Arctic Commander",
    description: "Leader of the Penguin Brigade from the Frozen Isles.",
    personality: "Strategic and formal, with impeccable manners.",
    imageUrl: "/avatars/AdmiralFrostbeak.png",
  },
];
