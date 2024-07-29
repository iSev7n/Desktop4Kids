import { useState } from "react";
import { WebView } from "../../_utils/web-view/WebView";
import styles from "../Games.module.css";
import WebViewGamesStyles from "./game-category-css/WebViewGames.module.css";

const mmorpgGames = [
  { name: "MMORPG Game1", image: "/assets/game-imgs/MMORPG/mmorpg-game1.png", description: "Description for MMORPG Game1", url: "URL_FOR_MMORPG_GAME1" },
  { name: "MMORPG Game2", image: "/assets/game-imgs/MMORPG/mmorpg-game2.png", description: "Description for MMORPG Game2", url: "URL_FOR_MMORPG_GAME2" },
  { name: "MMORPG Game3", image: "/assets/game-imgs/MMORPG/mmorpg-game3.png", description: "Description for MMORPG Game3", url: "URL_FOR_MMORPG_GAME3" }
];

function MMORPGGames() {
  const [webViewUrl, setWebViewUrl] = useState<string | null>(null);

  const openWebView = (url: string) => {
    setWebViewUrl(url);
  };

  return (
    <div className={`${styles.GamesContainer} ${WebViewGamesStyles.MMORPGGames}`}>
      {webViewUrl ? (
        <div className={WebViewGamesStyles.WebViewContainer}>
          <WebView source={webViewUrl} title="MMORPG Game" />
        </div>
      ) : (
        <CategoryGames games={mmorpgGames} openWebView={openWebView} />
      )}
    </div>
  );
}

function CategoryGames({ games, openWebView }: { games: Array<{ name: string; image: string; description: string; url?: string }>, openWebView: (url: string) => void }) {
  return (
    <div className={styles.CategoryContent}>
      <h2>MMORPG Games</h2>
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

export { MMORPGGames };
