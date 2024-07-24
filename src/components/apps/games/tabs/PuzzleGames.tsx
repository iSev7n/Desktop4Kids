// PuzzleGames.tsx
import { CategoryGames } from "./CategoryGames";

const puzzleGames = [
  { name: "Puzzle Game1", image: "/assets/game-imgs/puzzle-game1.png", description: "Description for Puzzle Game1" },
  { name: "Puzzle Game2", image: "/assets/game-imgs/puzzle-game2.png", description: "Description for Puzzle Game2" },
  { name: "Puzzle Game3", image: "/assets/game-imgs/puzzle-game3.png", description: "Description for Puzzle Game3" }
];

export function PuzzleGames() {
  return <CategoryGames games={puzzleGames} />;
}
