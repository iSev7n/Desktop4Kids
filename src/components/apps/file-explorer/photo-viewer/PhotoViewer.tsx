/* eslint-disable @typescript-eslint/indent */
import { useEffect } from "react";

import styles from "./PhotoViewer.module.css";
import { VirtualFile } from "../../../../features/virtual-drive/file";
import { WindowProps } from "../../../windows/WindowView";
import { useWindowsManager } from "../../../../hooks/windows/windowsManagerContext";
import { APPS } from "../../../../config/apps.config";
import { IMAGE_FORMATS } from "../../../../config/apps/mediaViewer.config";


interface MediaViewerProps extends WindowProps {
    file?: VirtualFile;
}

export function PhotoViewer({ file, close, setTitle }: MediaViewerProps) {
    const windowsManager = useWindowsManager();

    useEffect(() => {
        if (file != null) setTitle?.(file.id);
    }, [file, setTitle]);

    // Handle when no file is provided
    if (file == null) {
        setTimeout(() => {
            windowsManager?.open(APPS.FILE_EXPLORER, { path: "~/Pictures" });
            close?.();
        }, 10);
        return null; // You can return null or any loading indicator here
    }

    // Check if the file extension is in IMAGE_FORMATS
    const isImage = file.extension != null && IMAGE_FORMATS.includes(file.extension.toLowerCase());
    const isVideo = file.extension === '.mp4'; // Adjust based on your video file detection logic

    // Render based on file type
    if (isImage) {
        if (file.source == null) return <p>File failed to load.</p>;
        return (
            <div className={styles.MediaViewer}>
                <img src={file.source} alt={file.id} draggable="false" />
            </div>
        );
    } else if (isVideo) {
        if (file.source == null) return <p>File failed to load.</p>;
        return (
            <div className={styles.MediaViewer}>
                <video controls>
                    <source src={file.source} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        );
    } else {
        return <p>Unsupported file format.</p>;
    }
}