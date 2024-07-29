import { useState } from "react";
import { WebView } from "../../_utils/web-view/WebView";
import { Vector2 } from "../../../../features/math/vector2"; // Adjust this path based on your actual project structure
import styles from "../Games.module.css"; // Use the Games.module.css for general styling
import WebViewGamesStyles from "./game-category-css/WebViewGames.module.css"; // Use a separate CSS module for RPGGames specific styling

const rpgGames = [
  {
    name: "Onslaught Arena",
    image: "/assets/game-imgs/RPG/game-1-image.png",
    description: "Fight off the horde with medieval weapons and powerups!",
    url: "http://arcade.lostdecadegames.com/onslaught-arena/",
  },
  {
    name: "Dungeon Warrior",
    image: "/assets/game-imgs/RPG/game-2-image.png",
    description: "A First Person Endless Slasher.",
    url: "https://html-classic.itch.zone/html/3148062/index.html",
  },
  {
    name: "Hero Bounce",
    image: "/assets/game-imgs/RPG/rpg-game3.png",
    description: "Slash your way through.",
    url: "https://www.Desktop4kids.com/Games/Hero-Bounce-Web/index.html",
  },
  {
    name: "Bounce Back",
    image: "/assets/game-imgs/RPG/rpg-game4.png",
    description: "Slash your way through.",
    url: "https://www.Desktop4kids.com/Games/bounceback/index.html",
  },
  {
    name: "Boucne Back in Space",
    image: "/assets/game-imgs/RPG/rpg-game5.png",
    description: "Save the princess.",
    url: "https://www.Desktop4kids.com/Games/bounceback-2/index.html",
  },
];

function RPGGames() {
  const [webViewUrl, setWebViewUrl] = useState<string | null>(null);

  const openWebView = (url: string) => {
    setWebViewUrl(url);
  };

  return (
    <div className={`${styles.GamesContainer} ${WebViewGamesStyles.RPGGames}`}>
      {webViewUrl ? (
        <div className={WebViewGamesStyles.WebViewContainer}>
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
