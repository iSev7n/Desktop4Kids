import { useEffect, useState } from "react";
import styles from "../Settings.module.css";
import utilStyles from "../../../../styles/utils.module.css";

export function NetworkSettings() {
    const [connectionType, setConnectionType] = useState<string | null>("unknown");
    const [effectiveType, setEffectiveType] = useState<string | null>("unknown");
    const [downlink, setDownlink] = useState<number | null>(null);
    const [rtt, setRtt] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const updateNetworkInfo = () => {
            const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
            if (connection) {
                setConnectionType(connection.type || connection.effectiveType || "unknown");
                setEffectiveType(connection.effectiveType || "unknown");
                setDownlink(connection.downlink || null);
                setRtt(connection.rtt || null);
            } else {
                setError("Network Information API is not supported by this browser.");
            }
        };

        updateNetworkInfo();

        const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
        if (connection) {
            connection.addEventListener('change', updateNetworkInfo);
            return () => {
                connection.removeEventListener('change', updateNetworkInfo);
            };
        } else {
            setError("Network Information API is not supported by this browser.");
        }
    }, []);

    return (
        <div className={styles.Option}>
            <p className={styles.Label}>Network Information</p>
            {error ? (
                <p className={utilStyles.TextError}>{error}</p>
            ) : (
                <div className={styles.OptionList}>
                    <div className={styles.Network}>
                        <p>Connection Type: {connectionType}</p>
                    </div>
                    <div className={styles.Network}>
                        <p>Effective Type: {effectiveType}</p>
                    </div>
                    <div className={styles.Network}>
                        <p>Downlink: {downlink !== null ? `${downlink} Mbps` : "N/A"}</p>
                    </div>
                    <div className={styles.Network}>
                        <p>RTT: {rtt !== null ? `${rtt} ms` : "N/A"}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
