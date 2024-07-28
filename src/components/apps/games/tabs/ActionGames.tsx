import { useState } from "react";
import { WebView } from "../../_utils/web-view/WebView";
import styles from "../Games.module.css";
import WebViewGamesStyles from "./game-category-css/WebViewGames.module.css";

const actionGames = [
  { name: "Battle Battle", image: "/assets/game-imgs/action-game1.png", description: "Description for Action Game1", url: "https://www.Desktop4kids.com/Games/game_battlebattle/game/index.html" },
  { name: "Indiara & The Skull Gold", image: "/assets/game-imgs/action-game2.png", description: "Description for Action Game2", url: "https://www.Desktop4kids.com/Games/indiara_and_the_skull_gold/game/index.html" },
  { name: "Ninja Jump Force", image: "/assets/game-imgs/action-game3.png", description: "Description for Action Game3", url: "https://www.Desktop4kids.com/Games/ninja-jump-force/game/index.html" }
];

function ActionGames() {
  const [webViewUrl, setWebViewUrl] = useState<string | null>(null);

  const openWebView = (url: string) => {
    setWebViewUrl(url);
  };

  return (
    <div className={`${styles.GamesContainer} ${WebViewGamesStyles.ActionGames}`}>
      {webViewUrl ? (
        <div className={WebViewGamesStyles.WebViewContainer}>
          <WebView source={webViewUrl} title="Action Game" />
        </div>
      ) : (
        <CategoryGames games={actionGames} openWebView={openWebView} />
      )}
    </div>
  );
}

function CategoryGames({ games, openWebView }: { games: Array<{ name: string; image: string; description: string; url?: string }>, openWebView: (url: string) => void }) {
  return (
    <div className={styles.CategoryContent}>
      <h2>Action Games</h2>
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

export { ActionGames };
