// CategoryGames.tsx
import styles from "../Games.module.css";

interface CategoryGamesProps {
  games: { name: string; image: string; description: string; onClick?: () => void }[];
}

export function CategoryGames({ games }: CategoryGamesProps) {
  return (
    <div className={styles.CategoryContent}>
      <h2>Games</h2>
      <div className={styles.GameList}>
        {games.map((game, index) => (
          <div className={styles.GameItem} key={index} onClick={game.onClick}>
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
