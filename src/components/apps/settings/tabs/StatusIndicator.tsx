import React from 'react';
import styles from './StatusIndicator.module.css';

interface StatusIndicatorProps {
    status: 'idle' | 'checking' | 'updated' | 'error';
}

const statusMessages = {
    idle: 'Your system is up to date.',
    checking: 'Checking for updates...',
    updated: 'Currently running the latest version.',
    error: 'Error checking for updates'
};

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
    return (
        <div className={styles.StatusIndicator}>
            {statusMessages[status]}
        </div>
    );
};
