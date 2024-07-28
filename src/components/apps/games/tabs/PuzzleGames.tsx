import { useState } from "react";
import { WebView } from "../../_utils/web-view/WebView";
import styles from "../Games.module.css";
import WebViewGamesStyles from "./game-category-css/WebViewGames.module.css";

const puzzleGames = [
  { name: "Color Maze Puzzle", image: "/assets/game-imgs/puzzle-game1.png", description: "Color in the maze", url: "https://www.Desktop4kids.com/Games/Slide-Maze-Web/index.html" },
  { name: "Rescue Dog Puzzle", image: "/assets/game-imgs/puzzle-game2.png", description: "Save the dog", url: "https://www.Desktop4kids.com/Games/Rescue-Dog-Web/index.html" },
  { name: "Block Numbers Puzzle", image: "/assets/game-imgs/puzzle-game3.png", description: "Solve the number blocks puzzle", url: "https://www.Desktop4kids.com/Games/Block-Puzzle-Web/index.html" },
  { name: "Swift Cats", image: "/assets/game-imgs/puzzle-game4.png", description: "Knock out the mice!", url: "https://www.Desktop4kids.com/Games/swift_cats/game/index.html" },
];

function PuzzleGames() {
  const [webViewUrl, setWebViewUrl] = useState<string | null>(null);

  const openWebView = (url: string) => {
    setWebViewUrl(url);
  };

  return (
    <div className={`${styles.GamesContainer} ${WebViewGamesStyles.PuzzleGames}`}>
      {webViewUrl ? (
        <div className={WebViewGamesStyles.WebViewContainer}>
          <WebView source={webViewUrl} title="Puzzle Game" />
        </div>
      ) : (
        <CategoryGames games={puzzleGames} openWebView={openWebView} />
      )}
    </div>
  );
}

function CategoryGames({ games, openWebView }: { games: Array<{ name: string; image: string; description: string; url?: string }>, openWebView: (url: string) => void }) {
  return (
    <div className={styles.CategoryContent}>
      <h2>Puzzle Games</h2>
      <div className={styles.GameList}>
        {games.map((game, index) => (
          <div
            className={styles.GameItem}
            key={index}
            onClick={game.url ? () => openWebView(game.url!) : () => console.log(`${game.name} clicked`)}
          >
            <img src={game.image} alt={game.name} className={styles.GameImage} />
            <div className={styles.GameDetails}>
              <h3>{game.name}</h3>
              <p>{game.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { PuzzleGames };
