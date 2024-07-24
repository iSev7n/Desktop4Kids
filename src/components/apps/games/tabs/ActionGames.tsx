// ActionGames.tsx
import { CategoryGames } from "./CategoryGames";

const actionGames = [
  { name: "Action Game1", image: "/assets/game-imgs/action-game1.png", description: "Description for Action Game1" },
  { name: "Action Game2", image: "/assets/game-imgs/action-game2.png", description: "Description for Action Game2" },
  { name: "Action Game3", image: "/assets/game-imgs/action-game3.png", description: "Description for Action Game3" }
];

export function ActionGames() {
  return <CategoryGames games={actionGames} />;
}
