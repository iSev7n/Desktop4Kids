import { useState, useEffect } from "react";
import { faFile, faFolder, faFolderTree } from "@fortawesome/free-solid-svg-icons";
import { DropdownAction } from "../../actions/actions/DropdownAction";
import { ClickAction } from "../../actions/actions/ClickAction";
import { Divider } from "../../actions/actions/Divider";
import { VirtualFolder } from "../../../features/virtual-drive/folder";
import { useVirtualRoot } from "../../../hooks/virtual-drive/virtualRootContext";
import { useWindowsManager } from "../../../hooks/windows/windowsManagerContext";

const CreateMenu = ({ path }: { path?: string; }) => {
    const virtualRoot = useVirtualRoot();
    const [currentDirectory, setCurrentDirectory] = useState<VirtualFolder | null>(null);
    const [_, setStateUpdate] = useState(false);  // State to force re-render
    const windowsManager = useWindowsManager();

    useEffect(() => {
        setCurrentDirectory(virtualRoot?.navigate(path ?? "~") as VirtualFolder);
    }, [virtualRoot, path]);

    const handleCreateFile = () => {
        if (currentDirectory) {
            console.log("Creating file in directory:", currentDirectory);
            currentDirectory.createFile("New File", "txt");
            currentDirectory.confirmChanges();
            setStateUpdate(state => !state);  // Force re-render
        }
    };

    const handleCreateFolder = () => {
        if (currentDirectory) {
            console.log("Creating folder in directory:", currentDirectory);
            currentDirectory.createFolder("New Folder");
            currentDirectory.confirmChanges();
            setStateUpdate(state => !state);  // Force re-render
        }
    };

    return (
        <DropdownAction label="New" icon={faFolderTree}>
            <ClickAction label="New File" icon={faFile} onTrigger={handleCreateFile} />
            <Divider />
            <ClickAction label="New Folder" icon={faFolder} onTrigger={handleCreateFolder} />
        </DropdownAction>
    );
};

export default CreateMenu;