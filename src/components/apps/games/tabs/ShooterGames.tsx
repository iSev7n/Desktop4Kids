// ShooterGames.tsx
import { CategoryGames } from "./CategoryGames";

const shooterGames = [
  { name: "Game1", image: "/assets/game-imgs/shooter-game1.png", description: "Description for Shooter Game1" },
  { name: "Game2", image: "/assets/game-imgs/shooter-game2.png", description: "Description for Shooter Game2" },
  { name: "Game3", image: "/assets/game-imgs/shooter-game3.png", description: "Description for Shooter Game3" }
];

export function ShooterGames() {
  return <CategoryGames games={shooterGames} />;
}