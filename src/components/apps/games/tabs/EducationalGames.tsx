// EducationalGames.tsx
import { CategoryGames } from "./CategoryGames";

const educationalGames = [
  { name: "Educational Game1", image: "/assets/game-imgs/educational-game1.png", description: "Description for Educational Game1" },
  { name: "Educational Game2", image: "/assets/game-imgs/educational-game2.png", description: "Description for Educational Game2" },
  { name: "Educational Game3", image: "/assets/game-imgs/educational-game3.png", description: "Description for Educational Game3" }
];

export function EducationalGames() {
  return <CategoryGames games={educationalGames} />;
}
