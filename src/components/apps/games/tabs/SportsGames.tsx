// SportsGames.tsx
import { CategoryGames } from "./CategoryGames";

const sportsGames = [
  { name: "Sports Game1", image: "/assets/game-imgs/sports-game1.png", description: "Description for Sports Game1" },
  { name: "Sports Game2", image: "/assets/game-imgs/sports-game2.png", description: "Description for Sports Game2" },
  { name: "Sports Game3", image: "/assets/game-imgs/sports-game3.png", description: "Description for Sports Game3" }
];

export function SportsGames() {
  return <CategoryGames games={sportsGames} />;
}
