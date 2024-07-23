// AppsSettings.tsx
import { useEffect, useState } from "react";
import styles from "../Settings.module.css";
import { AppsManager } from "../../../../features/apps/appsManager";
import { useSettingsManager } from "../../../../hooks/settings/settingsManagerContext";
import { SettingsManager } from "../../../../features/settings/settingsManager";
import { AppOption } from "./AppOption";

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

    return (
        <div className={`${styles.Option} ${styles.OptionList}`}>
            <p className={styles.Label}>Apps</p>
            {AppsManager.APPS.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())).map((app) => (
                <AppOption key={app.id} app={app} pins={pins} setPins={setPins} />
            ))}
        </div>
    );
}
