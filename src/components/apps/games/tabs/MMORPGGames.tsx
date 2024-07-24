// MMORPGGames.tsx
import { CategoryGames } from "./CategoryGames";

const mmorpgGames = [
  { name: "MMORPG Game1", image: "/assets/game-imgs/mmorpg-game1.png", description: "Description for MMORPG Game1" },
  { name: "MMORPG Game2", image: "/assets/game-imgs/mmorpg-game2.png", description: "Description for MMORPG Game2" },
  { name: "MMORPG Game3", image: "/assets/game-imgs/mmorpg-game3.png", description: "Description for MMORPG Game3" }
];

export function MMORPGGames() {
  return <CategoryGames games={mmorpgGames} />;
}
