import { useState } from "react";
import { WebView } from "../../_utils/web-view/WebView";
import styles from "../Games.module.css";
import WebViewGamesStyles from "./game-category-css/WebViewGames.module.css";

const arcadeGames = [
  { name: "Color Pump", image: "/assets/game-imgs/arcade-game1.png", description: "Description for Arcade Game1", url: "https://www.Desktop4kids.com/Games/color-pump/Game/index.html" },
  { name: "T-Rex Runner", image: "/assets/game-imgs/arcade-game2.png", description: "Description for Arcade Game2", url: "https://www.Desktop4kids.com/Games/trex_runner/game/version_colour/index.html" },
  { name: "T-Rex Runner 2", image: "/assets/game-imgs/arcade-game3.png", description: "Description for Arcade Game3", url: "https://www.desktop4kids.com/Games/trex_runner/game/version_black_and_white/index.html" },
  { name: "Flapcat Christmas", image: "/assets/game-imgs/arcade-game4.png", description: "Description for Arcade Game4", url: "https://www.Desktop4kids.com/Games/game_flapcat_christmas/game/index.html" },
  { name: "Flapcat Copter", image: "/assets/game-imgs/arcade-game5.png", description: "Description for Arcade Game5", url: "https://www.Desktop4kids.com/Games/game_flapcat_copters/game/index.html" },
  { name: "Flapcat Steampunk", image: "/assets/game-imgs/arcade-game6.png", description: "Description for Arcade Game6", url: "https://www.Desktop4kids.com/Games/game_flapcat_steampunk/game/index.html" },
  { name: "Christmas Furious", image: "/assets/game-imgs/arcade-game7.png", description: "Description for Arcade Game7", url: "https://www.Desktop4kids.com/Games/game_christmas_furious/game/index.html" },
  { name: "Santa Girl Runner", image: "/assets/game-imgs/arcade-game8.png", description: "Description for Arcade Game8", url: "https://www.Desktop4kids.com/Games/santa_girl_runner/game/index.html" },
  { name: "Pac Rush", image: "/assets/game-imgs/arcade-game9.png", description: "Description for Arcade Game9", url: "https://www.Desktop4kids.com/Games/Pac-Rush-Web/index.html" },
  { name: "Diamonds Digger", image: "/assets/game-imgs/arcade-game10.png", description: "Description for Arcade Game10", url: "https://www.Desktop4kids.com/Games/Diamonds-Digger-Web/index.html" },
  { name: "Flapcat Space", image: "/assets/game-imgs/arcade-game11.png", description: "Description for Arcade Game11", url: "https://www.Desktop4kids.com/Games/game_flapcat_space/game/index.html" },
];

function ArcadeGames() {
  const [webViewUrl, setWebViewUrl] = useState<string | null>(null);

  const openWebView = (url: string) => {
    setWebViewUrl(url);
  };

  return (
    <div className={`${styles.GamesContainer} ${WebViewGamesStyles.ArcadeGames}`}>
      {webViewUrl ? (
        <div className={WebViewGamesStyles.WebViewContainer}>
          <WebView source={webViewUrl} title="Arcade Game" />
        </div>
      ) : (
        <CategoryGames games={arcadeGames} openWebView={openWebView} />
      )}
    </div>
  );
}

function CategoryGames({ games, openWebView }: { games: Array<{ name: string; image: string; description: string; url?: string }>, openWebView: (url: string) => void }) {
  return (
    <div className={styles.CategoryContent}>
      <h2>Arcade Games</h2>
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

export { ArcadeGames };
