import { useState } from "react";
import { WebView } from "../../_utils/web-view/WebView";
import styles from "../Games.module.css";
import WebViewGamesStyles from "./game-category-css/WebViewGames.module.css";

const puzzleGames = [
  { name: "Color Maze Puzzle", image: "/assets/game-imgs/Puzzle/puzzle-game1.png", description: "Color in the maze", url: "https://www.Desktop4kids.com/Games/Slide-Maze-Web/index.html" },
  { name: "Rescue Dog Puzzle", image: "/assets/game-imgs/Puzzle/puzzle-game2.png", description: "Save the dog", url: "https://www.Desktop4kids.com/Games/Rescue-Dog-Web/index.html" },
  { name: "Block Numbers Puzzle", image: "/assets/game-imgs/Puzzle/puzzle-game3.png", description: "Solve the number blocks puzzle", url: "https://www.Desktop4kids.com/Games/Block-Puzzle-Web/index.html" },
  { name: "Swift Cats", image: "/assets/game-imgs/Puzzle/puzzle-game4.png", description: "Knock out the mice!", url: "https://www.Desktop4kids.com/Games/swift_cats/game/index.html" },
  { name: "Stack", image: "/assets/game-imgs/Puzzle/puzzle-game5.png", description: "Stack em till you cant", url: "https://www.desktop4kids.com/Games/stack/play/" },
  { name: "Captain Callisto", image: "/assets/game-imgs/Puzzle/puzzle-game6.png", description: "Space Puzzle", url: "https://www.Desktop4kids.com/Games/captaincallisto/index.html" },
  { name: "Connect 3", image: "/assets/game-imgs/Puzzle/puzzle-game7.png", description: "Match the colors of 3's or more", url: "https://www.Desktop4kids.com/Games/connect3/index.html" },
  { name: "Packa Bunchas", image: "/assets/game-imgs/Puzzle/puzzle-game8.png", description: "Tetris", url: "https://www.Desktop4kids.com/Games/packabunchas/index.html" },
  { name: "Roadblocks", image: "/assets/game-imgs/Puzzle/puzzle-game9.png", description: "Solve the roadblocks", url: "https://www.Desktop4kids.com/Games/roadblocks/index.html" },
  { name: "Human.exe", image: "/assets/game-imgs/Puzzle/puzzle-game10.png", description: "Get through the space maze", url: "https://www.Desktop4kids.com/Games/Humanexe/index.html" },
  { name: "2048", image: "/assets/game-imgs/Puzzle/puzzle-game11.png", description: "match the numbers", url: "https://www.Desktop4kids.com/Games/2048/index.html" },
  { name: "Black Hole Square", image: "/assets/game-imgs/Puzzle/puzzle-game12.png", description: "Solve the puzzles", url: "https://www.Desktop4kids.com/Games/blackholesquare/index.html" },
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
