import { useState } from "react";
import { WebView } from "../../_utils/web-view/WebView";
import styles from "../Games.module.css";
import WebViewGamesStyles from "./game-category-css/WebViewGames.module.css";

const casualGames = [
  { name: "Connect Image", image: "/assets/game-imgs/Casual/casual-game1.png", description: "Description for Casual Game1", url: "https://www.Desktop4kids.com/Games/Connect-Image-Web/index.html" },
  { name: "Find The Difference", image: "/assets/game-imgs/Casual/casual-game2.png", description: "Description for Casual Game2", url: "https://www.Desktop4kids.com/Games/Find-Difference-Web/index.html" },
  { name: "Hungry Froggy", image: "/assets/game-imgs/Casual/casual-game3.png", description: "Description for Casual Game3", url: "https://www.Desktop4kids.com/Games/Hungry-Frog-Web/index.html" }
];

function CasualGames() {
  const [webViewUrl, setWebViewUrl] = useState<string | null>(null);

  const openWebView = (url: string) => {
    setWebViewUrl(url);
  };

  return (
    <div className={`${styles.GamesContainer} ${WebViewGamesStyles.CasualGames}`}>
      {webViewUrl ? (
        <div className={WebViewGamesStyles.WebViewContainer}>
          <WebView source={webViewUrl} title="Casual Game" />
        </div>
      ) : (
        <CategoryGames games={casualGames} openWebView={openWebView} />
      )}
    </div>
  );
}

function CategoryGames({ games, openWebView }: { games: Array<{ name: string; image: string; description: string; url?: string }>, openWebView: (url: string) => void }) {
  return (
    <div className={styles.CategoryContent}>
      <h2>Casual Games</h2>
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

export { CasualGames };
