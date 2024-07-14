import { ChangeEventHandler, FC, KeyboardEventHandler, useCallback, useEffect, useState } from "react";
import { useVirtualRoot } from "../../../hooks/virtual-drive/virtualRootContext";
import styles from "./FileExplorer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faCaretLeft, faCaretRight, faCircleInfo, faCog, faDesktop, faFileLines, faFileVideo, faHouse, faImage, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useWindowsManager } from "../../../hooks/windows/windowsManagerContext";
import { useContextMenu } from "../../../hooks/modals/contextMenu";
import { QuickAccessButton } from "./QuickAccessButton";
import { useWindowedModal } from "../../../hooks/modals/windowedModal";
import { Vector2 } from "../../../features/math/vector2";
import { DIALOG_CONTENT_TYPES } from "../../../config/modals.config";
import { DirectoryList, FileEventHandler, FolderEventHandler, OnSelectionChangeParams } from "./directory-list/DirectoryList";
import { Actions } from "../../actions/Actions";
import { ClickAction } from "../../actions/actions/ClickAction";
import utilStyles from "../../../styles/utils.module.css";
import { DialogBox } from "../../modals/dialog-box/DialogBox";
import { AppsManager } from "../../../features/apps/appsManager";
import { APPS, APP_ICONS, APP_NAMES } from "../../../config/apps.config";
import { TITLE_SEPARATOR } from "../../../config/windows.config";
import { FileProperties } from "../../modals/file-properties/FileProperties";
import { useHistory } from "../../../hooks/_utils/history";
import { Divider } from "../../actions/actions/Divider";
import { CODE_FORMATS } from "../../../config/apps/textEditor.config";
import { SELECTOR_MODE } from "../../../config/apps/fileExplorer.config";
import { WindowProps } from "../../windows/WindowView";
import { VirtualFolder } from "../../../features/virtual-drive/folder/virtualFolder";
import { VirtualFile } from "../../../features/virtual-drive/file";
import { VirtualFolderLink } from "../../../features/virtual-drive/folder/virtualFolderLink";
import { ImportButton } from "./ImportButton";
import { useAlert } from "../../../hooks/modals/alert";
import { VirtualRoot } from "../../../features/virtual-drive/root/virtualRoot";

interface FileExplorerProps extends WindowProps {
    path?: string;
    selectorMode?: number;
    Footer: FC;
    onSelectionChange: (params: OnSelectionChangeParams) => void;
    onSelectionFinish: Function;
}

export function FileExplorer({ path: startPath, selectorMode, Footer, onSelectionChange, onSelectionFinish }: FileExplorerProps) {
	const isSelector = (Footer != null && selectorMode != null && selectorMode !== SELECTOR_MODE.NONE);

	const virtualRoot = useVirtualRoot();
	const [currentDirectory, setCurrentDirectory] = useState<VirtualFolder>(virtualRoot?.navigate(startPath ?? "~") as VirtualFolder);
	const [path, setPath] = useState<string>(currentDirectory?.path ?? "");
	const windowsManager = useWindowsManager();
	const [showHidden] = useState(true);
	const { history, stateIndex, pushState, undo, redo, undoAvailable, redoAvailable } = useHistory<string>(currentDirectory.path);
	const { alert } = useAlert();
	const [selectedFileType, setSelectedFileType] = useState<string>("");

	const { openWindowedModal } = useWindowedModal();
	const { onContextMenu: onContextMenuFile } = useContextMenu({ Actions: (props) =>
		<Actions {...props}>
			<ClickAction label={!isSelector ? "Open" : "Select"} onTrigger={(event, file) => {
				if (isSelector) {
					onSelectionChange?.({ files: [(file as VirtualFile).id], directory: currentDirectory });
					onSelectionFinish?.();
					return;
				}
				if (windowsManager != null)	(file as VirtualFile).open(windowsManager);
			}}/>
			<ClickAction label="Delete" icon={faTrash} onTrigger={(event, file) => {
				(file as VirtualFile).delete();
			}}/>
			<ClickAction label="Properties" icon={faCircleInfo} onTrigger={(event, file) => {
				openWindowedModal({
					title: `${(file as VirtualFile).id} ${TITLE_SEPARATOR} Properties`,
					iconUrl: (file as VirtualFile).getIconUrl(),
					size: new Vector2(400, 500),
					Modal: (props: object) => <FileProperties file={file as VirtualFile} {...props}/>
				});
			}}/>
		</Actions>
	});
	const { onContextMenu: onContextMenuFolder } = useContextMenu({ Actions: (props) =>
		<Actions {...props}>
			<ClickAction label="Open" onTrigger={(event, folder) => {
				changeDirectory((folder as VirtualFolderLink).linkedPath ?? (folder as VirtualFolder).name);
			}}/>
			<ClickAction label={`Open in ${APP_NAMES.TERMINAL}`} icon={APP_ICONS.TERMINAL} onTrigger={(event, folder) => {
				windowsManager?.open(APPS.TERMINAL, { startPath: (folder as VirtualFolder).path });
			}}/>
			<Divider/>
			<ClickAction label="Delete" icon={faTrash} onTrigger={(event, folder) => {
				(folder as VirtualFolder).delete();
			}}/>
		</Actions>
	});
	
	const [newModalOpen, setNewModalOpen] = useState(false);
    const [newItemType, setNewItemType] = useState<"File" | "Folder" | null>(null);
    const [newItemName, setNewItemName] = useState("");

    const onNew = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setNewModalOpen(true);
    };

	const handleClose = () => {
		setNewModalOpen(false);
	  };

    const createNewFile = () => {
        if (newItemType === "File" && newItemName) {
            currentDirectory.createFile(newItemName);
        } else if (newItemType === "Folder" && newItemName) {
            currentDirectory.createFolder(newItemName);
        }
        // Close the modal after creating file or folder
        setNewModalOpen(false);
        setNewItemName("");
        setNewItemType(null);
    };


	const changeDirectory = useCallback((path: string, absolute = false) => {
		if (path == null)
			return;

		if (currentDirectory == null)
			absolute = true;

		const directory = absolute ? virtualRoot?.navigate(path) : currentDirectory.navigate(path);

		if (directory != null) {
			setCurrentDirectory(directory as VirtualFolder);
			setPath(directory.root ? "/" : directory.path);
			pushState(directory.path);
		}
	}, [currentDirectory, pushState, virtualRoot]);

	useEffect(() => {
		if (history.length === 0)
			return;

		const path = history[stateIndex];
		const directory = virtualRoot?.navigate(path);
		if (directory != null) {
			setCurrentDirectory(directory as VirtualFolder);
			setPath(directory.root ? "/" : directory.path);
		}
	}, [history, stateIndex, virtualRoot]);

	useEffect(() => {
		type Error = { message: string };
		const onError = (error: unknown) => {
			alert({
				title: (error as Error).message,
				text: "You have exceeded the virtual drive capacity. Files and folders will not be saved until more storage is freed.",
				iconUrl: AppsManager.getAppIconUrl(APPS.FILE_EXPLORER),
				size: new Vector2(300, 200),
				single: true,
			});
		};

		virtualRoot?.on(VirtualRoot.EVENT_NAMES.ERROR, onError);

		return () => {
			virtualRoot?.off(VirtualRoot.EVENT_NAMES.ERROR, onError);
		};
	}, []);

	const onPathChange = (event: Event) => {
		setPath((event.target as HTMLInputElement).value);
	};

	const onKeyDown = (event: KeyboardEvent) => {
		let value = (event.target as HTMLInputElement).value;

		if (event.key === "Enter") {
			if (value === "")
				value = "~";

			const directory = virtualRoot?.navigate(value);

			if (directory == null) {
				openWindowedModal({
					title: "Error",
					iconUrl: AppsManager.getAppIconUrl(APPS.FILE_EXPLORER),
					size: new Vector2(300, 150),
					Modal: (props: {}) =>
						<DialogBox {...props}>
							<p>Invalid path: "{value}"</p>
							<button data-type={DIALOG_CONTENT_TYPES.closeButton}>Ok</button>
						</DialogBox>
				});
				return;
			}

			setCurrentDirectory(directory as VirtualFolder);
			setPath(directory.root ? "/" : directory.path);
		}
	};

	const itemCount = currentDirectory.getItemCount(showHidden);

	return (
		<div className={!isSelector ? styles.FileExplorer : `${styles.FileExplorer} ${styles.Selector}`}>
			<div className={styles.Header}>
				<button
					title="Back"
					tabIndex={0}
					className={styles.IconButton}
					onClick={() => { undo(); }}
					disabled={!undoAvailable}
				>
					<FontAwesomeIcon icon={faCaretLeft}/>
				</button>
				<button
					title="Forward"
					tabIndex={0}
					className={styles.IconButton}
					onClick={() => { redo(); }}
					disabled={!redoAvailable}
				>
					<FontAwesomeIcon icon={faCaretRight}/>
				</button>
				<button
					title="Up"
					tabIndex={0}
					className={styles.IconButton}
					onClick={() => { changeDirectory(".."); }}
					disabled={currentDirectory.isRoot != null && currentDirectory.isRoot}
				>
					<FontAwesomeIcon icon={faArrowUp}/>
				</button>
				<button
  					title="New"
  					tabIndex={0}
  					className={styles.IconButton}
  					onClick={onNew}
  					disabled={!currentDirectory.canBeEdited}
					>
  				<FontAwesomeIcon icon={faPlus}/>
				</button>
				<input
					value={path}
					type="text"
					aria-label="Path"
					className={styles.PathInput}
					tabIndex={0}
					onChange={onPathChange as unknown as ChangeEventHandler}
					onKeyDown={onKeyDown as unknown as KeyboardEventHandler}
					placeholder="Enter a path..."
				/>
				<ImportButton directory={currentDirectory}/>
				<button title="Search" tabIndex={0} className={styles.IconButton}>
					<FontAwesomeIcon icon={faSearch}/>
				</button>
				<button title="Settings" tabIndex={0} className={styles.IconButton}>
					<FontAwesomeIcon icon={faCog}/>
				</button>
			</div>
			<div className={styles.Body}>
				<div className={styles.Sidebar}>
					<QuickAccessButton name={"Home"} onClick={() => { changeDirectory("~"); }} icon={faHouse}/>
					<QuickAccessButton name={"Desktop"} onClick={() => { changeDirectory("~/Desktop"); }} icon={faDesktop}/>
					<QuickAccessButton name={"Images"} onClick={() => { changeDirectory("~/Pictures"); }} icon={faImage}/>
					<QuickAccessButton name={"Videos"} onClick={() => { changeDirectory("~/Videos"); }} icon={faFileVideo}/>
					<QuickAccessButton name={"Documents"} onClick={() => { changeDirectory("~/Documents"); }} icon={faFileLines}/>
				</div>
				<DirectoryList
					directory={currentDirectory} 
					id="main"
					className={styles.Main}
					showHidden={showHidden}
					onOpenFile={(event, file) => {
						event.preventDefault();
						if (isSelector)
							return void onSelectionFinish?.();
						const options: Record<string, string> = {};
						if (file.extension === "md" || (file.extension != null && CODE_FORMATS.includes(file.extension)))
							options.mode = "view";
						windowsManager?.openFile(file, options);
					}}
					onOpenFolder={(event, folder) => {
						changeDirectory((folder as VirtualFolderLink).linkedPath ?? folder.name);
					}}
					onContextMenuFile={onContextMenuFile as unknown as FileEventHandler}
					onContextMenuFolder={onContextMenuFolder as unknown as FolderEventHandler}
					allowMultiSelect={selectorMode !== SELECTOR_MODE.SINGLE}
					onSelectionChange={onSelectionChange}
				/>
			</div>
			{!isSelector
				? <span className={styles.Footer}>
					<p className={utilStyles.TextLight}>
						{itemCount === 1
							? itemCount + " item"
							: itemCount + " items"
						}
					</p>
				</span>
				: <div className={styles.Footer}>
				<Footer/>
			</div>
		}
		{/* New item modal */}
		{newModalOpen && (
			<DialogBox
				title="New"
				iconUrl={AppsManager.getAppIconUrl(APPS.FILE_EXPLORER)}
				size={new Vector2(300, 200)}
				onClose={handleClose}
			>
				<p>Select the type of item to create:</p>
				<div>
					<button onClick={() => setNewItemType("File")}>File</button>
					<button onClick={() => setNewItemType("Folder")}>Folder</button>
				</div>
				{newItemType && (
					<>
						<p>Enter the name:</p>
						<input
							type="text"
							value={newItemName}
							onChange={(e) => setNewItemName(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") createNewFile();
							}}
						/>
						<button onClick={createNewFile}>Create</button>
					</>
				)}
			</DialogBox>
		)}
	</div>
);
}