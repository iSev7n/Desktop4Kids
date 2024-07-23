import React, { useEffect, useState } from 'react';
import { useUpdate } from './UpdateContext';
import styles from '../Settings.module.css';
import { StatusIndicator } from './StatusIndicator';
import { Button } from '../../../_utils/button/Button'; // Adjust the import path as necessary

export const SystemUpdates: React.FC = () => {
    const { updateHistory, checkForUpdates, lastChecked } = useUpdate();
    const [status, setStatus] = useState<'idle' | 'checking' | 'updated' | 'error'>('idle');
    const [updatesAvailable, setUpdatesAvailable] = useState<boolean>(false);

    const handleCheckForUpdates = async () => {
        try {
            setStatus('checking');
            const newUpdates = await checkForUpdates();
            setUpdatesAvailable(newUpdates);
            setStatus(newUpdates ? 'updated' : 'idle');
        } catch {
            setStatus('error');
        }
    };

    useEffect(() => {
        const checkUpdates = async () => {
            try {
                setStatus('checking');
                const newUpdates = await checkForUpdates();
                setUpdatesAvailable(newUpdates);
                setStatus(newUpdates ? 'updated' : 'idle');
            } catch {
                setStatus('error');
            }
        };

        checkUpdates(); // Initial check on mount

        const interval = setInterval(checkUpdates, 3600000); // Check every hour

        return () => clearInterval(interval);
    }, [checkForUpdates]);

    return (
        <div className={styles.Option}>
            <p className={styles.Label}>System Updates</p>
            <div className={styles.Option}>
                <p className={styles.Label}>Last Checked: {lastChecked ?? 'Never'}</p>
                <StatusIndicator status={status} />
                {updatesAvailable && <p className={styles.UpdatesAvailable}>Updates available!</p>}
                <Button className={styles.Button} onClick={handleCheckForUpdates}>
                    Check for Updates
                </Button>
            </div>
            <div className={styles.Option}>
                <p className={styles.Label}>Update History</p>
                <ul className={styles.OptionList}>
                    {updateHistory.map((entry, index) => (
                        <li key={index} className={styles.Option}>
                            <span>{entry.date}: {entry.version}</span>
                            <p>{entry.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
