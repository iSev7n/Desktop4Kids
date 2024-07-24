// RacingGames.tsx
import { CategoryGames } from "./CategoryGames";

const racingGames = [
  { name: "Racing Game1", image: "/assets/game-imgs/racing-game1.png", description: "Description for Racing Game1" },
  { name: "Racing Game2", image: "/assets/game-imgs/racing-game2.png", description: "Description for Racing Game2" },
  { name: "Racing Game3", image: "/assets/game-imgs/racing-game3.png", description: "Description for Racing Game3" }
];

export function RacingGames() {
  return <CategoryGames games={racingGames} />;
}
