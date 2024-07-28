import { useState } from "react";
import { WebView } from "../../_utils/web-view/WebView";
import styles from "../Games.module.css";
import WebViewGamesStyles from "./game-category-css/WebViewGames.module.css";

const sportsGames = [
  { name: "Sports Game1", image: "/assets/game-imgs/sports-game1.png", description: "Description for Sports Game1", url: "URL_FOR_SPORTS_GAME1" },
  { name: "Sports Game2", image: "/assets/game-imgs/sports-game2.png", description: "Description for Sports Game2", url: "URL_FOR_SPORTS_GAME2" },
  { name: "Sports Game3", image: "/assets/game-imgs/sports-game3.png", description: "Description for Sports Game3", url: "URL_FOR_SPORTS_GAME3" }
];

function SportsGames() {
  const [webViewUrl, setWebViewUrl] = useState<string | null>(null);

  const openWebView = (url: string) => {
    setWebViewUrl(url);
  };

  return (
    <div className={`${styles.GamesContainer} ${WebViewGamesStyles.SportsGames}`}>
      {webViewUrl ? (
        <div className={WebViewGamesStyles.WebViewContainer}>
          <WebView source={webViewUrl} title="Sports Game" />
        </div>
      ) : (
        <CategoryGames games={sportsGames} openWebView={openWebView} />
      )}
    </div>
  );
}

function CategoryGames({ games, openWebView }: { games: Array<{ name: string; image: string; description: string; url?: string }>, openWebView: (url: string) => void }) {
  return (
    <div className={styles.CategoryContent}>
      <h2>Sports Games</h2>
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

export { SportsGames };
