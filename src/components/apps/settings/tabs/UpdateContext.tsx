import React, { createContext, useState, ReactNode, useContext, useCallback } from 'react';

interface UpdateHistoryEntry {
    version: string;
    date: string;
    description: string;
}

interface UpdateContextProps {
    updateHistory: UpdateHistoryEntry[];
    checkForUpdates: () => Promise<boolean>;
    lastChecked: string | null;
}

const UpdateContext = createContext<UpdateContextProps | undefined>(undefined);

export const UpdateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [updateHistory, setUpdateHistory] = useState<UpdateHistoryEntry[]>([
        { version: '1.0.0', date: '2024-07-10', description: 'Initial release' },
        { version: '1.1.0', date: '2024-07-20', description: 'Bug fixes and performance improvements' },
    ]);
    const [lastChecked, setLastChecked] = useState<string | null>(null);

    const checkForUpdates = useCallback(async () => {
        setLastChecked(new Date().toLocaleString());

        // Simulate an update check
        //const latestVersion = '1.2.0';
        //const latestDescription = 'New features added';
        //const today = new Date().toLocaleDateString();
        //const alreadyExists = updateHistory.some(
        //    (entry) => entry.version === latestVersion && entry.date === today
        //);

        //if (!alreadyExists) {
        //    setUpdateHistory((prevHistory) => [
        //        ...prevHistory,
        //        { version: latestVersion, date: today, description: latestDescription }
        //    ]);
        //    return true; // New update found
       // }
        
       return false; // No new update
    }, [updateHistory]);

    return (
        <UpdateContext.Provider value={{ updateHistory, checkForUpdates, lastChecked }}>
            {children}
        </UpdateContext.Provider>
    );
};

export const useUpdate = () => {
    const context = useContext(UpdateContext);
    if (!context) {
        throw new Error('useUpdate must be used within an UpdateProvider');
    }
    return context;
};
