import { useState } from "react";
import { WebView } from "../../_utils/web-view/WebView";
import styles from "../Games.module.css";
import WebViewGamesStyles from "./game-category-css/WebViewGames.module.css";

const educationalGames = [
  { name: "Letters Popping", image: "/assets/game-imgs/educational-game1.png", description: "Match the letters", url: "https://www.Desktop4kids.com/Games/Letters-popping-Web/index.html" },
  { name: "Letters Dash", image: "/assets/game-imgs/educational-game2.png", description: "Match the letters", url: "https://www.Desktop4kids.com/Games/Letters-Dash-Web/index.html" }
];

function EducationalGames() {
  const [webViewUrl, setWebViewUrl] = useState<string | null>(null);

  const openWebView = (url: string) => {
    setWebViewUrl(url);
  };

  return (
    <div className={`${styles.GamesContainer} ${WebViewGamesStyles.EducationalGames}`}>
      {webViewUrl ? (
        <div className={WebViewGamesStyles.WebViewContainer}>
          <WebView source={webViewUrl} title="Educational Game" />
        </div>
      ) : (
        <CategoryGames games={educationalGames} openWebView={openWebView} />
      )}
    </div>
  );
}

function CategoryGames({ games, openWebView }: { games: Array<{ name: string; image: string; description: string; url?: string }>, openWebView: (url: string) => void }) {
  return (
    <div className={styles.CategoryContent}>
      <h2>Educational Games</h2>
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

export { EducationalGames };
