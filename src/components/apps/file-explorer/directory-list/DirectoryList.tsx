/* eslint-disable @typescript-eslint/indent */
import { MouseEventHandler, ReactElement, useEffect, useRef, useState } from "react";
import { VirtualFile } from "../../../../features/virtual-drive/file";
import { VirtualFolder } from "../../../../features/virtual-drive/folder/virtualFolder";
import { Interactable } from "../../../_utils/interactable/Interactable";
import styles from "./DirectoryList.module.css";
import { ImagePreview } from "./ImagePreview";
import { Vector2 } from "../../../../features/math/vector2";

export interface OnSelectionChangeParams {
    files?: string[];
    folders?: string[];
    directory?: VirtualFolder;
};

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

export function DirectoryList({ directory, showHidden = false, folderClassName, fileClassName, className,
    onContextMenuFile, onContextMenuFolder, onOpenFile, onOpenFolder, allowMultiSelect = true, onSelectionChange, ...props }: DirectoryListProps): ReactElement | null {
    const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

    const ref = useRef(null);
    const [rectSelectStart, setRectSelectStart] = useState<Vector2 | null>(null);
    const [rectSelectEnd, setRectSelectEnd] = useState<Vector2 | null>(null);

    const [newFileName, setNewFileName] = useState("");
    const [newFolderName, setNewFolderName] = useState("");


    useEffect(() => {
        onSelectionChange?.({ files: selectedFiles, folders: selectedFolders, directory });
    }, [directory, onSelectionChange, selectedFiles, selectedFolders]);

    useEffect(() => {
        clearSelection();
    }, [directory]);



    useEffect(()=>{
        if (selectedFiles.length > 0 || selectedFolders.length > 0) {
            setNewFileName("New File");
            setNewFolderName("New Folder");
        };
    },[directory]);

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

    if (!directory)
        return null;

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

    const saveFile = (file:
        VirtualFile
    ) => {
        if (newFileName === "") return;
        const name = newFileName.split(".")[0];
        const ext = newFileName.split(".")[1];
        file.name = name;
        file.extension = ext;
        file.confirmChanges();
        setNewFileName("");

    };

    const saveFolder = (folder:
        VirtualFolder
    ) => {
        if (newFolderName === "") return;
        folder.name = newFolderName;
        folder.confirmChanges();
        setNewFolderName("");
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

    return <div
        ref={ref}
        className={classNames.join(" ")}
        onClick={clearSelection}
        onMouseDown={onStartRectSelect as unknown as MouseEventHandler}
        {...props}
    >
        {rectSelectStart != null && rectSelectEnd != null
            ? <div className={styles.SelectionRect} style={getRectSelectStyle()} />
            : null
        }
        {directory?.getSubFolders(showHidden)?.map((folder, index) =>
            <Interactable
                key={folder.id}
                tabIndex={0}
                className={folderClassNames.join(" ")}
                data-selected={selectedFolders.includes(folder.id)}
                onContextMenu={(event: MouseEvent) => {
                    onContextMenuFolder?.(event, folder);
                }}
                onClick={(event: MouseEvent) => {
                    selectFolder(folder, !event.ctrlKey);
                }}
                onDoubleClick={(event: MouseEvent) => {
                    onOpenFolder?.(event, folder);
                }}
            >
                <div className={styles.FolderIcon}>
                    <ImagePreview source={folder.getIconUrl()} onError={() => { folder.setIconUrl(null); }} />
                </div>
                {
                    folder.id == "New Folder" ?
                        <input id={folder.id + index} type="text" className={styles.Input} value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") saveFolder(folder);
                            }}
                        /> :
                        <p>{folder.name}</p>
                }
            </Interactable>
        )}
        {directory?.getFiles(showHidden)?.map((file, index) =>
            <Interactable
                key={file.id}
                tabIndex={0}
                className={fileClassNames.join(" ")}
                data-selected={selectedFiles.includes(file.id)}
                onContextMenu={(event: MouseEvent) => {
                    onContextMenuFile?.(event, file);
                }}
                onClick={(event: MouseEvent) => {
                    selectFile(file, !event.ctrlKey);
                }}
                onDoubleClick={(event: MouseEvent) => {
                    onOpenFile?.(event, file);
                }}
            >
                <div className={styles.FileIcon}>
                    <ImagePreview source={file.getIconUrl()} onError={() => { file.setIconUrl(null); }} />
                </div>
                {
                    file.id == "New File" ?
                        <input id={file.id + index} type="text" className={styles.Input} value={newFileName}
                            onChange={(e) => setNewFileName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") saveFile(file);
                            }}
                            onBlur={() => {
                               saveFile(file);
                            }
                            }
                        /> :
                        <p>{file.name}</p>
                }
            </Interactable>
        )}
    </div>;
}