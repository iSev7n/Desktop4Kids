// RPGGames.tsx
import { CategoryGames } from "./CategoryGames";

const rpgGames = [
  { name: "Game1", image: "/assets/game-imgs/rpg-game1.png", description: "Description for RPG Game1" },
  { name: "Game2", image: "/assets/game-imgs/rpg-game2.png", description: "Description for RPG Game2" },
  { name: "Game3", image: "/assets/game-imgs/rpg-game3.png", description: "Description for RPG Game3" }
];

export function RPGGames() {
  return <CategoryGames games={rpgGames} />;
}
