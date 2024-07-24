import styles from "../Games.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDragon, faSkull, faPuzzlePiece, faHiking, faFistRaised, faGamepad, faCar, faBasketballBall, faUsers, faCubes, faGraduationCap, faHeart } from "@fortawesome/free-solid-svg-icons";

interface HomeGamesProps {
  changeTab: (index: number) => void;
}

export function HomeGames({ changeTab }: HomeGamesProps) {
  return (
    <div className={styles.HomeContent}>
      <center><img src="/assets/GameCenter.png" alt="Game Center" className={styles.BannerImage} /></center>
      <h2 className={styles.WelcomeText}>Welcome to the Games Section</h2>
      <div className={styles.GameList}>
        <div className={styles.GameItem} onClick={() => changeTab(1)}>
          <img src="/assets/game-imgs/rpg-game-image.png" alt="RPG Game" className={styles.GameImage} />
          <div className={styles.GameDetails}>
            <FontAwesomeIcon icon={faDragon} className={styles.GameIcon} />
            <h3>RPG Games</h3>
            <p>Explore exciting role-playing games where you can become a hero.</p>
          </div>
        </div>
        <div className={styles.GameItem} onClick={() => changeTab(2)}>
          <img src="/assets/game-imgs/fps-game-image.png" alt="Shooter Game" className={styles.GameImage} />
          <div className={styles.GameDetails}>
            <FontAwesomeIcon icon={faSkull} className={styles.GameIcon} />
            <h3>Shooter Games</h3>
            <p>Experience fast-paced shooter games.</p>
          </div>
        </div>
        <div className={styles.GameItem} onClick={() => changeTab(3)}>
          <img src="/assets/game-imgs/puzzle-game-image.png" alt="Puzzle Game" className={styles.GameImage} />
          <div className={styles.GameDetails}>
            <FontAwesomeIcon icon={faPuzzlePiece} className={styles.GameIcon} />
            <h3>Puzzle Games</h3>
            <p>Solve intriguing puzzles and challenge your mind.</p>
          </div>
        </div>
        <div className={styles.GameItem} onClick={() => changeTab(4)}>
          <img src="/assets/game-imgs/adventure-game-image.png" alt="Adventure Game" className={styles.GameImage} />
          <div className={styles.GameDetails}>
            <FontAwesomeIcon icon={faHiking} className={styles.GameIcon} />
            <h3>Adventure Games</h3>
            <p>Explore the world of adventure games.</p>
          </div>
        </div>
        <div className={styles.GameItem} onClick={() => changeTab(5)}>
          <img src="/assets/game-imgs/action-game-image.png" alt="Action Game" className={styles.GameImage} />
          <div className={styles.GameDetails}>
            <FontAwesomeIcon icon={faFistRaised} className={styles.GameIcon} />
            <h3>Action Games</h3>
            <p>Experience the thrill of action games.</p>
          </div>
        </div>
        <div className={styles.GameItem} onClick={() => changeTab(6)}>
          <img src="/assets/game-imgs/arcade-game-image.png" alt="Arcade Game" className={styles.GameImage} />
          <div className={styles.GameDetails}>
            <FontAwesomeIcon icon={faGamepad} className={styles.GameIcon} />
            <h3>Arcade Games</h3>
            <p>Enjoy classic arcade games.</p>
          </div>
        </div>
        <div className={styles.GameItem} onClick={() => changeTab(7)}>
          <img src="/assets/game-imgs/racing-game-image.png" alt="Racing Game" className={styles.GameImage} />
          <div className={styles.GameDetails}>
            <FontAwesomeIcon icon={faCar} className={styles.GameIcon} />
            <h3>Racing Games</h3>
            <p>Feel the speed with racing games.</p>
          </div>
        </div>
        <div className={styles.GameItem} onClick={() => changeTab(8)}>
          <img src="/assets/game-imgs/sports-game-image.png" alt="Sports Game" className={styles.GameImage} />
          <div className={styles.GameDetails}>
            <FontAwesomeIcon icon={faBasketballBall} className={styles.GameIcon} />
            <h3>Sports Games</h3>
            <p>Get active with sports games.</p>
          </div>
        </div>
        <div className={styles.GameItem} onClick={() => changeTab(9)}>
          <img src="/assets/game-imgs/casual-game-image.png" alt="Casual Game" className={styles.GameImage} />
          <div className={styles.GameDetails}>
            <FontAwesomeIcon icon={faGamepad} className={styles.GameIcon} />
            <h3>Casual Games</h3>
            <p>Relax with casual games.</p>
          </div>
        </div>
        <div className={styles.GameItem} onClick={() => changeTab(10)}>
          <img src="/assets/game-imgs/mmorpg-game-image.png" alt="MMORPG Game" className={styles.GameImage} />
          <div className={styles.GameDetails}>
            <FontAwesomeIcon icon={faUsers} className={styles.GameIcon} />
            <h3>MMORPG Games</h3>
            <p>Join the massive multiplayer online world.</p>
          </div>
        </div>
        <div className={styles.GameItem} onClick={() => changeTab(11)}>
          <img src="/assets/game-imgs/sandbox-game-image.png" alt="Sandbox Game" className={styles.GameImage} />
          <div className={styles.GameDetails}>
            <FontAwesomeIcon icon={faCubes} className={styles.GameIcon} />
            <h3>Sandbox Games</h3>
            <p>Create and explore in sandbox games.</p>
          </div>
        </div>
        <div className={styles.GameItem} onClick={() => changeTab(12)}>
          <img src="/assets/game-imgs/educational-game-image.png" alt="Educational Game" className={styles.GameImage} />
          <div className={styles.GameDetails}>
            <FontAwesomeIcon icon={faGraduationCap} className={styles.GameIcon} />
            <h3>Educational Games</h3>
            <p>Learn and have fun with educational games.</p>
          </div>
        </div>
        <div className={styles.GameItem} onClick={() => changeTab(13)}>
          <img src="/assets/game-imgs/cards-game-image.png" alt="Card Game" className={styles.GameImage} />
          <div className={styles.GameDetails}>
            <FontAwesomeIcon icon={faHeart} className={styles.GameIcon} />
            <h3>Card Games</h3>
            <p>Enjoy a variety of card games.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
