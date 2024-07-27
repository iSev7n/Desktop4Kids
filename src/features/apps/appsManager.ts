import { App } from "./app";
import { FileExplorer } from "../../components/apps/file-explorer/FileExplorer";
import { MediaViewer } from "../../components/apps/media-viewer/MediaViewer";
import { WebView } from "../../components/apps/_utils/web-view/WebView";
import { Terminal } from "../../components/apps/terminal/Terminal";
import { TextEditor } from "../../components/apps/text-editor/TextEditor";
import { Settings } from "../../components/apps/settings/Settings";
import { Calculator } from "../../components/apps/calculator/Calculator";
import { Vector2 } from "../math/vector2";
import { APPS, APP_NAMES } from "../../config/apps.config";
import { Browser } from "../../components/apps/browser/Browser";
import { IMAGE_FORMATS } from "../../config/apps/mediaViewer.config";
import { PhotoViewer } from "../../components/apps/file-explorer/photo-viewer/PhotoViewer";
import { Games } from "../../components/apps/games/Games";
import { Library } from "../../components/apps/library/Library";
import PaintAppWrapper from '../../components/apps/paint/PaintAppWrapper';
import { useVirtualRoot } from "../../hooks/virtual-drive/virtualRootContext";
import { VirtualFolder } from "../virtual-drive/folder";

// Define the AppCategory type
type AppCategory = 'Utilities' | 'Games' | 'Apps';

export class AppsManager {
  static APPS: App[] = [
    // Utilities Apps
    createApp(APP_NAMES.TERMINAL, APPS.TERMINAL, Terminal as App["windowContent"], 'Utilities'),
    createApp(APP_NAMES.SETTINGS, APPS.SETTINGS, Settings, 'Utilities'),
    createApp(APP_NAMES.MEDIA_VIEWER, APPS.MEDIA_VIEWER, PhotoViewer, 'Utilities'),
    createApp(APP_NAMES.VIDEO_VIEWER, APPS.VIDEO_VIEWER, MediaViewer, 'Utilities'),
    createApp(APP_NAMES.CALCULATOR, APPS.CALCULATOR, Calculator, 'Utilities', { size: new Vector2(400, 600) }),
    createApp(APP_NAMES.TEXT_EDITOR, APPS.TEXT_EDITOR, TextEditor, 'Utilities'),
    createApp(APP_NAMES.FILE_EXPLORER, APPS.FILE_EXPLORER, FileExplorer as App["windowContent"], 'Utilities'),

    // Custom Folder
    createApp("Documents", "folder-text", FileExplorer as App["windowContent"], 'Utilities', {
      path: "~/Documents",
      size: new Vector2(800, 600)
    }),

    // Library App
    createApp("Library", "library", Library, 'Apps', {
      size: new Vector2(1000, 800)
    }),

    // Paint App
    createApp("PaintApp", "paint", PaintAppWrapper, 'Apps', {
      size: new Vector2(1000, 800)
    }),

    //Game Center App
    createApp("Games", "games", Games, 'Games', {
      size: new Vector2(1000, 800)
    }),

    // Other Apps
    createApp("Earth", "earth", WebView, 'Apps', {
      source: "https://examples.webglearth.com/examples/helloworld.html",
      size: new Vector2(1000, 800)
    }),
    createApp("Education Center", "education-center", WebView, 'Apps', {
      source: "https://desktop4kids.com/EducationCenter/",
      size: new Vector2(1000, 800)
    }),

    createApp(APP_NAMES.BROWSER, APPS.BROWSER, Browser, 'Apps', {
      size: new Vector2(1000, 800)
    })

    // // If you want to add a new app in the future:
    // createApp("NewAppName", "iconName", AppComponent, 'Category', {
    //   source: "https://example.com",
    //   size: new Vector2(800, 600)
    // }),
  ];

  // Function to get app by ID
  static getAppById(id: string): App | null {
    return this.APPS.find(app => app.id === id) || null;
  }

  /**
   * Get the app associated with a file extension
   * @param {string} fileExtension - The file extension to check.
   * @returns {App | null} - The corresponding app or null if not found.
   */
  static getAppByFileExtension(fileExtension: string): App | null {
    const lowerCaseExt = fileExtension.toLowerCase();
    if (IMAGE_FORMATS.includes(lowerCaseExt)) {
      return this.getAppById(APPS.MEDIA_VIEWER);
    } else if (lowerCaseExt === "mp4") {
      return this.getAppById("video-viewer"); // Ensure "video-viewer" matches your video viewer app ID
    } else {
      return this.getAppById(APPS.TEXT_EDITOR); // Default to text editor for other file types
    }
  }

  /**
   * Returns the URL of an icon inside the icons folder or the default icon of an app
   * @param {string} appId - The ID of the app.
   * @param {string} [iconName] - The optional name of the icon.
   * @returns {string} - The URL of the icon.
   */
  static getAppIconUrl(appId: string, iconName?: string): string {
    if (iconName == null) {
      return `/assets/apps/icons/${appId}.svg`;
    } else {
      return `/assets/apps/${appId}/icons/${iconName}.svg`;
    }
  }
}

/**
 * Helper function to create an app instance
 * @param {string} name - The name of the app.
 * @param {string} id - The ID of the app.
 * @param {App["windowContent"]} component - The component to be rendered by the app.
 * @param {AppCategory} category - The category of the app.
 * @param {Partial<App>} [options={}] - Optional settings for the app.
 * @returns {App} - The created app instance.
 */

function createApp(
  name: string,
  id: string,
  component: App["windowContent"],
  category: AppCategory,
  options: { [key: string]: unknown; size?: Vector2 } = {}
): App {
  return new App(name, id, component, {
    size: new Vector2(800, 600), // Default size
    ...options,
  }, category);
}
