import { NAME } from "./branding.config";

export const APPS = {
	// Existing apps...
	TERMINAL: "terminal",
	SETTINGS: "settings",
	MEDIA_VIEWER: "media-viewer",
	TEXT_EDITOR: "text-editor",
	FILE_EXPLORER: "file-explorer",
	CALCULATOR: "calculator",
	BROWSER: "browser",
	LOGIC_SIM: "logic-sim",
	VIDEO_VIEWER: "video-viewer", // Add your video viewer app ID
  };

export type AppKey = keyof typeof APPS;

export const APP_NAMES: Record<AppKey, string> = {
	// Existing names...
	TERMINAL: "Commands",
	SETTINGS: "Settings",
	MEDIA_VIEWER: "Photos",
	TEXT_EDITOR: "Notes",
	FILE_EXPLORER: "Files",
	CALCULATOR: "Calculator",
	BROWSER: "Browser",
	LOGIC_SIM: "Logic Sim (WIP)",
	VIDEO_VIEWER: "Videos", // Add the name for your video viewer app
  };
  
  export const APP_DESCRIPTIONS: Record<AppKey, string | null> = {
	// Existing descriptions...
	TERMINAL: "A command line tool inspired by the Unix shell...",
	SETTINGS: `Configure ${NAME}'s settings and customize your experience.`,
	MEDIA_VIEWER: null, // Remove null if adding a description for media viewer
	TEXT_EDITOR: "Simple text editor for reading and writing text documents.",
	FILE_EXPLORER: "Browse and manage your virtual files.",
	CALCULATOR: "Simple calculator app.",
	BROWSER: "Browse the internet.",
	LOGIC_SIM: "Create digital logic circuits using the online simulator.",
	VIDEO_VIEWER: "View and playback video files.", // Add description for video viewer
  };

  export const APP_ICONS = {
	// Existing icons...
	TERMINAL: `/assets/apps/icons/${APPS.TERMINAL}.svg`,
	SETTINGS: `/assets/apps/icons/${APPS.SETTINGS}.svg`,
	MEDIA_VIEWER: `/assets/apps/icons/${APPS.MEDIA_VIEWER}.svg`,
	TEXT_EDITOR: `/assets/apps/icons/${APPS.TEXT_EDITOR}.svg`,
	FILE_EXPLORER: `/assets/apps/icons/${APPS.FILE_EXPLORER}.svg`,
	CALCULATOR: `/assets/apps/icons/${APPS.CALCULATOR}.svg`,
	BROWSER: `/assets/apps/icons/${APPS.BROWSER}.svg`,
	LOGIC_SIM: `/assets/apps/icons/${APPS.LOGIC_SIM}.svg`,
	VIDEO_VIEWER: `/assets/apps/icons/${APPS.VIDEO_VIEWER}.svg`, // Add icon path for video viewer
  };