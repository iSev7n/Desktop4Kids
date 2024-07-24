// SandboxGames.tsx
import { CategoryGames } from "./CategoryGames";

const sandboxGames = [
  { name: "Sandbox Game1", image: "/assets/game-imgs/sandbox-game1.png", description: "Description for Sandbox Game1" },
  { name: "Sandbox Game2", image: "/assets/game-imgs/sandbox-game2.png", description: "Description for Sandbox Game2" },
  { name: "Sandbox Game3", image: "/assets/game-imgs/sandbox-game3.png", description: "Description for Sandbox Game3" }
];

export function SandboxGames() {
  return <CategoryGames games={sandboxGames} />;
}
