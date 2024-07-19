/* eslint-disable @typescript-eslint/indent */
import { faFile, faFolder, faFolderTree } from "@fortawesome/free-solid-svg-icons";
import { DropdownAction } from "../../actions/actions/DropdownAction";
import { ClickAction } from "../../actions/actions/ClickAction";
import { Divider } from "../../actions/actions/Divider";
import { useEffect, useState } from "react";
import { VirtualFolder } from "../../../features/virtual-drive/folder";
import { useVirtualRoot } from "../../../hooks/virtual-drive/virtualRootContext";


const CreateMenu = ({ path }: {
    path?: string;
}) => {
    const virtualRoot = useVirtualRoot();
    const [currentDirectory, setCurrentDirectory] = useState<VirtualFolder | null>(null);

    useEffect(() => {
        setCurrentDirectory(virtualRoot?.navigate(path ?? "~") as VirtualFolder);
    }, [virtualRoot, path]);


    const handleCreateFile = () => {
        if (currentDirectory) {
            currentDirectory.createFile("New File");
        }
    };

    const handleCreateFolder = () => {
        if (currentDirectory) {
            currentDirectory.createFolder("New Folder");

        }
    };





    return (
        <DropdownAction label="New" icon={faFolderTree}>

            <ClickAction label="New File" icon={faFile} onTrigger={() => handleCreateFile()} />
            <Divider />
            <ClickAction label="New Folder" icon={faFolder} onTrigger={() => handleCreateFolder()} />
        </DropdownAction>
    );
};

export default CreateMenu;