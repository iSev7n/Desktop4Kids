// CardGames.tsx
import { CategoryGames } from "./CategoryGames";

const cardGames = [
  { name: "Card Game1", image: "/assets/game-imgs/card-game1.png", description: "Description for Card Game1" },
  { name: "Card Game2", image: "/assets/game-imgs/card-game2.png", description: "Description for Card Game2" },
  { name: "Card Game3", image: "/assets/game-imgs/card-game3.png", description: "Description for Card Game3" }
];

export function CardGames() {
  return <CategoryGames games={cardGames} />;
}
