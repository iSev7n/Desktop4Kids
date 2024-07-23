// Settings.tsx
import styles from "./Settings.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube, faBrush, faDatabase, faInfoCircle, faNetworkWired, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { AppearanceSettings } from "./tabs/AppearanceSettings";
import { AboutSettings } from "./tabs/AboutSettings";
import { StorageTab } from "./tabs/StorageSettings";
import { AppsSettings } from "./tabs/AppsSettings";
import { NetworkSettings } from "./tabs/NetworkSettings";
import { UpdateProvider } from "./tabs/UpdateContext";
import { SystemUpdates } from "./tabs/SystemUpdates";
import { WindowProps } from "../../windows/WindowView";

interface SettingsProps extends WindowProps {
	tab?: number;
}

export function Settings({ tab }: SettingsProps) {
	return (
		<div className={styles.SettingsContainer}>
			<Tabs
				defaultIndex={tab ?? 0}
				className={styles.Settings}
				selectedTabClassName={styles.ActiveTab}
				selectedTabPanelClassName={styles.ActivePanel}
			>
				<TabList className={styles.Tabs}>
					<Tab className={styles.TabButton} tabIndex="0">
						<FontAwesomeIcon icon={faCube} />
						<p>Apps</p>
					</Tab>
					<Tab className={styles.TabButton} tabIndex="0">
						<FontAwesomeIcon icon={faBrush} />
						<p>Appearance</p>
					</Tab>
					<Tab className={styles.TabButton} tabIndex="0">
						<FontAwesomeIcon icon={faDatabase} />
						<p>Storage</p>
					</Tab>
					<Tab className={styles.TabButton} tabIndex="0">
						<FontAwesomeIcon icon={faNetworkWired} />
						<p>Network</p>
					</Tab>
					<Tab className={styles.TabButton} tabIndex="0">
						<FontAwesomeIcon icon={faSyncAlt} />
						<p>Updates</p>
					</Tab>
					<Tab className={styles.TabButton} tabIndex="0">
						<FontAwesomeIcon icon={faInfoCircle} />
						<p>About</p>
					</Tab>
				</TabList>
				<TabPanel className={styles.TabPanel}>
					<AppsSettings />
				</TabPanel>
				<TabPanel className={styles.TabPanel}>
					<AppearanceSettings />
				</TabPanel>
				<TabPanel className={styles.TabPanel}>
					<StorageTab />
				</TabPanel>
				<TabPanel className={styles.TabPanel}>
					<NetworkSettings />
				</TabPanel>
				<TabPanel className={styles.TabPanel}>
					<UpdateProvider>
						<SystemUpdates />
					</UpdateProvider>
				</TabPanel>
				<TabPanel className={styles.TabPanel}>
					<AboutSettings />
				</TabPanel>
			</Tabs>
		</div>
	);
}
