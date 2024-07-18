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

export class AppsManager {
  static APPS: App[] = [
    new App(APP_NAMES.TERMINAL, APPS.TERMINAL, Terminal as App["windowContent"]),
    new App(APP_NAMES.SETTINGS, APPS.SETTINGS, Settings),
    new App(APP_NAMES.MEDIA_VIEWER, APPS.MEDIA_VIEWER, MediaViewer),
    new App(APP_NAMES.CALCULATOR, APPS.CALCULATOR, Calculator, { size: new Vector2(400, 600) }),
    new App(APP_NAMES.TEXT_EDITOR, APPS.TEXT_EDITOR, TextEditor),
    new App(APP_NAMES.FILE_EXPLORER, APPS.FILE_EXPLORER, FileExplorer as App["windowContent"]),
    
	new App("Videos", "video-viewer", MediaViewer),
	
    new App("Wordle", "wordle", WebView, {
      source: "https://prozilla.dev/wordle",
      size: new Vector2(400, 650)
    }),
    new App("Education Center", "education-center", WebView, {
      source: "https://desktop4kids.com/EducationCenter/",
      size: new Vector2(600, 600)
    }),
    new App("Onslaught Arena", "sword", WebView, {
      source: "http://arcade.lostdecadegames.com/onslaught-arena/",
      size: new Vector2(600, 600)
    }),
    new App(APP_NAMES.BROWSER, APPS.BROWSER, Browser, {
      size: new Vector2(700, 500)
    }),
    //new App(APP_NAMES.LOGIC_SIM, APPS.LOGIC_SIM, LogicSim),
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