// AdventureGames.tsx
import { CategoryGames } from "./CategoryGames";

const adventureGames = [
  { name: "Adventure Game1", image: "/assets/game-imgs/adventure-game1.png", description: "Description for Adventure Game1" },
  { name: "Adventure Game2", image: "/assets/game-imgs/adventure-game2.png", description: "Description for Adventure Game2" },
  { name: "Adventure Game3", image: "/assets/game-imgs/adventure-game3.png", description: "Description for Adventure Game3" }
];

export function AdventureGames() {
  return <CategoryGames games={adventureGames} />;
}
