import { APPS } from "../../../config/apps.config";
import { WALLPAPERS } from "../../../config/desktop.config";
import { AppsManager } from "../../apps/appsManager";
import { VirtualFile, VirtualFileLink } from "../file";
import { VirtualFolder, VirtualFolderLink } from "../folder";
import { VirtualRoot } from "./virtualRoot";

const CONFIG_PATHS = {
  DESKTOP: "/config/desktop.xml",
  TASKBAR: "/config/taskbar.xml",
  APPS: "/config/apps.xml",
  THEME: "/config/theme.xml",
};

const ASSETS_PATHS = {
  BANNER_LOGO: "/assets/banner-logo-title.png",
  ICON: "/icon.svg",
  HORSE_VIDEO: "/assets/videos/Horse.mp4",
};

const DOCUMENTS_PATHS = {
  INFO_MD: "/documents/info.md",
  D4K_MD: "/documents/Desktop4Kids.md",
};

const EXCLUDED_FILES = ["/public/config/tree.json"];

/**
 * Loads default data on the virtual root
 */
export function loadDefaultData(virtualRoot: VirtualRoot) {
  const linkedPaths: Record<string, string> = {};

  createHomeFolder(virtualRoot, linkedPaths);
  loadTree(virtualRoot, linkedPaths);
}

// Function to create the home folder and its subfolders/files
function createHomeFolder(virtualRoot: VirtualRoot, linkedPaths: Record<string, string>) {
  virtualRoot.createFolder("home", (folder) => {
    folder.createFolder("desktop4kids", (folder) => {
      folder.setAlias("~");

      createConfigFolder(folder);
      createPicturesFolder(folder, linkedPaths);
      createDocumentsFolder(folder, linkedPaths);
      createVideosFolder(folder, linkedPaths);
      createDesktopFolder(folder, linkedPaths);
      createGamesFolder(folder, linkedPaths);

      // // If you want to add a new folder in the future:
      // folder.createFolder("NewFolderName", (newFolder) => {
      //   // Add subfolders or files to the new folder here
      // });

    });
  });
}

// Function to create the .config folder and its files
function createConfigFolder(folder: VirtualFolder) {
  folder.createFolder(".config", (configFolder) => {
    configFolder
      .createFile("desktop", "xml", (file) => file.setSource(CONFIG_PATHS.DESKTOP))
      .createFile("taskbar", "xml", (file) => file.setSource(CONFIG_PATHS.TASKBAR))
      .createFile("apps", "xml", (file) => file.setSource(CONFIG_PATHS.APPS))
      .createFile("theme", "xml", (file) => file.setSource(CONFIG_PATHS.THEME));
  });
}

// Function to create the Pictures folder and its subfolders/files
function createPicturesFolder(folder: VirtualFolder, linkedPaths: Record<string, string>) {
  folder.createFolder("Pictures", (picturesFolder) => {
    picturesFolder.setIconUrl(AppsManager.getAppIconUrl(APPS.FILE_EXPLORER, "folder-images"));
    picturesFolder.createFolder("Wallpapers", (wallpapersFolder) => {
      wallpapersFolder.setProtected(true);
      WALLPAPERS.forEach((source, i) => {
        wallpapersFolder.createFile(`Wallpaper${i + 1}`, "png", (file) => file.setSource(source));
      });
    });
    picturesFolder
      .createFile("Desktop4Kids", "png", (file) => file.setSource(ASSETS_PATHS.BANNER_LOGO))
      .createFile("Icon", "svg", (file) => file.setSource(ASSETS_PATHS.ICON));

    linkedPaths.images = picturesFolder.path;

    // // If you want to add a new file in the future:
    // picturesFolder.createFile("NewFileName", "fileExtension", (file) => {
    //   file.setSource("/path/to/source");
    // });

  });
}

// Function to create the Documents folder and its subfolders/files
function createDocumentsFolder(folder: VirtualFolder, linkedPaths: Record<string, string>) {
  folder.createFolder("Documents", (documentsFolder) => {
    documentsFolder.setIconUrl(AppsManager.getAppIconUrl(APPS.FILE_EXPLORER, "folder-text"));
    documentsFolder.createFile("textfile", "txt", (file) => file.setContent("Hello world!"));
    documentsFolder.createFile("textfile2", "txt", (file) => file.setContent("Hello world Hello world HELLO WORLD!"));
    documentsFolder
      .createFile("Info", "md", (file) => {
        file.setProtected(true).setSource(DOCUMENTS_PATHS.INFO_MD).setIconUrl(AppsManager.getAppIconUrl(APPS.FILE_EXPLORER, "file-info"));
        linkedPaths.info = file.path;
      })
      .createFile("Desktop4Kids", "md", (file) => {
        file.setProtected(true).setSource(DOCUMENTS_PATHS.D4K_MD);
        linkedPaths.links = file.path;
      });

    linkedPaths.documents = documentsFolder.path;

    // // If you want to add a new file in the future:
    // documentsFolder.createFile("NewFileName", "fileExtension", (file) => {
    //   file.setContent("File content here");
    // });

  });
}

// Function to create the Videos folder and its subfolders/files
function createVideosFolder(folder: VirtualFolder, linkedPaths: Record<string, string>) {
  folder.createFolder("Videos", (videosFolder) => {
    videosFolder.setIconUrl(AppsManager.getAppIconUrl(APPS.FILE_EXPLORER, "folder-video"));
    videosFolder.createFile("Horse", "mp4", (file) => {
      file.setSource(ASSETS_PATHS.HORSE_VIDEO);
      file.setIconUrl(AppsManager.getAppIconUrl(APPS.FILE_EXPLORER, "file-video"));
    });

    linkedPaths.videos = videosFolder.path;

    // // If you want to add a new file in the future:
    // videosFolder.createFile("NewVideoName", "mp4", (file) => {
    //   file.setSource("/path/to/video");
    // });

  });
}

// Function to create the Desktop folder and its links to other folders/files
function createDesktopFolder(folder: VirtualFolder, linkedPaths: Record<string, string>) {
  folder.createFolder("Desktop", (desktopFolder) => {
    desktopFolder
      .createFileLink("Info.md", (fileLink) => (fileLink as VirtualFileLink).setLinkedPath(linkedPaths.info))
      .createFolderLink("Pictures", (folderLink) => (folderLink as VirtualFolderLink).setLinkedPath(linkedPaths.images))
      .createFolderLink("Documents", (folderLink) => (folderLink as VirtualFolderLink).setLinkedPath(linkedPaths.documents))
      .createFolderLink("Videos", (folderLink) => (folderLink as VirtualFolderLink).setLinkedPath(linkedPaths.videos));

    // // If you want to add a new file link in the future:
    // desktopFolder.createFileLink("NewFileName.md", (fileLink) => {
    //   (fileLink as VirtualFileLink).setLinkedPath("/path/to/linked/file");
    // });

    // // If you want to add a new folder link in the future:
    // desktopFolder.createFolderLink("NewFolderName", (folderLink) => {
    //   (folderLink as VirtualFolderLink).setLinkedPath("/path/to/linked/folder");
    // });

  });
}

// Function to create the Games folder
function createGamesFolder(folder: VirtualFolder, linkedPaths: Record<string, string>) {
  folder.createFolder("Games", (gamesFolder) => {
    gamesFolder.setIconUrl(AppsManager.getAppIconUrl(APPS.FILE_EXPLORER, "folder-games"));
    linkedPaths.games = gamesFolder.path;

    // // If you want to add a new file in the future:
    // gamesFolder.createFile("NewGameFileName", "fileExtension", (file) => {
    //   file.setSource("/path/to/source");
    // });

  });
}

// Create files and folders based on repository tree
function loadTree(virtualRoot: VirtualRoot, linkedPaths: Record<string, string>) {
  fetch("/config/tree.json")
    .then((response) => response.json())
    .then(({ files, folders }: { files: string[], folders: string[] }) => {
      folders.forEach((folderPath) => {
        createFolderFromPath(virtualRoot, folderPath);
      });

      files.forEach((filePath) => {
        if (!EXCLUDED_FILES.includes(filePath)) {
          createFileFromPath(virtualRoot, filePath);
        }
      });
    })
    .catch(() => {
      console.warn("Failed to load repository tree. Make sure the tree data is valid and up-to-date using 'npm run fetch'.");
    });
}

// Function to create folders based on their paths
function createFolderFromPath(virtualRoot: VirtualRoot, folderPath: string) {
  const lastSlashIndex = folderPath.lastIndexOf("/");
  if (lastSlashIndex === -1) {
    virtualRoot.createFolder(folderPath);
    return;
  }

  const parentPath = folderPath.substring(0, lastSlashIndex);
  const folderName = folderPath.substring(lastSlashIndex + 1);
  const parentFolder = virtualRoot.navigate(parentPath) as VirtualFolder;

  parentFolder.createFolder(folderName);

  // // If you want to add a subfolder in the future:
  // parentFolder.createFolder("NewSubFolderName", (subFolder) => {
  //   // Add subfolders or files to the subfolder here // });

}

// Function to create files based on their paths
function createFileFromPath(virtualRoot: VirtualRoot, filePath: string) {
  const lastSlashIndex = filePath.lastIndexOf("/");
  const callback = (virtualFile: VirtualFile) => {
    const virtualPath = virtualFile.absolutePath;
    if (virtualPath.startsWith("/public/")) {
      virtualFile.setSource(virtualPath.replace(/^\/public\//, "/"));
    } else {
      virtualFile.setSource(`https://raw.githubusercontent.com/iSev7n/Desktop4Kids/main${virtualPath}`);
    }
  };

  if (lastSlashIndex === -1) {
    const { name, extension } = VirtualFile.splitId(filePath);
    virtualRoot.createFile(name, extension as string | undefined, callback);
    return;
  }

  const parentPath = filePath.substring(0, lastSlashIndex);
  const { name, extension } = VirtualFile.splitId(filePath.substring(lastSlashIndex + 1));
  const parentFolder = virtualRoot.navigate(parentPath) as VirtualFolder;

  parentFolder.createFile(name, extension as string | undefined, callback);

  // // If you want to add a new file in the future:
  // parentFolder.createFile("NewFileName", "fileExtension", (file) => {
  //   file.setSource("/path/to/source");
  // });

}