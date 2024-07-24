import { useState } from "react";
import { WebView } from "../../_utils/web-view/WebView";
import { Vector2 } from "../../../../features/math/vector2"; // Adjust this path based on your actual project structure
import styles from "../Games.module.css"; // Use the Games.module.css for general styling
import rpgStyles from "./game-category-css/RPGGames.module.css"; // Use a separate CSS module for RPGGames specific styling

const rpgGames = [
  {
    name: "Onslaught Arena",
    image: "/assets/game-imgs/RPG/game-1-image.png",
    description: "Fight off the horde with medieval weapons and powerups!",
    url: "http://arcade.lostdecadegames.com/onslaught-arena/",
  },
  {
    name: "Game2",
    image: "/assets/game-imgs/rpg-game2.png",
    description: "Description for RPG Game2",
  },
  {
    name: "Game3",
    image: "/assets/game-imgs/rpg-game3.png",
    description: "Description for RPG Game3",
  },
];

function RPGGames() {
  const [webViewUrl, setWebViewUrl] = useState<string | null>(null);

  const openWebView = (url: string) => {
    setWebViewUrl(url);
  };

  return (
    <div className={`${styles.GamesContainer} ${rpgStyles.RPGGames}`}>
      {webViewUrl ? (
        <div className={rpgStyles.WebViewContainer}>
          <WebView source={webViewUrl} title="RPG Game" />
        </div>
      ) : (
        <CategoryGames games={rpgGames} openWebView={openWebView} />
      )}
    </div>
  );
}

function CategoryGames({ games, openWebView }: { games: Array<{ name: string; image: string; description: string; url?: string }>, openWebView: (url: string) => void }) {
  return (
    <div className={styles.CategoryContent}>
      <h2>RPG Games</h2>
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

export { RPGGames };
