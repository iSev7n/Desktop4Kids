import { useEffect, useState, useRef, MouseEventHandler } from "react";
import { VirtualFile } from "../../../../features/virtual-drive/file";
import { VirtualFolder } from "../../../../features/virtual-drive/folder/virtualFolder";
import { Vector2 } from "../../../../features/math/vector2";
import styles from "./DirectoryList.module.css";
import { ImagePreview } from "./ImagePreview";
import { Interactable } from "../../../_utils/interactable/Interactable";

export interface OnSelectionChangeParams {
    files?: string[];
    folders?: string[];
    directory?: VirtualFolder;
}

export type FileEventHandler = (event: Event, file: VirtualFile) => void;
export type FolderEventHandler = (event: Event, folder: VirtualFolder) => void;

interface DirectoryListProps {
    directory: VirtualFolder;
    showHidden?: boolean;
    folderClassName?: string;
    fileClassName?: string;
    className?: string;
    onContextMenuFile?: FileEventHandler;
    onContextMenuFolder?: FolderEventHandler;
    onOpenFile?: FileEventHandler;
    onOpenFolder?: FolderEventHandler;
    allowMultiSelect?: boolean;
    onSelectionChange?: (params: OnSelectionChangeParams) => void;
    [key: string]: unknown;
}

export function DirectoryList({
    directory,
    showHidden = false,
    folderClassName,
    fileClassName,
    className,
    onContextMenuFile,
    onContextMenuFolder,
    onOpenFile,
    onOpenFolder,
    allowMultiSelect = true,
    onSelectionChange,
    ...props
}: DirectoryListProps): React.ReactElement | null {
    const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
    const [stateUpdate, setStateUpdate] = useState(false);

    const ref = useRef(null);
    const [rectSelectStart, setRectSelectStart] = useState<Vector2 | null>(null);
    const [rectSelectEnd, setRectSelectEnd] = useState<Vector2 | null>(null);

    const [newFolderNames, setNewFolderNames] = useState<{ id: string, name: string }[]>([]);
    const [newFileNames, setNewFileNames] = useState<{ id: string, name: string }[]>([]);

    useEffect(() => {
        onSelectionChange?.({ files: selectedFiles, folders: selectedFolders, directory });
    }, [directory, onSelectionChange, selectedFiles, selectedFolders]);

    useEffect(() => {
        clearSelection();
    }, [directory]);

    useEffect(() => {
        const onMoveRectSelect = (event: MouseEvent) => {
            if (rectSelectStart == null)
                return;

            event.preventDefault();
            setRectSelectEnd({ x: event.clientX, y: event.clientY } as Vector2);
        };
        const onStopRectSelect = (event: MouseEvent) => {
            if (rectSelectStart == null || rectSelectEnd == null) {
                setRectSelectStart(null);
                setRectSelectEnd(null);
                return;
            }

            event.preventDefault();
            setRectSelectStart(null);
            setRectSelectEnd(null);
        };

        document.addEventListener("mousemove", onMoveRectSelect);
        document.addEventListener("mouseup", onStopRectSelect);

        return () => {
            document.removeEventListener("mousemove", onMoveRectSelect);
            document.removeEventListener("mouseup", onStopRectSelect);
        };
    });

    useEffect(() => {
        if (stateUpdate) {
            directory.confirmChanges();
            setStateUpdate(false);
        }
    }, [stateUpdate, directory]);

    if (!directory) return null;

    const clearSelection = () => {
        setSelectedFolders([]);
        setSelectedFiles([]);
    };

    const selectFolder = (folder: VirtualFolder, exclusive = false) => {
        if (!allowMultiSelect)
            exclusive = true;
        setSelectedFolders(exclusive ? [folder.id] : [...selectedFolders, folder.id]);
        if (exclusive)
            setSelectedFiles([]);
    };

    const selectFile = (file: VirtualFile, exclusive = false) => {
        if (!allowMultiSelect)
            exclusive = true;
        setSelectedFiles(exclusive ? [file.id] : [...selectedFiles, file.id]);
        if (exclusive)
            setSelectedFolders([]);
    };

    const saveFile = (fileId: string) => {
        const fileEntry = newFileNames.find(f => f.id === fileId);
        if (fileEntry && fileEntry.name !== "") {
            const file = directory.getFiles(showHidden).find(f => f.id === fileId);
            if (file) {
                const [name, extension = "txt"] = fileEntry.name.split(".");
                file.name = name;
                file.extension = extension;
                file.isNew = false;
                file.isRename = false;
                file.confirmChanges();
                setStateUpdate(state => !state);  // Force re-render
            }
            setNewFileNames(newFileNames.filter(f => f.id !== fileId));
            directory.confirmChanges();
        }
    };

    const saveFolder = (folderId: string) => {
        const folderEntry = newFolderNames.find(f => f.id === folderId);
        if (folderEntry && folderEntry.name !== "") {
            const folder = directory.getSubFolders(showHidden).find(f => f.id === folderId);
            if (folder) {
                folder.name = folderEntry.name;
                folder.isNew = false;
                folder.isRename = false;
                folder.confirmChanges();
                setStateUpdate(state => !state);  // Force re-render
            }
            setNewFolderNames(newFolderNames.filter(f => f.id !== folderId));
            directory.confirmChanges();
        }
    };

    const deleteFile = (file: VirtualFile) => {
        directory.remove(file);
        setStateUpdate(state => !state);  // Force re-render
    };

    const deleteFolder = (folder: VirtualFolder) => {
        directory.remove(folder);
        setStateUpdate(state => !state);  // Force re-render
    };

    const onStartRectSelect = (event: MouseEvent) => {
        setRectSelectStart({ x: event.clientX, y: event.clientY } as Vector2);
    };

    const getRectSelectStyle = () => {
        let x: number, y: number, width: number, height: number = 0;

        if (ref.current == null || rectSelectStart == null || rectSelectEnd == null)
            return { top: 0, left: 0, width: 0, height: 0 };

        const containerRect = (ref.current as HTMLElement).getBoundingClientRect();

        if (rectSelectStart.x < rectSelectEnd.x) {
            x = rectSelectStart.x;
            width = rectSelectEnd.x - rectSelectStart.x;
        } else {
            x = rectSelectEnd.x;
            width = rectSelectStart.x - rectSelectEnd.x;
        }
        if (rectSelectStart.y < rectSelectEnd.y) {
            y = rectSelectStart.y;
            height = rectSelectEnd.y - rectSelectStart.y;
        } else {
            y = rectSelectEnd.y;
            height = rectSelectStart.y - rectSelectEnd.y;
        }

        if (containerRect) {
            x -= containerRect.x;
            y -= containerRect.y;
        }

        return { top: y, left: x, width, height };
    };

    const classNames = [styles.DirectoryList];
    const folderClassNames = [styles.FolderButton];
    const fileClassNames = [styles.FileButton];

    if (className)
        classNames.push(className);
    if (folderClassName)
        folderClassNames.push(folderClassName);
    if (fileClassName)
        fileClassNames.push(fileClassName);

    return (
        <div
            ref={ref}
            className={classNames.join(" ")}
            onClick={clearSelection}
            onMouseDown={onStartRectSelect as unknown as MouseEventHandler}
            {...props}
        >
            {rectSelectStart != null && rectSelectEnd != null && (
                <div className={styles.SelectionRect} style={getRectSelectStyle()} />
            )}
            {directory.getSubFolders(showHidden)?.map((folder) => {
                const folderEntry = newFolderNames.find(f => f.id === folder.id);
                const folderName = folderEntry ? folderEntry.name : folder.name;

                return (
                    <Interactable
                        key={folder.id}
                        tabIndex={0}
                        className={folderClassNames.join(" ")}
                        data-selected={selectedFolders.includes(folder.id)}
                        onContextMenu={(event: MouseEvent) => onContextMenuFolder?.(event, folder)}
                        onClick={(event: MouseEvent) => selectFolder(folder, !event.ctrlKey)}
                        onDoubleClick={(event: MouseEvent) => onOpenFolder?.(event, folder)}
                    >
                        <div className={styles.FolderIcon}>
                            <ImagePreview source={folder.getIconUrl()} onError={() => folder.setIconUrl(null)} />
                        </div>
                        {(folder.isNew || folder.isRename) ? (
                            <input
                                type="text"
                                className={styles.Input}
                                value={folderName}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    setNewFolderNames((prev) =>
                                        prev.map(f => f.id === folder.id ? { ...f, name: newValue } : f)
                                    );
                                    if (!folderEntry) {
                                        setNewFolderNames((prev) => [...prev, { id: folder.id, name: newValue }]);
                                    }
                                }}
                                autoFocus
                                onBlur={() => saveFolder(folder.id)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") saveFolder(folder.id);
                                }}
                            />
                        ) : (
                            <p>{folder.name}</p>
                        )}
                    </Interactable>
                );
            })}
            {directory.getFiles(showHidden)?.map((file) => {
                const fileEntry = newFileNames.find(f => f.id === file.id);
                const fileName = fileEntry ? fileEntry.name : file.name;

                return (
                    <Interactable
                        key={file.id}
                        tabIndex={0}
                        className={fileClassNames.join(" ")}
                        data-selected={selectedFiles.includes(file.id)}
                        onContextMenu={(event: MouseEvent) => onContextMenuFile?.(event, file)}
                        onClick={(event: MouseEvent) => selectFile(file, !event.ctrlKey)}
                        onDoubleClick={(event: MouseEvent) => onOpenFile?.(event, file)}
                    >
                        <div className={styles.FileIcon}>
                            <ImagePreview source={file.getIconUrl()} onError={() => file.setIconUrl(null)} />
                        </div>
                        {(file.isNew || file.isRename) ? (
                            <input
                                type="text"
                                className={styles.Input}
                                value={fileName}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    setNewFileNames((prev) =>
                                        prev.map(f => f.id === file.id ? { ...f, name: newValue } : f)
                                    );
                                    if (!fileEntry) {
                                        setNewFileNames((prev) => [...prev, { id: file.id, name: newValue }]);
                                    }
                                }}
                                autoFocus
                                onBlur={() => saveFile(file.id)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") saveFile(file.id);
                                }}
                            />
                        ) : (
                            <p>{file.name}</p>
                        )}
                    </Interactable>
                );
            })}
        </div>
    );
}
