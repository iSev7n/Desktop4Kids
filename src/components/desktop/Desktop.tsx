import React, { memo, MouseEventHandler, useState, useEffect } from "react";
import { SettingsManager } from "../../features/settings/settingsManager";
import { useSettingsManager } from "../../hooks/settings/settingsManagerContext";
import styles from "./Desktop.module.css";
import { useWindowsManager } from "../../hooks/windows/windowsManagerContext";
import { useContextMenu } from "../../hooks/modals/contextMenu";
import { FALLBACK_ICON_DIRECTION, FALLBACK_ICON_SIZE, FALLBACK_WALLPAPER } from "../../config/desktop.config";
import { reloadViewport } from "../../features/_utils/browser.utils";
import { useVirtualRoot } from "../../hooks/virtual-drive/virtualRootContext";
import { DirectoryList, FileEventHandler, FolderEventHandler } from "../apps/file-explorer/directory-list/DirectoryList";
import { APPS, APP_ICONS, APP_NAMES } from "../../config/apps.config";
import { Vector2 } from "../../features/math/vector2";
import { Actions } from "../actions/Actions";
import { ClickAction } from "../actions/actions/ClickAction";
import { faArrowsRotate, faCompress, faExpand, faEye, faFile, faFolder, faFolderBlank, faFolderTree, faPaintBrush, faTerminal, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ToggleAction } from "../actions/actions/ToggleAction";
import { DropdownAction } from "../actions/actions/DropdownAction";
import { RadioAction } from "../actions/actions/RadioAction";
import { Divider } from "../actions/actions/Divider";
import { isValidInteger } from "../../features/_utils/number.utils";
import { useWindowedModal } from "../../hooks/modals/windowedModal";
import { Share } from "../modals/share/Share";
import { ModalsManager } from "../../features/modals/modalsManager";
import { VirtualFolder } from "../../features/virtual-drive/folder/virtualFolder";
import { VirtualFile } from "../../features/virtual-drive/file";
import { TABS } from "../../config/apps/settings.config";
import { ModalProps } from "../modals/ModalView";
import CreateMenu from "../taskbar/menus/CreateMenu";

export const Desktop = memo(() => {
    const settingsManager = useSettingsManager();
    const [wallpaper, setWallpaper] = useState<string | null>(null);
    const windowsManager = useWindowsManager();
    const virtualRoot = useVirtualRoot();
    const [showIcons, setShowIcons] = useState(false);
    const [iconSize, setIconSize] = useState(FALLBACK_ICON_SIZE);
    const [iconDirection, setIconDirection] = useState(FALLBACK_ICON_DIRECTION);
    const [stateUpdate, setStateUpdate] = useState(false);  // State to force re-render
    const { openWindowedModal } = useWindowedModal();

    const directory = virtualRoot?.navigate("~/Desktop");

    const deleteFile = (file: VirtualFile) => {
        file.delete();
        setStateUpdate(state => !state);  // Force re-render
    };
    
    const deleteFolder = (folder: VirtualFolder) => {
        folder.delete();
        setStateUpdate(state => !state);  // Force re-render
    };

    const renameFile = (file: VirtualFile) => {
        file.isRename = true;
        const index = (directory as VirtualFolder)?.files?.findIndex((f: { id: string; }) => f.id === file.id);
        if (index !== -1) {
            (directory as VirtualFolder).files[index] = file;
        }
        file.confirmChanges();
        setStateUpdate(state => !state);  // Force re-render
    };

    const renameFolder = (file: VirtualFolder) => {
        file.isRename = true;
        const index = (directory as VirtualFolder)?.subFolders?.findIndex((f: { id: string; }) => f.id === file.id);
        if (index !== -1) {
            (directory as VirtualFolder).subFolders[index] = file;
        }
        directory?.confirmChanges();
        file.confirmChanges();
        setStateUpdate(state => !state);  // Force re-render
    };

    const handleCreateFile = () => {
        if (directory) {
            (directory as VirtualFolder).createFile("New File", "txt");
            (directory as VirtualFolder).confirmChanges();
            setStateUpdate(state => !state);  // Force re-render
        }
    };

    const handleCreateFolder = () => {
        if (directory) {
            (directory as VirtualFolder).createFolder("New Folder");
            (directory as VirtualFolder).confirmChanges();
            setStateUpdate(state => !state);  // Force re-render
        }
    };

    const { onContextMenu, ShortcutsListener } = useContextMenu({
        Actions: (props) =>
            <Actions {...props}>
                <DropdownAction label="View" icon={faEye}>
                    <RadioAction initialIndex={iconSize} onTrigger={(event, params, value) => {
                        const settings = settingsManager?.getSettings(SettingsManager.VIRTUAL_PATHS.desktop);
                        void settings?.set("icon-size", value as string);
                    }} options={[
                        { label: "Small icons" },
                        { label: "Medium icons" },
                        { label: "Large icons" },
                    ]} />
                    <Divider />
                    <RadioAction initialIndex={iconDirection} onTrigger={(event, params, value) => {
                        const settings = settingsManager?.getSettings(SettingsManager.VIRTUAL_PATHS.desktop);
                        void settings?.set("icon-direction", value as string);
                    }} options={[
                        { label: "Align vertically" },
                        { label: "Align horizontally" },
                    ]} />
                    <Divider />
                    <ToggleAction label="Show desktop icons" initialValue={showIcons} onTrigger={() => {
                        const settings = settingsManager?.getSettings(SettingsManager.VIRTUAL_PATHS.desktop);
                        void settings?.set("show-icons", (!showIcons).toString());
                    }} />
                </DropdownAction>
                <ClickAction label="Reload" shortcut={["Control", "r"]} icon={faArrowsRotate} onTrigger={() => {
                    reloadViewport();
                }} />
                <ClickAction
                    label={!document.fullscreenElement ? "Enter fullscreen" : "Exit fullscreen"}
                    shortcut={["F11"]}
                    icon={!document.fullscreenElement ? faExpand : faCompress}
                    onTrigger={() => {
                        if (windowsManager?.isAnyFocused())
                            return;

                        if (!document.fullscreenElement) {
                            void document.body.requestFullscreen().catch((error) => {
                                console.error(error);
                            });
                        } else {
                            void document.exitFullscreen().catch((error) => {
                                console.error(error);
                            });
                        }
                    }}
                />
                <ClickAction label="Change appearance" icon={faPaintBrush} onTrigger={() => {
                    windowsManager?.open("settings", { tab: TABS.APPEARANCE });
                }} />
                <Divider />
                <ClickAction label={`Open in ${APP_NAMES.FILE_EXPLORER}`} icon={APP_ICONS.FILE_EXPLORER} onTrigger={() => {
                    windowsManager?.open(APPS.FILE_EXPLORER, { path: directory?.path });
                }} />
                <ClickAction label={`Open in ${APP_NAMES.TERMINAL}`} icon={APP_ICONS.TERMINAL} onTrigger={() => {
                    windowsManager?.open(APPS.TERMINAL, { path: directory?.path });
                }} />
                <Divider />
                <DropdownAction label="New" icon={faFolderTree}>
                    <ClickAction label="New File" icon={faFile} onTrigger={handleCreateFile} />
                    <Divider />
                    <ClickAction label="New Folder" icon={faFolder} onTrigger={handleCreateFolder} />
                </DropdownAction>
                <Divider />
                <ClickAction label={"Share"} icon={ModalsManager.getModalIconUrl("share")} onTrigger={() => {
                    openWindowedModal({
                        size: new Vector2(350, 350),
                        Modal: (props: ModalProps) => <Share {...props} />
                    });
                }} />
            </Actions>
    });

    const { onContextMenu: onContextMenuFile } = useContextMenu({
        Actions: (props) =>
            <Actions {...props}>
                <ClickAction label="Open" onTrigger={(event, file) => {
                    if (windowsManager != null) (file as VirtualFile).open(windowsManager);
                }} />
                <ClickAction label={`Reveal in ${APP_NAMES.FILE_EXPLORER}`} icon={faFolder} onTrigger={(event, file) => {
                    if (windowsManager != null) (file as VirtualFile).parent?.open(windowsManager);
                }} />
                <ClickAction label="Rename" icon={faFolderBlank} onTrigger={(event, file) => {
                    renameFile(file as VirtualFile);
                }} />
                <ClickAction label="Delete" icon={faTrash} onTrigger={(event, file) => {
                    (file as VirtualFile).delete();
                    setStateUpdate(state => !state);  // Force re-render
                }} />
            </Actions>
    });

    const { onContextMenu: onContextMenuFolder } = useContextMenu({
        Actions: (props) =>
            <Actions {...props}>
                <ClickAction label="Open" onTrigger={(event, folder) => {
                    if (windowsManager != null) (folder as VirtualFolder).open(windowsManager);
                }} />
                <ClickAction label={`Open in ${APP_NAMES.TERMINAL}`} icon={faTerminal} onTrigger={(event, folder) => {
                    windowsManager?.open(APPS.TERMINAL, { path: (folder as VirtualFolder).path });
                }} />
                <ClickAction label={`Reveal in ${APP_NAMES.FILE_EXPLORER}`} icon={faFolder} onTrigger={(event, folder) => {
                    if (windowsManager != null) (folder as VirtualFolder).parent?.open(windowsManager);
                }} />
                <Divider />
                <ClickAction label="Rename" icon={faFolderBlank} onTrigger={(event, folder) => {
                    renameFolder(folder as VirtualFolder);
                }} />
                <ClickAction label="Delete" icon={faTrash} onTrigger={(event, folder) => {
                    (folder as VirtualFolder).delete();
                    setStateUpdate(state => !state);  // Force re-render
                }} />
            </Actions>
    });

    useEffect(() => {
        const settings = settingsManager?.getSettings(SettingsManager.VIRTUAL_PATHS.desktop);
        void settings?.get("wallpaper", setWallpaper);
        void settings?.get("show-icons", (value) => {
            if (value != null) {
                setShowIcons(value === "true");
            } else {
                setShowIcons(true);
            }
        });
        void settings?.get("icon-size", (value) => {
            if (isValidInteger(value))
                setIconSize(parseInt(value));
        });
        void settings?.get("icon-direction", (value) => {
            if (isValidInteger(value))
                setIconDirection(parseInt(value));
        });
    }, [settingsManager]);

    const onError = () => {
        const settings = settingsManager?.getSettings(SettingsManager.VIRTUAL_PATHS.desktop);
        void settings?.set("wallpaper", FALLBACK_WALLPAPER);
    };

    const iconScale = 1 + ((isValidInteger(iconSize) ? iconSize : FALLBACK_ICON_SIZE) - 1) / 5;

    return (
        <>
            <ShortcutsListener />
            <div
                className={styles.Desktop}
                onContextMenu={onContextMenu as unknown as MouseEventHandler}
            >
                {showIcons && <DirectoryList
                    directory={directory as VirtualFolder}
                    className={styles.Content}
                    style={{
                        "--scale": `${iconScale}rem`,
                        "--direction": iconDirection == 1 ? "row" : "column"
                    }}
                    fileClassName={styles["Item"]}
                    folderClassName={styles["Item"]}
                    onOpenFile={(event, file) => {
                        (event).preventDefault();

                        const options: Record<string, unknown> = {};
                        if (file.name === "Info.md")
                            options.size = new Vector2(575, 675);
                        if (file.extension === "md")
                            options.mode = "view";

                        windowsManager?.openFile(file, options);
                    }}
                    onOpenFolder={(event, folder) => {
                        windowsManager?.open(APPS.FILE_EXPLORER, {
                            path: (folder as VirtualFolder).path
                        });
                    }}
                    onContextMenuFile={onContextMenuFile as unknown as FileEventHandler}
                    onContextMenuFolder={onContextMenuFolder as unknown as FolderEventHandler}
                />}
                {wallpaper
                    ? <img src={wallpaper} className={styles.Wallpaper} alt="Desktop wallpaper" onError={onError} />
                    : null
                }
            </div>
        </>
    );
});

export default Desktop;