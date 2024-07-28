import { useState } from "react";
import { WebView } from "../../_utils/web-view/WebView";
import styles from "../Games.module.css";
import WebViewGamesStyles from "./game-category-css/WebViewGames.module.css";

const adventureGames = [
  { name: "Princess GoldBlade", image: "/assets/game-imgs/adventure-game1.png", description: "Princess GoldBlade and the Dangerous Water!", url: "https://www.Desktop4kids.com/Games/princess_goldblade_and_the_dangerous_waters/game/index.html" },
  { name: "Snowball World", image: "/assets/game-imgs/adventure-game2.png", description: "Take snowball on an adventure!", url: "https://www.Desktop4kids.com/Games/snowball_world/game/index.html" },
  { name: "Snowball Christmas World", image: "/assets/game-imgs/adventure-game3.png", description: "Take snowball on a chrsitmas adventure!", url: "https://www.Desktop4kids.com/Games/snowball_christmas_world/game/index.html" }
];

function AdventureGames() {
  const [webViewUrl, setWebViewUrl] = useState<string | null>(null);

  const openWebView = (url: string) => {
    setWebViewUrl(url);
  };

  return (
    <div className={`${styles.GamesContainer} ${WebViewGamesStyles.AdventureGames}`}>
      {webViewUrl ? (
        <div className={WebViewGamesStyles.WebViewContainer}>
          <WebView source={webViewUrl} title="Adventure Game" />
        </div>
      ) : (
        <CategoryGames games={adventureGames} openWebView={openWebView} />
      )}
    </div>
  );
}

function CategoryGames({ games, openWebView }: { games: Array<{ name: string; image: string; description: string; url?: string }>, openWebView: (url: string) => void }) {
  return (
    <div className={styles.CategoryContent}>
      <h2>Adventure Games</h2>
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

export { AdventureGames };
