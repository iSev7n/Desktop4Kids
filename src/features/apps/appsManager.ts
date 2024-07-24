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
import { LogicSim } from "../../components/apps/logic-sim/LogicSim";
import { PhotoViewer } from "../../components/apps/file-explorer/photo-viewer/PhotoViewer";

export class AppsManager {
  static APPS: App[] = [
    new App(APP_NAMES.TERMINAL, APPS.TERMINAL, Terminal as App["windowContent"], undefined, 'Utilities'),
    new App(APP_NAMES.SETTINGS, APPS.SETTINGS, Settings, undefined, 'Utilities'),
    new App(APP_NAMES.MEDIA_VIEWER, APPS.MEDIA_VIEWER, PhotoViewer, undefined, 'Utilities'),
    new App(APP_NAMES.VIDEO_VIEWER, APPS.VIDEO_VIEWER, MediaViewer, undefined, 'Utilities'),
    new App(APP_NAMES.CALCULATOR, APPS.CALCULATOR, Calculator, { size: new Vector2(400, 600) }, 'Utilities'),
    new App(APP_NAMES.TEXT_EDITOR, APPS.TEXT_EDITOR, TextEditor, undefined, 'Utilities'),
    new App(APP_NAMES.FILE_EXPLORER, APPS.FILE_EXPLORER, FileExplorer as App["windowContent"], undefined, 'Utilities'),
    
    new App("Documents", "folder-text", FileExplorer as App["windowContent"], {
      path: "~/Documents",
      size: new Vector2(800, 600)
    }, 'Utilities'),
    
    new App("Wordle", "wordle", WebView, {
      source: "https://prozilla.dev/wordle",
      size: new Vector2(400, 650)
    }, 'Games'),
    new App("Earth", "earth", WebView, {
      source: "https://examples.webglearth.com/examples/helloworld.html",
      size: new Vector2(1000, 800)
    }, 'Apps'),
    new App("Education Center", "education-center", WebView, {
      source: "https://desktop4kids.com/EducationCenter/",
      size: new Vector2(1000, 800)
    }, 'Apps'),
    new App("Onslaught Arena", "sword", WebView, {
      source: "http://arcade.lostdecadegames.com/onslaught-arena/",
      size: new Vector2(600, 600)
    }, 'Games'), // Make sure this app entry is here
    new App("Paint", "paint", WebView, {
      source: "https://desktop4kids.com/pixil/",
      size: new Vector2(1000, 800)
    }, 'Apps'),
    new App(APP_NAMES.BROWSER, APPS.BROWSER, Browser, {
      size: new Vector2(1000, 800)
    }, 'Apps')
  ];

  static getAppById(id: string): App | null {
    let application: App | null = null;

    this.APPS.forEach((app) => {
      if (app.id === id) {
        application = app;
        return;
      }
    });

    return application;
  }

  /**
   * Get the app associated with a file extension
   */
  static getAppByFileExtension(fileExtension: string): App | null {
    let app: App | null = null;

    if (IMAGE_FORMATS.includes(fileExtension.toLowerCase())) {
      return this.getAppById(APPS.MEDIA_VIEWER);
    } else if (fileExtension.toLowerCase() === "mp4") {
      return this.getAppById("video-viewer"); // Ensure "video-viewer" matches your video viewer app ID
    } else {
      return this.getAppById(APPS.TEXT_EDITOR); // Default to text editor for other file types
    }
  }

  /**
   * Returns the url of an icon inside the icons folder or the default icon of an app
   */
  static getAppIconUrl(appId: string, iconName?: string): string {
    if (iconName == null) {
      return `/assets/apps/icons/${appId}.svg`;
    } else {
      return `/assets/apps/${appId}/icons/${iconName}.svg`;
    }
  }
}
