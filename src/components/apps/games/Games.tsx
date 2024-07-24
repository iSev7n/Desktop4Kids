import React, { useState } from "react";
import styles from "./Games.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPuzzlePiece, faDragon, faSkull, faHiking, faFistRaised, faGamepad, faCar, faBasketballBall, faCubes, faUsers, faGraduationCap, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { HomeGames } from "./tabs/HomeGames";
import { RPGGames } from "./tabs/RPGGames";
import { ShooterGames } from "./tabs/ShooterGames";
import { PuzzleGames } from "./tabs/PuzzleGames";
import { AdventureGames } from "./tabs/AdventureGames";
import { ActionGames } from "./tabs/ActionGames";
import { ArcadeGames } from "./tabs/ArcadeGames";
import { RacingGames } from "./tabs/RacingGames";
import { SportsGames } from "./tabs/SportsGames";
import { CasualGames } from "./tabs/CasualGames";
import { MMORPGGames } from "./tabs/MMORPGGames";
import { SandboxGames } from "./tabs/SandboxGames";
import { EducationalGames } from "./tabs/EducationalGames";
import { CardGames } from "./tabs/CardGames";
import { WindowProps } from "../../windows/WindowView";

interface GamesProps extends WindowProps {
  tab?: number;
}

export function Games({ tab }: GamesProps) {
  const [selectedIndex, setSelectedIndex] = useState(tab ?? 0);

  const changeTab = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className={styles.GamesContainer}>
      <Tabs
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
        className={styles.Games}
        selectedTabClassName={styles.ActiveTab}
        selectedTabPanelClassName={styles.ActivePanel}
      >
        <TabList className={styles.Tabs}>
          <Tab className={styles.TabButton} tabIndex="0">
            <FontAwesomeIcon icon={faHome} />
            <p>Home</p>
          </Tab>
          <Tab className={styles.TabButton} tabIndex="0">
            <FontAwesomeIcon icon={faDragon} />
            <p>RPG</p>
          </Tab>
          <Tab className={styles.TabButton} tabIndex="0">
            <FontAwesomeIcon icon={faSkull} />
            <p>Shooter</p>
          </Tab>
          <Tab className={styles.TabButton} tabIndex="0">
            <FontAwesomeIcon icon={faPuzzlePiece} />
            <p>Puzzle</p>
          </Tab>
          <Tab className={styles.TabButton} tabIndex="0">
            <FontAwesomeIcon icon={faHiking} />
            <p>Adventure</p>
          </Tab>
          <Tab className={styles.TabButton} tabIndex="0">
            <FontAwesomeIcon icon={faFistRaised} />
            <p>Action</p>
          </Tab>
          <Tab className={styles.TabButton} tabIndex="0">
            <FontAwesomeIcon icon={faGamepad} />
            <p>Arcade</p>
          </Tab>
          <Tab className={styles.TabButton} tabIndex="0">
            <FontAwesomeIcon icon={faCar} />
            <p>Racing</p>
          </Tab>
          <Tab className={styles.TabButton} tabIndex="0">
            <FontAwesomeIcon icon={faBasketballBall} />
            <p>Sports</p>
          </Tab>
          <Tab className={styles.TabButton} tabIndex="0">
            <FontAwesomeIcon icon={faGamepad} />
            <p>Casual</p>
          </Tab>
          <Tab className={styles.TabButton} tabIndex="0">
            <FontAwesomeIcon icon={faUsers} />
            <p>MMORPG</p>
          </Tab>
          <Tab className={styles.TabButton} tabIndex="0">
            <FontAwesomeIcon icon={faCubes} />
            <p>Sandbox</p>
          </Tab>
          <Tab className={styles.TabButton} tabIndex="0">
            <FontAwesomeIcon icon={faGraduationCap} />
            <p>Educational</p>
          </Tab>
          <Tab className={styles.TabButton} tabIndex="0">
            <FontAwesomeIcon icon={faHeart} />
            <p>Cards</p>
          </Tab>
        </TabList>
        <TabPanel className={styles.TabPanel}>
          <HomeGames changeTab={changeTab} />
        </TabPanel>
        <TabPanel className={styles.TabPanel}>
          <RPGGames />
        </TabPanel>
        <TabPanel className={styles.TabPanel}>
          <ShooterGames />
        </TabPanel>
        <TabPanel className={styles.TabPanel}>
          <PuzzleGames />
        </TabPanel>
        <TabPanel className={styles.TabPanel}>
          <AdventureGames />
        </TabPanel>
        <TabPanel className={styles.TabPanel}>
          <ActionGames />
        </TabPanel>
        <TabPanel className={styles.TabPanel}>
          <ArcadeGames />
        </TabPanel>
        <TabPanel className={styles.TabPanel}>
          <RacingGames />
        </TabPanel>
        <TabPanel className={styles.TabPanel}>
          <SportsGames />
        </TabPanel>
        <TabPanel className={styles.TabPanel}>
          <CasualGames />
        </TabPanel>
        <TabPanel className={styles.TabPanel}>
          <MMORPGGames />
        </TabPanel>
        <TabPanel className={styles.TabPanel}>
          <SandboxGames />
        </TabPanel>
        <TabPanel className={styles.TabPanel}>
          <EducationalGames />
        </TabPanel>
        <TabPanel className={styles.TabPanel}>
          <CardGames />
        </TabPanel>
      </Tabs>
    </div>
  );
}
