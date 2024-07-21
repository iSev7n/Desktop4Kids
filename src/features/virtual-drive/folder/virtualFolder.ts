/* eslint-disable @typescript-eslint/indent */
import { APPS } from "../../../config/apps.config";
import { AppsManager } from "../../apps/appsManager";
import { removeFromArray } from "../../_utils/array.utils";
import { WindowsManager } from "../../windows/windowsManager";
import { VirtualFileJson } from "../file/virtualFile";
import { VirtualBase, VirtualBaseJson } from "../virtualBase";
import { VirtualFolderLink } from ".";
import { VirtualFile, VirtualFileLink } from "../file";

export interface VirtualFolderJson extends VirtualBaseJson {
    fls?: VirtualFileJson[];
    fds?: VirtualFolderJson[];
}

/**
 * A virtual folder that can contains files and sub-folders
 */
export class VirtualFolder extends VirtualBase {
    subFolders: (VirtualFolder | VirtualFolderLink)[];
    files: (VirtualFile | VirtualFileLink)[];
    type: number | undefined;

    static TYPE = {
        GENERAL: 0,
        MEDIA: 1,
    };

    constructor(name: string, type?: number) {
        super(name);
        this.subFolders = [];
        this.files = [];
        this.type = type ?? VirtualFolder.TYPE.GENERAL;
    }

    setAlias(alias: string): this {
        return super.setAlias(alias);
    }

    /**
     * Returns true if this folder contains a file matching a name and extension
     */
    hasFile(name: string, extension?: string) {
        return this.findFile(name, extension) !== null;
    }

    /**
     * Returns true if this folder contains a folder matching a name
     */
    hasFolder(name: string) {
        return this.findSubFolder(name) !== null;
    }

    /**
     * Finds and returns a file inside this folder matching a name and extension
     */
    findFile(name: string, extension?: string | null): VirtualFile | VirtualFileLink | null {
        let resultFile: VirtualFile | VirtualFileLink | null = null;

        this.files.forEach((file) => {
            const matchingName = (file.name === name || (file.alias && file.alias === name));
            const matchingExtension = (extension == null || file.extension === extension);
            if (matchingName && matchingExtension) {
                return resultFile = file;
            }
        });

        return resultFile;
    }

    /**
     * Finds and returns a folder inside this folder matching a name
     */
    findSubFolder(name: string): VirtualFolder | VirtualFolderLink | null {
        let resultFolder: VirtualFolder | VirtualFolderLink | null = null;

        this.subFolders.forEach((folder) => {
            if (folder.name === name || (folder.alias && folder.alias === name)) {
                return resultFolder = folder;
            }
        });

        return resultFolder;
    }

    /**
     * Creates a file with a name and extension
     */
    createFile(name: string, extension?: string, callback?: (newFile: VirtualFile | VirtualFileLink) => void): this {
        if (!this.canBeEdited)
            return this;
    
        let newFile = this.findFile(name, extension);
        if (newFile == null) {
            newFile = new VirtualFile(name, extension);
            if (name == "New File") {
                newFile.isNew = true;
            }
            this.files.push(newFile);
            newFile.parent = this;
        }
        else if (newFile.name == "New File") {
            const counter = this.files.filter((file) => file.name?.startsWith("New File")).length;
            newFile = new VirtualFile("New File" + " " + counter, extension);
            newFile.isNew = true;
            this.files.push(newFile);
            newFile.parent = this;
        }
    
        callback?.(newFile);
    
        newFile.confirmChanges();
        return this;
    }
    
    /**
     * Creates files based on an array of objects with file names and extensions
     */
    createFiles(files: { name: string; extension: string; }[]): this {
        if (!this.canBeEdited)
            return this;

        files.forEach(({ name, extension }) => {
            this.createFile(name, extension);
        });

        this.confirmChanges();
        return this;
    }

    /**
     * Creates a file link with a name
     */
    createFileLink(name: string, callback?: (newFileLink: VirtualFileLink | VirtualFile) => void): this {
        if (!this.canBeEdited)
            return this;

        let newFile = this.findFile(name);
        if (newFile == null) {
            newFile = new VirtualFileLink(name);

            this.files.push(newFile);
            newFile.parent = this;
        }
        callback?.(newFile);

        newFile.confirmChanges();
        return this;
    }

    /**
     * Creates files based on an array of objects with file names and extensions
     */
    createFileLinks(files: { name: string; }[]): this {
        if (!this.canBeEdited)
            return this;

        files.forEach(({ name }) => {
            this.createFileLink(name);
        });

        this.confirmChanges();
        return this;
    }

    /**
     * Creates a folder with a name
     */
    createFolder(name: string, callback?: (newFolder: VirtualFolder) => void): this {
        if (!this.canBeEdited)
            return this;
       
        let newFolder = this.findSubFolder(name);
        
        // eslint-disable-next-line @typescript-eslint/indent
        if (newFolder == null) {
            newFolder = new VirtualFolder(name);
            if (name == "New Folder") {

                newFolder.isNew = true;
            }
            this.subFolders.push(newFolder);
            newFolder.parent = this;
        }
        else if(newFolder.name == "New Folder"){
            
            const counter = this.subFolders.filter((folder)=>
                folder.name?.startsWith("New Folder")
            ).length;
            newFolder  = new VirtualFolder("New Folder" + " " + counter);
            newFolder.isNew = true;
            this.subFolders.push(newFolder);
            newFolder.parent = this;
        
        }
        callback?.(newFolder as VirtualFolder);

        newFolder.confirmChanges();
        
        return this;
    }

    /**
     * Creates folders based on an array of folder names
     */
    createFolders(names: string[]): this {
        if (!this.canBeEdited)
            return this;

        names.forEach((name) => {
            this.createFolder(name);
        });

        this.confirmChanges();
        return this;
    }

    /**
     * Creates a folder link with a name
     */
    createFolderLink(name: string, callback?: (newFolderLink: VirtualFolderLink | VirtualFolder) => void): this {
        if (!this.canBeEdited)
            return this;

        let newFolder = this.findSubFolder(name);
        if (newFolder == null) {
            newFolder = new VirtualFolderLink(name);
            this.subFolders.push(newFolder);
            newFolder.parent = this;
        }
        callback?.(newFolder);

        newFolder.confirmChanges();
        return this;
    }

    /**
     * Creates folder links based on an array of folder names
     */
    createFolderLinks(names: string[]): this {
        if (!this.canBeEdited)
            return this;

        names.forEach((name) => {
            this.createFolder(name);
        });

        this.confirmChanges();
        return this;
    }

    /**
     * Removes a file or folder from this folder
     */
    remove(child: VirtualFile | VirtualFileLink | VirtualFolder | VirtualFolderLink): this {
        if (!this.canBeEdited)
            return this;

        child.parent = undefined;

        if (child.isFile()) {
            removeFromArray(child, this.files);
        } else if (child.isFolder()) {
            removeFromArray(child, this.subFolders);
        }

        child.confirmChanges();
        return this;
    }

    /**
     * Returns the file or folder at a relative path or null if it doesn't exist
     */
    navigate(relativePath: string): VirtualFile | VirtualFolder | null {
        const segments = relativePath.split("/");
        let currentDirectory: VirtualFile | VirtualFolder = this as VirtualFolder;

        const getDirectory = (path: string, isStart: boolean) => {
            if (isStart && path === "") {
                return this.getRoot();
            } else if (isStart && Object.keys(this.getRoot().shortcuts).includes(path)) {
                return this.getRoot().shortcuts[path];
            } else if (path === ".") {
                return this;
            } else if (path === "..") {
                return currentDirectory?.parent;
            } else {
                return (currentDirectory as VirtualFolder)?.findSubFolder(path);
            }
        };

        if (segments.length === 1) {
            const directory = getDirectory(segments[0], true) as VirtualFile | VirtualFolder;
            if (directory != null)
                return directory;
        }

        for (let i = 0; i < segments.length - 1; i++) {
            const segment = segments[i];
            currentDirectory = getDirectory(segment, i === 0) as VirtualFile | VirtualFolder;
        }

        const lastSegment = segments[segments.length - 1];

        if (lastSegment === "") {
            return currentDirectory;
        } else if (currentDirectory != null) {
            const folder = (currentDirectory as VirtualFolder).findSubFolder(lastSegment) as VirtualFolder;

            if (folder != null) return folder;

            const { name, extension } = VirtualFile.splitId(lastSegment);
            return (currentDirectory as VirtualFolder).findFile(name, extension) as VirtualFile | VirtualFolder;
        } else {
            return null;
        }
    }

    /**
     * Opens this folder in file explorer
     */
    open(windowsManager: WindowsManager) {
        return windowsManager.open(APPS.FILE_EXPLORER, { path: this.path });
    }

    /**
     * Deletes this folder and all its files and sub-folders recursively
     */
    delete() {
        if (!this.canBeEdited)
            return;

        super.delete();

        const items = [
            ...this.files,
            ...this.subFolders
        ];

        items.forEach((item) => {
            item.delete();
        });

        this.confirmChanges();
    }

    /**
     * Returns all files inside this folder
     */
    getFiles(showHidden = false): VirtualFile[] {
        if (showHidden) return this.files as VirtualFile[];

        return this.files.filter(({ name, isNew, isRename  }) =>
            !name.startsWith(".")|| isNew || isRename
        ) as VirtualFile[];
    }

    /**
     * Returns all sub-folders inside this folder
     */
    getSubFolders(showHidden = false): VirtualFolder[] {
        if (showHidden) return this.subFolders as VirtualFolder[];
            console.log(this.subFolders);
        return this.subFolders.filter(({ name, isNew, isRename }) =>
            !name?.startsWith(".") || isNew || isRename
        ) as VirtualFolder[];
    }

    /**
     * Returns the amount of files and  sub-folders inside this folder
     */
    getItemCount(showHidden = false): number {
        const filesCount = this.getFiles(showHidden)?.length ?? 0;
        const foldersCount = this.getSubFolders(showHidden)?.length ?? 0;

        return filesCount + foldersCount;
    }

    isFolder(): boolean {
        return true;
    }

    getIconUrl(): string {
        if (this.iconUrl != null)
            return this.iconUrl;

        return AppsManager.getAppIconUrl(APPS.FILE_EXPLORER, "folder");
    }

    toJSON(): VirtualFolderJson | null {
        const object = super.toJSON() as VirtualFolderJson;

        if (object == null)
            return null;

        if (this.files.length > 0) {
            const files = this.files
                .map((file) => file.toJSON())
                .filter((file) => file != null) as VirtualFileJson[];

            if (files.length > 0)
                object.fls = files;
        }
        if (this.subFolders.length > 0) {
            const folders = this.subFolders
                .map((folder) => folder.toJSON())
                .filter((folder) => folder != null) as VirtualFolderJson[];

            if (folders.length > 0)
                object.fds = folders;
        }

        // Don't store folder if it's empty and untouched
        if (!this.editedByUser && (!object.fls || object.fls.length === 0) && (!object.fds || object.fds.length === 0))
            return null;

        return object;
    }
}