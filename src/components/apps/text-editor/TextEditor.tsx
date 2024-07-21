/* eslint-disable @typescript-eslint/indent */
import { MouseEventHandler, ReactNode, Ref, useEffect, useRef, useState } from "react";
import styles from "./TextEditor.module.css";
import { HeaderMenu } from "../_utils/header-menu/HeaderMenu";
import Markdown from "markdown-to-jsx";
import { CODE_FORMATS, DEFAULT_ZOOM, EXTENSION_TO_LANGUAGE, ZOOM_FACTOR } from "../../../config/apps/textEditor.config";
import { AppsManager } from "../../../features/apps/appsManager";
import { TITLE_SEPARATOR } from "../../../config/windows.config";
import { MarkdownLink } from "./overrides/MarkdownLink";
import { MarkdownImage } from "./overrides/MarkdownImage";
import { useWindowsManager } from "../../../hooks/windows/windowsManagerContext";
import SyntaxHighlighter from "react-syntax-highlighter";
import { useWindowedModal } from "../../../hooks/modals/windowedModal";
import { DEFAULT_FILE_SELECTOR_SIZE } from "../../../config/modals.config";
import { FileSelector } from "../../modals/file-selector/FileSelector";
import { SELECTOR_MODE } from "../../../config/apps/fileExplorer.config";
import { VirtualFile } from "../../../features/virtual-drive/file";
import { WindowProps } from "../../windows/WindowView";
import { DropdownAction } from "../../actions/actions/DropdownAction";
import { ClickAction } from "../../actions/actions/ClickAction";
import { ModalsManager } from "../../../features/modals/modalsManager";
import { App } from "../../../features/apps/app";
import { WindowsManager } from "../../../features/windows/windowsManager";
import { MarkdownBlockquote } from "./overrides/MarkdownBlockquote";
import { useVirtualRoot } from "../../../hooks/virtual-drive/virtualRootContext";
import { APP_NAMES } from "../../../config/apps.config";
import { Divider } from "../../actions/actions/Divider";
import FindReplaceDialog from "./FindAndReplace";
import { useContextMenu } from "../../../hooks/modals/contextMenu";
import { Actions } from "../../actions/Actions";
import { faFile, faFolder, faFolderTree } from "@fortawesome/free-solid-svg-icons";

const OVERRIDES = {
    a: MarkdownLink,
    img: MarkdownImage,
    blockquote: MarkdownBlockquote,
};

export interface MarkdownProps {
    modalsManager: ModalsManager;
    setCurrentFile: Function;
    currentFile: VirtualFile;
    app: App;
    windowsManager: WindowsManager;
    children?: ReactNode;
}

interface TextEditorProps extends WindowProps {
    file?: VirtualFile;
    mode?: "view" | "edit";
    path?: string;
}

export function TextEditor({ file, path, setTitle, setIconUrl, close, mode, app, modalsManager }: TextEditorProps) {
    const ref = useRef<HTMLDivElement | HTMLTextAreaElement>();
    const windowsManager = useWindowsManager();
    const virtualRoot = useVirtualRoot();
    const [currentFile, setCurrentFile] = useState<VirtualFile | null>(file as VirtualFile);
    const [currentMode, setCurrentMode] = useState<TextEditorProps["mode"]>(mode);
    const [content, setContent] = useState(file?.content ?? "");
    const [unsavedChanges, setUnsavedChanges] = useState(file == null);
    const [zoom, setZoom] = useState(DEFAULT_ZOOM);
    const [positions, setPositions] = useState<number[]>([]);
    const [currentOccurrence, setCurrentOccurrence] = useState(0);
    const [initialised, setInitialised] = useState(false);
    const { openWindowedModal } = useWindowedModal();
    const [selectedText, setSelectedText] = useState(
        window.getSelection()?.toString() ?? ""
    );
    const [dialogOpen, setDialogOpen] = useState(false);


    useEffect(() => {
        // Reset positions and currentOccurrence when content changes
        setPositions([]);
        setCurrentOccurrence(0);
    }, [content]);

    const { onContextMenu, ShortcutsListener } = useContextMenu({
        Actions: (props) =>
            <Actions {...props}>


                <ClickAction label="Copy" onTrigger={handleCopy} />
                <ClickAction label="Cut" onTrigger={handleCut} />
                <ClickAction label="Paste" onTrigger={handlePaste} />
                <ClickAction label="Select All" onTrigger={handleSelectAll} />




            </Actions>
    });

    useEffect(() => {
        void (async () => {
            let newContent: string | null = "";

            // Load file
            if (currentFile) {
                newContent = await currentFile.read() as string | null;

                const iconUrl = currentFile.getIconUrl();
                if (iconUrl)
                    setIconUrl?.(iconUrl);

                if (newContent?.trim() === "")
                    setCurrentMode("edit");
            } else if (app != null) {
                setIconUrl?.(AppsManager.getAppIconUrl(app.id));
            }

            if (newContent != null)
                setContent(newContent);

            if (ref.current)
                (ref.current as HTMLElement).scrollTo(0, 0);
        })();
    }, [app?.id, currentFile, setIconUrl]);

    useEffect(() => {
        // Update title
        let label = currentFile?.id ?? "Untitled";

        if (unsavedChanges)
            label += "*";

        if (currentMode === "view")
            label += " (preview)";

        setTitle?.(app != null ? `${label} ${TITLE_SEPARATOR} ${app.name}` : label);
    }, [currentFile, setTitle, unsavedChanges, currentMode, app?.name]);

    useEffect(() => {
        if (!initialised && currentFile == null && path != null) {
            const newFile = virtualRoot?.navigate(path);

            if (newFile == null || !newFile.isFile())
                return;

            setCurrentFile(newFile as VirtualFile);
            setInitialised(true);
        }
    }, [path, currentFile]);

    const newText = () => {
        setCurrentFile(null);
        setCurrentMode("edit");
        setUnsavedChanges(true);
    };

    const saveTextAs = () => {
        onChange({ target: { value: content } });
    };

    const saveText = () => {
        if (currentFile == null)
            return saveTextAs();

        currentFile.setContent(content);
        onChange({ target: { value: content } });
    };

    const onChange = (event: Event | { target: { value: string } }) => {
        const value = (event.target as HTMLInputElement).value;

        if (currentFile != null) {
            setUnsavedChanges(currentFile.content !== value);
        } else {
            setUnsavedChanges(true);
        }

        return setContent(value);
    };

    const overrides: Record<string, object> = {};
    for (const [key, value] of Object.entries(OVERRIDES)) {
        overrides[key] = {
            component: value,
            props: {
                modalsManager,
                setCurrentFile,
                currentFile,
                app,
                windowsManager
            } as MarkdownProps
        };
    }

    const handleNext = () => {
        setCurrentOccurrence((prev) => prev + 1);

    };
    const handleReset = () => {
        setCurrentOccurrence(0);
    };
    const handlePrevious = () => {

        setCurrentOccurrence((prev) =>
            prev > 0 ?
                prev - 1
                :
                prev
        );
    };

    const handleUndo = () => {
        if (ref.current instanceof HTMLTextAreaElement) {
            ref.current.focus();
            document.execCommand("undo");
        }
    };

    const handleRedo = () => {
        if (ref.current instanceof HTMLTextAreaElement) {
            ref.current.focus();
            document.execCommand("redo");
        }
    };

    const handleCut = async () => {
        if (ref.current instanceof HTMLTextAreaElement) {
            ref.current.focus();
            const selectedText = window.getSelection()?.toString() ?? "";
            await navigator.clipboard.writeText(selectedText);
            document.execCommand("cut");
        }
    };

    const handleCopy = async () => {
        if (ref.current instanceof HTMLTextAreaElement) {
            ref.current.focus();
            const selectedText = window.getSelection()?.toString() ?? "";
            await navigator.clipboard.writeText(selectedText);
        }
    };

    const handlePaste = async () => {
        if (ref.current instanceof HTMLTextAreaElement) {
            ref.current.focus();
            const text = await navigator.clipboard.readText();
            document.execCommand("insertText", false, text);
        }
    };

    const handleSelectAll = () => {
        if (ref.current instanceof HTMLTextAreaElement) {
            ref.current.focus();
            document.execCommand("selectAll");
        }
    };


    const handleFind = (text: string) => {
        const positions = [];
        const position = content.indexOf(text);
        positions.push(position, content.indexOf(text, position + 1));
        setPositions(positions);
        setCurrentOccurrence(0);
        if (position !== -1 && ref.current instanceof HTMLTextAreaElement) {
            ref.current.focus();
            ref.current.setSelectionRange(position, position + text.length);
        }
    };
    const handleFindAll = (text: string) => {
        const positions = [];
        let position = content.indexOf(text);

        while (position !== -1) {

            positions.push(position, content.indexOf(text, position + 1));
            position = content.indexOf(text, position + 1);
        }
        setPositions(positions);
        if (positions.length > 0 && ref.current instanceof HTMLTextAreaElement) {
            ref.current.focus();
            ref.current.setSelectionRange(positions[currentOccurrence], positions[currentOccurrence] + text.length);
        }
    };
    const handleReplaceAll = (findText: string, replaceText: string) => {
        const newContent = content.split(findText).join(replaceText);
        setContent(newContent);
        if (ref.current instanceof HTMLTextAreaElement) {
            ref.current.value = newContent;
        }
    };

    const handleReplace = (findText: string, replaceText: string) => {
        if (positions.length > 0 && currentOccurrence < positions.length) {
            const position = positions[currentOccurrence];
            if (position !== -1 && ref.current instanceof HTMLTextAreaElement) {
                // Replace the text at the current occurrence position
                const newContent = content.substring(0, position) + replaceText + content.substring(position + findText.length);
                setContent(newContent);

                // Update the textarea value with the replaced text
                ref.current.value = newContent;

                // Update positions to reflect the replaced text
                const newPositions = [];
                let newPos = newContent.indexOf(findText);
                while (newPos !== -1) {
                    newPositions.push(newPos);
                    newPos = newContent.indexOf(findText, newPos + 1);
                }
                setPositions(newPositions);

                // Highlight the next occurrence or stay at the same position if no more occurrences
                const nextOccurrence = currentOccurrence < newPositions.length ? currentOccurrence : Math.max(0, newPositions.length - 1);
                setCurrentOccurrence(nextOccurrence);
                if (newPositions.length > 0 && ref.current instanceof HTMLTextAreaElement) {
                    ref.current.focus();
                    ref.current.setSelectionRange(newPositions[nextOccurrence], newPositions[nextOccurrence] + findText.length);
                }
            }
        }
    };



    const handleCloseDialog = () => {
        // check if data is not save yet 


        setDialogOpen(false);


    };

    return (<>
        <ShortcutsListener />
        <div className={styles.TextEditor} style={{ fontSize: zoom }}>
            <HeaderMenu>
                <DropdownAction label="File" showOnHover={false}>
                    <ClickAction label="New" onTrigger={() => { newText(); }} shortcut={["Control", "e"]} />
                    <ClickAction label="Open" onTrigger={() => {
                        openWindowedModal({
                            size: DEFAULT_FILE_SELECTOR_SIZE,
                            Modal: (props: object) => <FileSelector
                                type={SELECTOR_MODE.SINGLE}
                                onFinish={(file) => {
                                    setCurrentFile(file as VirtualFile);
                                    setUnsavedChanges(false);
                                }}
                                {...props}
                            />
                        });
                    }} shortcut={["Control", "o"]} />
                    <Divider />
                    <ClickAction label="Save" onTrigger={() => { saveText(); }} shortcut={["Control", "s"]} />
                    <ClickAction label={`Reveal in ${APP_NAMES.FILE_EXPLORER}`} disabled={currentFile == null} onTrigger={() => {
                        if (windowsManager != null) currentFile?.parent?.open(windowsManager);
                    }} />
                    <Divider />
                    <ClickAction label="Quit" onTrigger={() => { close?.(); }} shortcut={["Control", "q"]} />
                </DropdownAction>
                <DropdownAction label="Edit" showOnHover={false}>
                    <ClickAction label="Undo" onTrigger={handleUndo} shortcut={["Control", "z"]} />
                    <ClickAction label="Redo" onTrigger={handleRedo} shortcut={["Control", "y"]} />
                    <Divider />
                    <ClickAction label="Cut" onTrigger={handleCut} shortcut={["Control", "x"]} />
                    <ClickAction label="Copy" onTrigger={handleCopy} shortcut={["Control", "c"]} />
                    <ClickAction label="Paste" onTrigger={handlePaste} shortcut={["Control", "v"]} />
                    <Divider />
                    <ClickAction label="Select All" onTrigger={handleSelectAll} shortcut={["Control", "a"]} />
                    <ClickAction label="Find" onTrigger={() => {
                        setSelectedText(window.getSelection()?.toString() ?? "");
                        setDialogOpen(true);
                    }} shortcut={["Control", "f"]} />
                    <ClickAction label="Replace" onTrigger={() => {
                        setSelectedText(window.getSelection()?.toString() ?? "");
                        setDialogOpen(true);
                    }} shortcut={["Control", "h"]} />
                </DropdownAction>
                <DropdownAction label="View" showOnHover={false}>
                    <ClickAction label={currentMode === "view" ? "Edit mode" : "Preview mode"} onTrigger={() => {
                        setCurrentMode(currentMode === "view" ? "edit" : "view");
                    }} shortcut={["Control", "u"]} />
                    <Divider />
                    <ClickAction label="Zoom in" onTrigger={() => { setZoom(zoom + ZOOM_FACTOR); }} shortcut={["Control", "+"]} />
                    <ClickAction label="Zoom out" onTrigger={() => { setZoom(zoom - ZOOM_FACTOR); }} shortcut={["Control", "-"]} />
                    <ClickAction label="Reset Zoom" disabled={zoom == DEFAULT_ZOOM} onTrigger={() => { setZoom(DEFAULT_ZOOM); }} shortcut={["Control", "0"]} />
                </DropdownAction>
            </HeaderMenu>
            {
                dialogOpen &&
                <div className={styles.Find}>
                    <FindReplaceDialog
                        selectedText={selectedText.toString()}
                        onClose={handleCloseDialog}
                        onFind={handleFind}
                        onNext={handleNext}
                        onReset={handleReset}
                        onPrevious={handlePrevious}
                        onFindAll={handleFindAll}
                        onReplace={handleReplace}
                        onReplaceAll={handleReplaceAll}
                    />
                </div>
            }

            {currentMode === "view"
                ? currentFile?.extension != null && CODE_FORMATS.includes(currentFile?.extension)
                    ? <SyntaxHighlighter
                        language={EXTENSION_TO_LANGUAGE[currentFile?.extension] ?? currentFile?.extension}
                        className={styles.Code}
                        useInlineStyles={false}
                        showLineNumbers={true}
                    >{content}</SyntaxHighlighter>
                    : <div ref={ref as Ref<HTMLDivElement>} className={styles.View}>
                        {currentFile?.extension === "md"
                            ? <Markdown options={{ overrides } as object}>{content}</Markdown>
                            : <pre><p>{content}</p></pre>
                        }
                    </div>
                : <textarea
                    onContextMenu={onContextMenu as unknown as MouseEventHandler}
                    ref={ref as Ref<HTMLTextAreaElement>}
                    className={styles.View}
                    value={content}
                    onChange={onChange}
                    spellCheck={false}
                    autoComplete="off"
                    autoFocus
                />
            }
        </div>
    </>
    );
}
