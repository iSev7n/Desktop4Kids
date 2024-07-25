import React, { useState } from "react";
import styles from "./Library.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faHistory, faImage, faFeatherAlt, faBible, faAtom, faMoon, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { FictionBooks } from "./tabs/FictionBooks";
import { NonFictionBooks } from "./tabs/NonFictionBooks";
import { PictureBooks } from "./tabs/PictureBooks";
import { FairyTaleBooks } from "./tabs/FairyTaleBooks";
import { HistoryBooks } from "./tabs/HistoryBooks";
import { BibleBooks } from "./tabs/BibleBooks";
import { ScienceBooks } from "./tabs/ScienceBooks";
import { ShortStories } from "./tabs/ShortStories";
import { BedTimeStories } from "./tabs/BedTimeStories";

export function Library() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const changeTab = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className={styles.LibraryContainer}>
      <Tabs
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
        className={styles.Library}
        selectedTabClassName={styles.ActiveTab}
        selectedTabPanelClassName={styles.ActivePanel}
      >
        <TabList className={styles.Tabs}>
          <Tab className={styles.TabButton} tabIndex="0">
            <FontAwesomeIcon icon={faBook} />
            <p>Fiction</p>
          </Tab>
          <Tab className={styles.TabButton} tabIndex="0">
            <FontAwesomeIcon icon={faLightbulb} />
            <p>Non-Fiction</p>
          </Tab>
          <Tab className={styles.TabButton} tabIndex="0">
            <FontAwesomeIcon icon={faImage} />
            <p>Picture Book</p>
          </Tab>
          <Tab className={styles.TabButton} tabIndex="0">
            <FontAwesomeIcon icon={faFeatherAlt} />
            <p>Fairy Tale</p>
          </Tab>
          <Tab className={styles.TabButton} tabIndex="0">
            <FontAwesomeIcon icon={faHistory} />
            <p>History</p>
          </Tab>
          <Tab className={styles.TabButton} tabIndex="0">
            <FontAwesomeIcon icon={faBible} />
            <p>Bible</p>
          </Tab>
          <Tab className={styles.TabButton} tabIndex="0">
            <FontAwesomeIcon icon={faAtom} />
            <p>Science</p>
          </Tab>
          <Tab className={styles.TabButton} tabIndex="0">
            <FontAwesomeIcon icon={faMoon} />
            <p>Short Stories</p>
          </Tab>
          <Tab className={styles.TabButton} tabIndex="0">
            <FontAwesomeIcon icon={faMoon} />
            <p>Bed Time Stories</p>
          </Tab>
        </TabList>
        <TabPanel className={styles.TabPanel}>
          <FictionBooks />
        </TabPanel>
        <TabPanel className={styles.TabPanel}>
          <NonFictionBooks />
        </TabPanel>
        <TabPanel className={styles.TabPanel}>
          <PictureBooks />
        </TabPanel>
        <TabPanel className={styles.TabPanel}>
          <FairyTaleBooks />
        </TabPanel>
        <TabPanel className={styles.TabPanel}>
          <HistoryBooks />
        </TabPanel>
        <TabPanel className={styles.TabPanel}>
          <BibleBooks />
        </TabPanel>
        <TabPanel className={styles.TabPanel}>
          <ScienceBooks />
        </TabPanel>
        <TabPanel className={styles.TabPanel}>
          <ShortStories />
        </TabPanel>
        <TabPanel className={styles.TabPanel}>
          <BedTimeStories />
        </TabPanel>
      </Tabs>
    </div>
  );
}
