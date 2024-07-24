// CasualGames.tsx
import { CategoryGames } from "./CategoryGames";

const casualGames = [
  { name: "Casual Game1", image: "/assets/game-imgs/casual-game1.png", description: "Description for Casual Game1" },
  { name: "Casual Game2", image: "/assets/game-imgs/casual-game2.png", description: "Description for Casual Game2" },
  { name: "Casual Game3", image: "/assets/game-imgs/casual-game3.png", description: "Description for Casual Game3" }
];

export function CasualGames() {
  return <CategoryGames games={casualGames} />;
}
