import { useState } from "react";
import { WebView } from "../../_utils/web-view/WebView";
import styles from "../Games.module.css";
import WebViewGamesStyles from "./game-category-css/WebViewGames.module.css";

const shooterGames = [
  { name: "Earth Attack", image: "/assets/game-imgs/shooter-game1.png", description: "Defend Earth!", url: "https://www.Desktop4kids.com/Games/earth_attack/game/index.html" },
  { name: "Space Shooter", image: "/assets/game-imgs/shooter-game2.png", description: "Shoot Aliens", url: "https://www.Desktop4kids.com/Games/space_shoot/game/index.html" },
  { name: "Duck Hunt", image: "/assets/game-imgs/shooter-game3.png", description: "Shoot the ducks", url: "https://www.Desktop4kids.com/Games/duck_shoot/game/index.html" }
];

function ShooterGames() {
  const [webViewUrl, setWebViewUrl] = useState<string | null>(null);

  const openWebView = (url: string) => {
    setWebViewUrl(url);
  };

  return (
    <div className={`${styles.GamesContainer} ${WebViewGamesStyles.ShooterGames}`}>
      {webViewUrl ? (
        <div className={WebViewGamesStyles.WebViewContainer}>
          <WebView source={webViewUrl} title="Shooter Game" />
        </div>
      ) : (
        <CategoryGames games={shooterGames} openWebView={openWebView} />
      )}
    </div>
  );
}

function CategoryGames({ games, openWebView }: { games: Array<{ name: string; image: string; description: string; url?: string }>, openWebView: (url: string) => void }) {
  return (
    <div className={styles.CategoryContent}>
      <h2>Shooter Games</h2>
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

export { ShooterGames };
