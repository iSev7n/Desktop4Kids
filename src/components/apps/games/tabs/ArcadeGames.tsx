// ArcadeGames.tsx
import { CategoryGames } from "./CategoryGames";

const arcadeGames = [
  { name: "Arcade Game1", image: "/assets/game-imgs/arcade-game1.png", description: "Description for Arcade Game1" },
  { name: "Arcade Game2", image: "/assets/game-imgs/arcade-game2.png", description: "Description for Arcade Game2" },
  { name: "Arcade Game3", image: "/assets/game-imgs/arcade-game3.png", description: "Description for Arcade Game3" }
];

export function ArcadeGames() {
  return <CategoryGames games={arcadeGames} />;
}
