// AppsSettings.tsx
import { useEffect, useState } from "react";
import styles from "../Settings.module.css";
import { AppsManager } from "../../../../features/apps/appsManager";
import { useSettingsManager } from "../../../../hooks/settings/settingsManagerContext";
import { SettingsManager } from "../../../../features/settings/settingsManager";
import { AppOption } from "./AppOption";
import { App } from "../../../../features/apps/app"; // Ensure this import is correct

// Type definitions
type AppCategory = 'Apps' | 'Utilities'| 'Games';
interface AppCategories {
  Apps: App[];
  Utilities: App[];
  Games: App[];
}

export function AppsSettings() {
    const settingsManager = useSettingsManager();
    const [pins, setPins] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPins = async () => {
            try {
                const settings = settingsManager?.getSettings(SettingsManager.VIRTUAL_PATHS.taskbar);
                const newPins = await settings?.get("pins");
                setPins((newPins ?? "").split(","));
            } catch (e) {
                setError("Failed to load pinned apps");
            } finally {
                setLoading(false);
            }
        };
        loadPins();
    }, [settingsManager]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className={styles.TextError}>{error}</p>;
    }

    const categories: AppCategories = {
        Utilities: [],
        Apps: [],
        Games: []
    };

    AppsManager.APPS.forEach((app) => {
        categories[app.category].push(app);  // Ensure category is typed correctly
    });

    return (
        <div className={`${styles.Option} ${styles.OptionList}`}>
            <p className={styles.Label}>Utilities</p>
            {categories.Utilities.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())).map((app) => (
                <AppOption key={app.id} app={app} pins={pins} setPins={setPins} />
            ))}
            <p className={styles.Label}>Apps</p>
            {categories.Apps.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())).map((app) => (
                <AppOption key={app.id} app={app} pins={pins} setPins={setPins} />
            ))}
            <p className={styles.Label}>Games</p>
            {categories.Games.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())).map((app) => (
                <AppOption key={app.id} app={app} pins={pins} setPins={setPins} />
            ))}
        </div>
    );
}
